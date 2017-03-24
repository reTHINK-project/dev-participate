export function groupInvitation(title) {
	return {
		type: 'GROUP_INVITATION',
		data: {
			title: title
		}
	}
}

export function challlengeResponse(challenge, accepted) {
	return {
		type: 'CHALLENGE_RESPONSE',
		data: {
			accepted: accepted
		}
	}
}
