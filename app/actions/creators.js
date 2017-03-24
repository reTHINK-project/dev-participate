export function newChallengeAction(challenge) {
	return {
		type: 'ADD_NEW_CHALLENGE',
		data: challenge
	}
}

export function removeChallengeAction(challenge) {
	return {
		type: 'REMOVE_CHALLENGE',
		data: challenge
	}
}
