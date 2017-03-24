import { participantCollectionFrom } from '../model/participant'

export function createGroupChallenge(title, definition, profiles) {
	return {
		type: 'GROUP',
		title: title,
		definition: definition,
		participants: participantCollectionFrom(profiles)
	}
}

export function createOpenChatChallenge(title) {
	return {
		type: 'CHAT',
		title: title
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
