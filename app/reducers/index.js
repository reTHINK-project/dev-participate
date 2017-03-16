const chatApp = (state, action) => {
    if(action.type === 'ACTION_CREATED') {
        return { ...state, actions: state.actions.concat([action.data])}
    } else if (action.type === 'LOGIN') {
        return { ...state, user: action.data.user }
    }

    return state
}

export default chatApp
