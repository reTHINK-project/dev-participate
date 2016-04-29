const chatApp = (state={chats:[], participants:[]}, action) => {
    if(action.type === 'CHAT_CREATED'){
        state.chats = state.chats.concat([{dataObject:action.data, messages: []}])

        state = { ...state }
    }else if(action.type === 'SET_ACTIVE_CHAT'){
        let data = (action.data.dataObject?action.data:{dataObject:action.data, messages: []})
        state = Object.assign({},state,{activeChat: data})     
    }else if(action.type === 'RECEIVE_MESSAGE'){
        state = Object.assign({}, state, 
                {activeChat: Object.assign({ ...state.activeChat }, {messages: state.activeChat.messages.concat([{isMe: false, dataObject: action.data}])})})
    }else if(action.type === 'SEND_MESSAGE'){
        state = Object.assign({}, state, 
                {activeChat: Object.assign({ ...state.activeChat }, {messages: state.activeChat.messages.concat([{isMe: true, dataObject: action.data}])})})
    }
    return state
}

export default chatApp
