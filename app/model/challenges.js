import { participantCollectionFrom } from '../model/participant'

export function createGroupChallenge(title, definition, profiles) {
	return {
		type: 'GROUP',
		title: title,
		definition: definition,
		participants: participantCollectionFrom(profiles)
	}
}

export function createChallengeFrom(data) {
	return {
		type: 'GROUP_INVITATION',
		title: data.data.title
	}
}
