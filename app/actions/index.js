export function createChat(groupChat, domain, name, participants){
    return function(dispatch){
        groupChat.instance.create(name, participants)
            .then((chat) => {
                chat.onMessage((message)=>dispatch(messageReceived(message)))
                dispatch(chatCreated(chat))
                dispatch(setActiveChat(chat))
        })
    }
}

export function sendMessage(chat, message, distance){
    return function(dispatch){
        chat.sendMessage(message, distance)
            .then((message)=>{
                dispatch(messageSended(message))
            })
    }
}

function messageSended(child){
    return {
        type: 'SEND_MESSAGE',
        data: child
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

export function tooglePartSelection(email){
    return {
        type: 'TOOGLE_SELECTION',
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
