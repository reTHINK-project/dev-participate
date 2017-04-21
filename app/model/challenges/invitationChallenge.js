import types from './types'

function getID() {
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

export default function createInvitationChallenge(data) {
	const id = getID()

	return {
		_id: id,
		type: types.GROUP_INVITATION,
		challenge_generator: data.data.challenge,
		title: data.data.title,
		from: data.from,
		isEqual: (challenge) => challenge._id === id,
		toString: () => id
	}
}

