function transformToHypertyParticipant(domain, participants) {
	return participants.map(p=>{
		return {domain: domain, email: p.profile.username}
	})
}

function updateParticipant(participants, id, status) {
	const result = participants.map(p=>{
		if(p.profile.username === id.username)
			return Object.assign(p, {accepted: status})

		return p
	})

	return create(result)
}

export function createFrom(userProfileCollection) {
	const collection =userProfileCollection.map(u=>{
		return {profile:u, accepted: false}
	})

	return create(collection)
}

export function create(participants) {
	return {
		toHypertyParticipant: (domain) => transformToHypertyParticipant(domain, participants),
		toArray: ()=> participants,
		filterByStatus: (status) => create(participants.filter(u=>u.accepted === status)),
		updateParticipant: (id, status) => updateParticipant(participants, id, status)
	}
}
