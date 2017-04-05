import * as challenges from '../model/challenges'
import * as actions from './creators'
import getHyperties from '../rethink'
import { groupInvitation, challengeResponse } from '../model/messages'
import * as ParticipantCollection from '../model/participantCollection'
import config from '../config'

export function initSubscriptions(dispatch, hyperties) {
	hyperties.NotificationsObs.onNotification((msg) => {
		if(msg.type === 'GROUP_INVITATION'){
			dispatch(showNewChallenge(msg))
		}else if (msg.type === 'CHALLENGE_RESPONSE') {
			dispatch(processGroupChallengeResponse(msg))
		}
	})
	hyperties.Discovery.onUserListChanged(() => {})
	hyperties.GroupChat.onInvite((groupChat)=>{
		dispatch(actions.newChallengeAction(challenges.createChatChallenge(groupChat)))
	})
}

//challenges

export function showNewChallenge(data) {
	const challenge = challenges.createChallengeFrom(data)

	return actions.newChallengeAction(challenge)
}

export function answerChallenge(challenge, accepted) {
	return function(dispatch) {
		return getHyperties()
			.then(hyperties => {
				hyperties.Notifications.send([challenge.from], challengeResponse(challenge.title, accepted))
				return actions.removeChallengeAction(challenge)
			}).then((action)=>dispatch(action))
	}
}

// group challenge

export function addNewGroup(title, definition) {
	return function(dispatch){

		return getHyperties()
			.then(hyperties => {
				const removeUndefinedValues = (o) => JSON.parse(JSON.stringify(o))
				const users = hyperties.Discovery.queryUsers(removeUndefinedValues(definition))
				hyperties.Notifications.send(users, groupInvitation(title))

				return actions.newChallengeAction(challenges.createGroupChallenge(
					title, definition, ParticipantCollection.createFrom(users)))
			}).then((action)=>dispatch(action))

	}
}


export function processGroupChallengeResponse(msg) {
	return actions.updateParticipantStatusAction(msg.data.title, msg.from.username, msg.data.accepted)
}

// chat challenge

export function openChat(title, participants) {
	return function(dispatch) {
		return getHyperties()
			.then(hyperties => {
				return hyperties.GroupChat.create(title, participants.toHypertyParticipant(config.domain))
			}).then(chat => {
				return actions.newChallengeAction(challenges.createChatChallenge(chat))
			}).then(action=>dispatch(action))
	}
}

export function sendMessage(chat, message) {
	return function(dispatch) {
		return chat.sendMessage(message)
			.then(chat=>dispatch(actions.updateChallenge(chat)))
	}
}

// user

export function logUserIn(user, password) {
	return {
		type: 'LOGIN',
		data: {
			user: user,
			password: password,
		}
	}
}
