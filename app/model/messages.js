export function groupInvitation(title) {
	return {
		type: 'GROUP_INVITATION',
		data: {
			title: title
		}
	}
}

export function challengeResponse(challenge, accepted) {
	return {
		type: 'CHALLENGE_RESPONSE',
		data: {
			title: challenge.title,
			accepted: accepted
		}
	}
}
