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

export function updateChallenge(challenge) {
	return {
		type: 'UPDATE_CHALLENGE',
		data: challenge
	}
}

export function receivedUserPositions(positions) {
	return {
		type: 'UPDATE_USER_POSITIONS',
		data: positions
	}
}
