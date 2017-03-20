export function participantCollectionFrom(userProfileCollection) {
	return userProfileCollection.map(u=>{
		return {profile:u, accepted: false}
	})
}

