import types from './types'

function getID() {
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

export default function createGroupChallenge(title, definition, participants, messages=[], _id) {
	const id = _id || getID()

	return {
		_id: id,
		type: types.GROUP,
		title: title,
		definition: definition,
		participants: participants,
		sendedMessages: messages,
		isEqual: (challenge) => challenge._id === id,
		toString: () => id
	}
}

