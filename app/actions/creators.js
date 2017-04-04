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

export function updateParticipantStatusAction(title, username, accepted) {
	return {
		type: 'UPDATE_PARTICIPANTS_STATUS',
		data: {
			title: title,
			username: username,
			accepted: accepted
		}
	}
}

export function sendMessageAction(message) {
	return {
		type: 'SEND_MESSAGE',
		data: message
	}
}
