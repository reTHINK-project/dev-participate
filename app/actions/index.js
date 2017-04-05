import * as Challenges from '../model/challenges'
import * as actions from './creators'
import getHyperties from '../rethink'
import { groupInvitation, challengeResponse } from '../model/messages'
import * as ParticipantCollection from '../model/participantCollection'
import config from '../config'

export function initSubscriptions(store, hyperties) {
	const dispatch = store.dispatch

	hyperties.NotificationsObs.onNotification((msg) => {
		if(msg.type === 'GROUP_INVITATION'){
			dispatch(processGroupInvitation(msg))
		}else if (msg.type === 'CHALLENGE_RESPONSE') {
			dispatch(processGroupChallengeResponse(store.getState().challenges, msg))
		}
	})
	hyperties.Discovery.onUserListChanged(() => {})
	hyperties.GroupChat.onInvite((groupChat)=>{
		dispatch(actions.newChallengeAction(Challenges.createChatChallenge(groupChat)))
	})
}

//Challenges

export function processGroupInvitation(data) {
	const challenge = Challenges.createInvitationChallenge(data)

	return actions.newChallengeAction(challenge)
}

export function answerChallenge(challenge, accepted) {
	return function(dispatch) {
		return getHyperties()
			.then(hyperties => {
				hyperties.Notifications.send([challenge.from], challengeResponse(challenge.challenge_generator, accepted))
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
				const challenge = Challenges.createGroupChallenge(
					title, definition, ParticipantCollection.createFrom(users))

				hyperties.Notifications.send(users, groupInvitation(challenge))
				return actions.newChallengeAction(challenge)
			}).then((action)=>dispatch(action))

	}
}


export function processGroupChallengeResponse(challenges, msg) {
	return function(dispatch) {
		const challenge = challenges.find(e=>e.isEqual({_id: msg.data.challenge}))
		const participants = challenge.participants.updateParticipant(msg.from.username, msg.data.accepted)
		const new_challenge = Challenges.createGroupChallenge(challenge.title, challenge.definition, participants, challenge._id)

		dispatch(actions.updateChallenge(new_challenge))
	}
}

// chat challenge

export function openChat(title, participants) {
	return function(dispatch) {
		return getHyperties()
			.then(hyperties => {
				return hyperties.GroupChat.create(title, participants.toHypertyParticipant(config.domain))
			}).then(chat => {
				return actions.newChallengeAction(Challenges.createChatChallenge(chat))
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
