import * as challenges from '../model/challenges'
import { newChallengeAction, removeChallengeAction, updateParticipantStatusAction } from './creators'
import getHyperties from '../rethink'
import { groupInvitation, challengeResponse } from '../model/messages'
import * as ParticipantCollection from '../model/participantCollection'

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
		dispatch(newChallengeAction(challenges.createOpenChatChallenge(groupChat)))
	})
}

//challenges

export function showNewChallenge(data) {
	const challenge = challenges.createChallengeFrom(data)

	return newChallengeAction(challenge)
}

export function answerChallenge(challenge, accepted) {
	return function(dispatch) {
		return getHyperties()
			.then(hyperties => {
				hyperties.Notifications.send([challenge.from], challengeResponse(challenge.title, accepted))
				return removeChallengeAction(challenge)
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

				return newChallengeAction(challenges.createGroupChallenge(
					title, definition, ParticipantCollection.createFrom(users)))
			}).then((action)=>dispatch(action))

	}
}


export function processGroupChallengeResponse(msg) {
	return updateParticipantStatusAction(msg.data.title, msg.from.username, msg.data.accepted)
}

// chat challenge

export function openChat(title, participants) {
	return function(dispatch) {
		return getHyperties()
			.then(hyperties => {
				return hyperties.GroupChat.create(title, participants.toHypertyParticipant('localhost'))
			}).then(chat => {
				return newChallengeAction(challenges.createOpenChatChallenge(chat))
			}).then(action=>dispatch(action))
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
