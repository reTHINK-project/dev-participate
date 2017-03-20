export function newGroupAction(title, definition, participants) {
	return {
		type: 'ADD_NEW_GROUP',
		data: {
			title: title,
			definition: definition,
			invitations: participants
		}
	}
}

export function newChallengeAction(challenge) {
	return {
		type: 'ADD_NEW_CHALLENGE',
		data: challenge
	}
}
