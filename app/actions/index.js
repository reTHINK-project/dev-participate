const groupChatHyperty = (domain) => `hyperty-catalogue://${domain}/.well-known/hyperty/GroupChatHyperty`

function chatCreated(chat){
    return {
        type: 'CHAT_CREATED',
        data: chat
    }
}

function messageSended(child){
    return {
        type: 'SEND_MESSAGE',
        data: child
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
        chat.addChildren('message', {chatMessage: message})
            .then((child)=>{
                dispatch(messageSended(child))
            })
    }
}

export function createChat(runtime, domain, name, participants){
    return function(dispatch){
        runtime.requireHyperty(groupChatHyperty(domain))
            .then((hyperty)=>{
                hyperty.instance.create(name, participants)
                    .then((chat) => {
                        chat.onSubscription((event)=>event.accept())
                        chat.onAddChildren((child)=>{
                            console.log("message recived")
                            dispatch(messageSended(child))
                        })

                        dispatch(chatCreated(chat))
                        dispatch(setActiveChat(chat))
                    })
            })
        }
}

export function subscribeNewChat(runtime, domain){
    return function(dispatch){
        runtime.requireHyperty(`hyperty-catalogue://${domain}/.well-known/hyperty/GroupChatHyperty`)
            .then((hyperty)=>{
                hyperty.instance.onInvite((chat)=> {
                    chat.onAddChildren((child) => {
                        console.log("message receivef")
                        dispatch(messageSended(child))
                    })
                    dispatch(chatCreated(chat))
                })
            })
        }
}
