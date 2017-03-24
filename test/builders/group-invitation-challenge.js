function create(value) {
	return {
		withFrom: (from) => {
			return create(Object.assign(value, {from: from}))
		},

		create: () => {
			return value
		}
	}
}

export default function(title){
	return create({title:title, type: 'GROUP_INVITATION'})
}
