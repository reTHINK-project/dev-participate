function create(value) {
	return {
		create: () => {
			return value
		}
	}
}

export default function(title){
	return create({title:title, type: 'GROUP_INVITATION'})
}
