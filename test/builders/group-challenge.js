function create(value) {
	return {
		addInvitation: (profile) => {
			return create(Object.assign(value, {invitations: value.invitations.concat({profile: profile, accepted: false})}))
		},

		withDefinition: (definition) => {
			return create(Object.assign(value, {definition: definition}))
		},

		create: () => {
			return value
		}
	}
}

export default function(title){
	return create({title:title, type: 'GROUP', invitations: []})
}
