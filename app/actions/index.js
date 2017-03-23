import * as challenges from '../model/challenges'
import { newChallengeAction } from './creators'
import getHyperties from '../rethink'
import { groupInvitation } from '../model/messages'

export function initSubscriptions(dispatch, hyperties) {
	hyperties.NotificationsObs.onNotification((msg) => console.error('kl', msg)) // dispatch(showNewChallenge(msg))) or processAnswer
	hyperties.Discovery.onUserListChanged(() => console.error('onuserlistchanged'))
}

export function addNewGroup(title, definition) {
	return function(dispatch){

		return getHyperties()
			.then(hyperties => {
				const removeUndefinedValues = (o) => JSON.parse(JSON.stringify(o))
				const users = hyperties.Discovery.queryUsers(removeUndefinedValues(definition))
				hyperties.Notifications.send(users, groupInvitation(title))

				return newChallengeAction(challenges.createGroupChallenge(title, definition, users))
			}).then((action)=>dispatch(action))

	}
}

export function showNewChallenge(data) {
	const challenge = challenges.createChallengeFrom(data)

	return newChallengeAction(challenge)
}
}

export function logUserIn(user, password) {
	return {
		type: 'LOGIN',
		data: {
			user: user,
			password: password,
		}
	}
}
