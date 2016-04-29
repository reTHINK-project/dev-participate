const groupChatHyperty = (domain) => `hyperty-catalogue://${domain}/.well-known/hyperty/GroupChatHyperty`

export function init(runtime, domain, dispatch){
    runtime.requireHyperty(groupChatHyperty(domain))
        .then((hyperty)=>{
            hyperty.instance.onInvite((chat)=>chatCreated(dispatch, chat))
        })
}

function chatCreated(dispatch, chat){
    chat.onAddChildren((chat)=>messageReceived(dispatch, chat))
    dispatch(chatCreatedAction(chat))
}

function messageReceived(dispatch, child){
    dispatch(messageReceivedAction(child))
}

///////
function messageReceivedAction(child){
    return {
        type: 'RECEIVE_MESSAGE',
        data: child
    }
}

function chatCreatedAction(chat){
    return {
        type: 'CHAT_CREATED',
        data: chat
    }
}

export function createChat(runtime, domain, name, participants){
    return function(dispatch){
        runtime.requireHyperty(groupChatHyperty(domain))
            .then((hyperty)=>{
                hyperty.instance.create(name, participants)
                    .then((chat) => {
                        chatCreated(dispatch, chat)
                        dispatch(setActiveChat(chat))
                    })
            })
        }
}

export function setActiveChat(chat){
    return {
        type: 'SET_ACTIVE_CHAT',
        data: chat
    }
}



export function sendMessage(chat, message){
    return function(dispatch){
        chat.addChildren('chatmessages', {chatMessage: message})
            .then((child)=>{
                dispatch(messageSended(child))
            })
    }
}

function messageSended(child){
    return {
        type: 'SEND_MESSAGE',
        data: child
    }
}
