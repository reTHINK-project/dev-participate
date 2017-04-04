export function createGroupChallenge(title, definition, participants) {

	return {
		type: 'GROUP',
		title: title,
		definition: definition,
		participants: participants,
		isEqual: (group) => group.definition === definition && group.title === title
	}
}

export function createOpenChatChallenge(chat) {
	return {
		type: 'CHAT',
		title: chat.name
	}
}

export function createChallengeFrom(data) {
	switch(data.type) {
	case 'GROUP_INVITATION':
		return Object.assign({
			type: 'GROUP_INVITATION'
		}, data.data, {from: data.from})
	default:
		return data
	}
}
