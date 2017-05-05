import types from './types'
import Challenge from './challenge'

export default function createAdminMessageChallenge(data) {
	return Object.assign(Object.create(Challenge.create()), {
		type: types.ADMIN_MESSAGE,
		message: data.data.message,
		from: data.from,
	})
}
