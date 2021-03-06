function getID() {
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

function create(_id){
	const id = _id || getID()

	return {
		_id: id,
		isEqual: (challenge) => challenge._id === id,
		toString: () => id
	}
}

export default { create: create }
