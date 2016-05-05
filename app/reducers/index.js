const chatApp = (state={chats:[], participants:[]}, action) => {
    if(action.type === 'CHAT_CREATED'){
        state = { ...state, chats: state.chats.concat([action.data]) }
    }else if(action.type === 'SET_ACTIVE_CHAT'){
        let activeChat = action.data?state.chats.find((chat)=>chat.name === action.data.name)
            :action.data
        state = { ...state, activeChat: activeChat }
    }else if(action.type === 'RECEIVE_MESSAGE'){
        state = Object.assign({}, state, 
                {activeChat: Object.assign(Object.create(state.activeChat), { ...state.activeChat })})
    }else if(action.type === 'SEND_MESSAGE'){
        state = Object.assign({}, state, 
                {activeChat: Object.assign(Object.create(state.activeChat), { ...state.activeChat })})
    }
    return state
}

export default chatApp
