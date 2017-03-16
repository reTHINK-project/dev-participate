const chatApp = (state, action) => {
	if(action.type === 'ADD_NEW_GROUP') {
		return { ...state, actions: state.actions.concat([{...action.data, type:'group'}])}
	} else if (action.type === 'LOGIN') {
		return { ...state, user: action.data.user }
	}

	return state
}

export default chatApp
