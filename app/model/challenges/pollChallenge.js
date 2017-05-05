import types from './types'
import Challenge from './challenge'

export default function createPollChallenge(poll, answers =[], _id) {
	return Object.assign(Object.create(Challenge.create(_id)),{
		type: types.SURVEY,
		definition: poll.config,
		answers: ()=>poll.results,
	})
}

