const chatApp = (state, action) => {
	if(action.type === 'ADD_NEW_GROUP' || action.type === 'ADD_NEW_CHALLENGE') {
		return { ...state, challenges: state.challenges.concat([action.data])}
	}else if (action.type === 'LOGIN') {
		return { ...state, user: action.data.user }
	}

	return state
}

export default chatApp
