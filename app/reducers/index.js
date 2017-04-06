const chatApp = (state, action) => {
	if(action.type === 'ADD_NEW_CHALLENGE') {
		return { ...state, challenges: state.challenges.concat([action.data])}
	}else if (action.type === 'REMOVE_CHALLENGE') {
		return {...state, challenges: state.challenges.filter(c => !c.isEqual(action.data))}
	}else if (action.type === 'UPDATE_CHALLENGE') {
		const challenges = state.challenges.map(c=>{
			if(c.isEqual(action.data))
				return action.data
			return c
		})

		return {...state, challenges: challenges}
	}else if (action.type === 'LOGIN') {
		return { ...state, user: action.data.user }
	}

	return state
}

export default chatApp
