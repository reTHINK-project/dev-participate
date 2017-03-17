export function createChallengeFrom(data) {
	return {
		type: 'GROUP_INVITATION',
		title: data.data.title
	}
}
