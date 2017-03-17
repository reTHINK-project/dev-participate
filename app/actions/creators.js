export function newGroupAction(title, definition, users) {
	const inv = users.map(u=>{
		return {profile:u, accepted: false}
	})

	return {
		type: 'ADD_NEW_GROUP',
		data: {
			title: title,
			definition: definition,
			invitations: inv
		}
	}
}

export function newChallengeAction(challenge) {
	return {
		type: 'ADD_NEW_CHALLENGE',
		data: challenge
	}
}
