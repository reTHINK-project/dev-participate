export function newGroupAction(challenge) {
	return {
		type: 'ADD_NEW_GROUP',
		data: challenge
	}
}

export function newChallengeAction(challenge) {
	return {
		type: 'ADD_NEW_CHALLENGE',
		data: challenge
	}
}
