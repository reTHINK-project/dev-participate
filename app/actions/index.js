export function createChat(groupChat, domain, name, participants){
    return function(dispatch){
        groupChat.instance.create(name, participants)
            .then((chat) => {
                chat.onMessage((message)=>dispatch(messageReceived(message)));
                dispatch(chatCreated(chat));
                dispatch(setActiveChat(chat))
        })
    }
}

export function sendMessage(chat, message, distance){
    return function(dispatch){
        chat.sendMessage(message, distance)
            .then((message)=>{
                dispatch(messageSent(message));
                dispatch(resetMessage)
            })
    }
}

function messageSent(child){
    return {
        type: 'SEND_MESSAGE',
        data: child
    }
}

function resetMessage(){
    return function(dispatch){
        dispatch(setMessage());
        dispatch(setDistance(false))
    }
}

export function reset(participants){
    return function(dispatch){
        dispatch(setActiveChat());
        dispatch(setChatName());
        participants.forEach((p)=>dispatch(togglePartSelection(p)))
    }
}

export function initHyperties(hyperties){
    return {
        type: 'INIT_HYPERTIES',
        data: hyperties
    }
}

export function updateParticipants(participants){
    return {
        type: 'UPDATE_PARTICIPANTS',
        data: participants
    }
}

export function setActiveChat(chat){
    return {
        type: 'SET_ACTIVE_CHAT',
        data: chat
    }
}

export function togglePartSelection(email){
    return {
        type: 'TOGGLE_SELECTION',
        data: email
    }
}

export function setChatName(name){
    return {
        type: 'SET_CHATNAME',
        data: name
    }
}

export function messageReceived(child){
    return {
        type: 'RECEIVE_MESSAGE',
        data: child
    }
}

export function chatCreated(chat){
    return {
        type: 'CHAT_CREATED',
        data: chat
    }
}

export function setMessage(message){
    return {
        type: 'SET_MESSAGE',
        data: message
    }
}

export function setDistance(active){
    return {
        type: 'SET_DISTANCE',
        data: active?1000:undefined
    }
}
