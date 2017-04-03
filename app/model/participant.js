export const status = {
	confirmed: true,
	pending: false
}

export function participantCollectionFrom(userProfileCollection) {
	const collection =userProfileCollection.map(u=>{
		return {profile:u, accepted: false}
	})

	return collection
}

export function transformToHypertyParticipant(domain, participants) {
	return participants.map(p=>{
		return {domain: domain, email: p.profile.username}
	})
}
