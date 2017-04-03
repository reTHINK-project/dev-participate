export const status = {
	confirmed: true,
	pending: false
}

function transformToHypertyParticipant(domain, participants) {
	return participants.map(p=>{
		return {domain: domain, email: p.profile.username}
	})
}

export function createParticipantCollFrom(userProfileCollection) {
	const collection =userProfileCollection.map(u=>{
		return {profile:u, accepted: false}
	})

	return createParticipantColl(collection)
}

export function createParticipantColl(participants) {
	participants.toHypertyParticipant = (domain) => transformToHypertyParticipant(domain, participants)

	return participants
}


