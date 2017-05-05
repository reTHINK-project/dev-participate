import types from './types'
import Challenge from './challenge'

export default function createPollRequestChallenge(poll, _id) {
	return Object.assign(Object.create(Challenge.create(_id)),{
		type: types.SURVEY_REQUEST,
		definition: poll.data,
		answer: (res) => poll.answer(res),
	})
}
