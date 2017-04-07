import createChatChallenge from './chatChallenge'

function getID() {
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

export { createChatChallenge }

export function createGroupChallenge(title, definition, participants, messages=[], _id) {
	const id = _id || getID()

	return {
		_id: id,
		type: 'GROUP',
		title: title,
		definition: definition,
		participants: participants,
		sendedMessages: messages,
		isEqual: (challenge) => challenge._id === id,
		toString: () => id
	}
}

export function createInvitationChallenge(data) {
	const id = getID()

	return {
		_id: id,
		type: 'GROUP_INVITATION',
		challenge_generator: data.data.challenge,
		title: data.data.title,
		from: data.from,
		isEqual: (challenge) => challenge._id === id,
		toString: () => id
	}
}
