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

export function addMessageToChat(chat, msg) {
	return {
		type: 'ADD_MESSAGE_TO_CHAT',
		data: {
			chat: chat,
			msg: msg
		}
	}
}

export function setCurrentPosition(pos) {
	return {
		type: 'SET_CURRENT_POSITION',
		data: pos
	}
}
