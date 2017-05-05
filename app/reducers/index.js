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
	}else if (action.type === 'UPDATE_USER_POSITIONS') {
		return { ...state, userPositions: action.data }
	}else if (action.type === 'ADD_MESSAGE_TO_CHAT') {
		const challenges = state.challenges.map(c=>{
			if(c.isEqual(action.data.chat))
				return c.newMessageReceived(action.data.msg)
			return c
		})

		return {...state, challenges: challenges}
	}

	return state
}

export default chatApp
