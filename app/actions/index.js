import * as create from './creators'
import getHyperties from '../rethink'
import { createChallengeFrom } from '../model/challenges'

export function addNewGroup(title, definition) {
	return function(dispatch){

		return getHyperties()
			.then(hyperties => {
				const users = hyperties.Discovery.queryUsers(definition)
				hyperties.Notifications.send(users, {})

				return create.newGroupAction(title, definition, users)
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
