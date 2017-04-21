function getID() {
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

export default function createAdminMessageChallenge(data) {
	const id = getID()

	return {
		_id: id,
		type: 'ADMIN_MESSAGE',
		message: data.data.message,
		from: data.from,
		isEqual: (challenge) => challenge._id === id,
		toString: () => id
	}
}
