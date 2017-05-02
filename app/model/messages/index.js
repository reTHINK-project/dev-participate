export function groupInvitation(challenge) {
	return {
		type: 'GROUP_INVITATION',
		data: {
			title: challenge.title,
			challenge: challenge.toString()
		}
	}
}

export function challengeResponse(challengeId, accepted) {
	return {
		type: 'CHALLENGE_RESPONSE',
		data: {
			challenge: challengeId,
			accepted: accepted
		}
	}
}


export function adminMessage(message) {
	return {
		type: 'ADMIN_MESSAGE',
		data: {
			message: message
		}
	}
}

export function pollInvitation(challenge) {
	return {
		type: 'POLL_INVITATION',
		data: {
			definition: challenge.definition
		}
	}
}
