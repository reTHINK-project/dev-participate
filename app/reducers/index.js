const chatApp = (state={chats:[], participants:[], selectedParticipants:[], chatName: undefined, activeChat:undefined}, action) => {
    if(action.type === 'CHAT_CREATED'){
        return { ...state, chats: state.chats.concat([action.data]) }
    }else if(action.type === 'SET_ACTIVE_CHAT'){
        let activeChat = action.data?state.chats.find((chat)=>chat.name === action.data.name)
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
    }

    return state
}

export default chatApp
