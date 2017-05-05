import types from './types'
import Challenge from './challenge'

export default function createInvitationChallenge(data) {
	return Object.assign(Object.create(Challenge.create()), {
		type: types.GROUP_INVITATION,
		challenge_generator: data.data.challenge,
		title: data.data.title,
		from: data.from,
	})
}

