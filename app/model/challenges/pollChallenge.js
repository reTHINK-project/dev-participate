import types from './types'

function getID() {
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

export default function createPollChallenge(poll, answers =[], _id) {
	const id = _id || getID()

	return {
		_id: id,
		type: types.POLL,
		definition: poll,
		answers: answers,
		isEqual: (challenge) => challenge._id === id,
		toString: () => id
	}
}

