function create(collection) {
	return {
		withParticipant: (participant) => {
			return create(decorateCollection(collection.concat(participant)))
		},

		create: () =>{
			return collection
		}
	}
}

function decorateCollection(collection) {
	collection.toHypertyParticipant = () => []

	return collection
}

export default function(){
	return create(decorateCollection([]))
}
