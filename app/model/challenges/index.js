import createChatChallenge from './chatChallenge'

function getID() {
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

export { createChatChallenge }

export function createGroupChallenge(title, definition, participants) {

	return {
		type: 'GROUP',
		title: title,
		definition: definition,
		participants: participants,
		isEqual: (group) => group.definition === definition && group.title === title
	}
}

export function createInvitationChallenge(data) {
	const id = getID()

	return {
		_id: id,
		type: 'GROUP_INVITATION',
		title: data.data.title,
		from: data.from,
		isEqual: (challenge) => challenge._id === id
	}
}
