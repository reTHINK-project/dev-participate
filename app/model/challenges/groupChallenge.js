import types from './types'
import Challenge from './challenge'

export default function createGroupChallenge(title, definition, participants, messages=[], _id) {
	return Object.assign(Object.create(Challenge.create(_id)), {
		type: types.GROUP,
		title: title,
		definition: definition,
		participants: participants,
		sendedMessages: messages,
	})
}

