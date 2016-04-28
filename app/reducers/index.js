const chatApp = (state={chats:[], participants:[]}, action) => {
    if(action.type === 'CHAT_CREATED'){
        state.chats = state.chats.concat([action.data])

        return { ...state }
    }else if(action.type === 'SET_ACTIVE_CHAT'){
        return Object.assign({},state,{activeChat: action.data})     
    }
    return state
}

export default chatApp
