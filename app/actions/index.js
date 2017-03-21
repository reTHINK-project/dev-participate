import * as create from './creators'
import getHyperties from '../rethink'
import { createChallengeFrom, createGroupChallenge } from '../model/challenges'
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

				return create.newGroupAction(createGroupChallenge(title, definition, users))
			}).then((action)=>dispatch(action))

	}
}

export function showNewChallenge(data) {
	const challenge = createChallengeFrom(data)

	return create.newChallengeAction(challenge)
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
