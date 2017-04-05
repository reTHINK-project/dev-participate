export function groupInvitation(challenge) {
	return {
		type: 'GROUP_INVITATION',
		data: {
			title: challenge.title,
			challenge: challenge.toString()
		}
	}
}

export function challengeResponse(challenge, accepted) {
	return {
		type: 'CHALLENGE_RESPONSE',
		data: {
			challenge: challenge,
			accepted: accepted
		}
	}
}
