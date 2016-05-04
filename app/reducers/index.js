const chatApp = (state={chats:[], participants:[]}, action) => {
    if(action.type === 'CHAT_CREATED'){
        state.chats = state.chats.concat([action.data])

        state = { ...state }
    }else if(action.type === 'SET_ACTIVE_CHAT'){
        let data = action.data
        state = Object.assign({},state,{activeChat: data})     
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
