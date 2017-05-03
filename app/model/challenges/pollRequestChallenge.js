import types from './types'

function getID() {
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

export default function createPollRequestChallenge(poll, _id) {
	const id = _id || getID()

	return {
		_id: id,
		type: types.POLL_REQUEST,
		definition: poll.data,
		answer: (res) => poll.answer(res),
		isEqual: (challenge) => challenge._id === id,
		toString: () => id
	}
}
