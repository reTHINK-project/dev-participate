const chatApp = (state, action) => {
	if(action.type === 'ADD_NEW_CHALLENGE') {
		return { ...state, challenges: state.challenges.concat([action.data])}
	}else if (action.type === 'REMOVE_CHALLENGE') {
		return { ...state, challenges: state.challenges.filter(c => c.title !== action.data.title)}
	}else if (action.type === 'UPDATE_PARTICIPANTS_STATUS') {
		const challenges = state.challenges.map(c =>{
			if(c.title === action.data.title) {
				const participants = c.participants.map(p=>{
					if(p.profile.username === action.data.username){
						return {...p, accepted: action.data.accepted }
					}
					return p
				})
				return {...c, participants: participants}
			}
			return c
		})
		return { ...state, challenges: challenges }
	} else if (action.type === 'LOGIN') {
		return { ...state, user: action.data.user }
	}

	return state
}

export default chatApp
