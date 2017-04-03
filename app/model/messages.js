export function groupInvitation(title) {
	return {
		type: 'GROUP_INVITATION',
		data: {
			title: title
		}
	}
}

export function challengeResponse(title, accepted) {
	return {
		type: 'CHALLENGE_RESPONSE',
		data: {
			title: title,
			accepted: accepted
		}
	}
}
