const groupChatHyperty = (domain) => `hyperty-catalogue://${domain}/.well-known/hyperty/GroupChatHyperty`
const locationHyperty = (domain) => `hyperty-catalogue://${domain}/.well-known/hyperty/LocationHyperty`
const participantsFakeHyperty = (domain)=> `hyperty-catalogue://${domain}/.well-known/hyperty/ParticipantsHyperty`

export function init(runtime, domain, dispatch){
    let groupChat, participants, locationHy = undefined
    runtime.requireHyperty(groupChatHyperty(domain))
        .then((hyperty)=>{
            groupChat = hyperty
            return runtime.requireHyperty(participantsFakeHyperty(domain))
                .then((hyperty)=>{
                    participants = hyperty
                    return runtime.requireHyperty(locationHyperty(domain))
                        .then((hyperty)=>{
                            locationHy = hyperty
                            groupChat.instance.onInvite((chat)=>chatCreated(dispatch, chat))
                            participants.instance.getParticipants().then((participants)=>dispatch(updateParticipants(participants))) 
                            locationHy.instance.startPositionBroadcast([groupChat.runtimeHypertyURL, participants.runtimeHypertyURL])
                        })
                })
        }).catch((error)=>console.log('errores' + error))


}

function chatCreated(dispatch, chat){
    chat.onMessage((message)=>messageReceived(dispatch, message))
    dispatch(chatCreatedAction(chat))
}

function messageReceived(dispatch, child){
    dispatch(messageReceivedAction(child))
}

///////
function updateParticipants(participants){
    return {
        type: 'UPDATE_PARTICIPANTS',
        data: participants
    }
}

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
