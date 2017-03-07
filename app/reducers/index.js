const chatApp = (state, action) => {
    if(action.type === 'ACTION_CREATED') {
        return { ...state, actions: state.actions.concat([action.data])}
    } else if (action.type === 'LOGIN') {
        return { ...state, user: action.data.user }
    }

    return state

    if(action.type === 'CHAT_CREATED'){
        return { ...state, chats: state.chats.concat([action.data]) }
    }else if(action.type === 'SET_ACTIVE_CHAT'){
        let activeChat = action.data?state.chats.find((chat)=>chat.id === action.data)
            :action.data
        return { ...state, activeChat: activeChat }
    }else if(action.type === 'SEND_MESSAGE' || action.type === 'RECEIVE_MESSAGE'){
        return Object.assign({}, state, 
                {activeChat: Object.assign(Object.create(state.activeChat), { ...state.activeChat })})
    }else if(action.type === "UPDATE_PARTICIPANTS"){
        return { ...state, participants: action.data }
    }else if(action.type === 'TOOGLE_SELECTION'){
        return { ...state, selectedParticipants: state.selectedParticipants.some((e)=>e.email === action.data.email)?
            state.selectedParticipants.filter((e)=>e.email!==action.data.email):state.selectedParticipants.concat([action.data])}
    }else if(action.type === 'SET_CHATNAME'){
        return { ...state, chatName: action.data}
    }else if(action.type === 'INIT_HYPERTIES'){
        return Object.assign(state, action.data)
    }else if(action.type === 'SET_MESSAGE'){
        return {...state, message: action.data }
    }else if(action.type === 'SET_DISTANCE'){
        return {...state, distance: action.data }
    }else if(action.type === 'NOTIFICATION_RECEIVED'){
        return {...state, 
            notifications: state.notifications.concat([{...action.data, isNew: true, id: state.notifications.length+1}]),
            new_notifications: state.new_notifications+1
        }
    }else if(action.type === 'REMOVE_NOTIFICATION'){
        return {...state, notifications: state.notifications.filter((n)=>n.id!==action.data.id)}
    }else if(action.type === 'CLEAR_NOTIFICATION'){
        return {...state, notifications: state.notifications.map((n)=>{ return { ...n, isNew:false }}), new_notifications: 0}
    }

}

export default chatApp
