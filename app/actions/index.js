import * as create from './creators'
const getHyperties = require('../rethink')

export function addNewGroup(title, definition) {
    return function(dispatch){

        return getHyperties()
            .then(hyperties => {
                return hyperties.Discovery.queryUsers(definition)
                    .then(users=>{ 
                        hyperties.Notifications.send(users, {})
                        return create.newGroupAction(title, definition, users)
                    }).then((action)=>dispatch(action))
            })
    }
}

export function logUserIn(user, password) {
    return {
        type: 'LOGIN', 
        data: {
            user: user,
            password: password,
        }
    }
}

export function createNewGroup(title, query) {
    return {
        type: 'ACTION_CREATED', 
        data: {
            type: 'GROUP',
            title: title,
        }
    }
}

export function createChat(groupChat, domain, name, participants){
    return function(dispatch){
        return groupChat.instance.create(name, participants)
            .then((chat) => {
                chat.onMessage((message)=>dispatch(messageReceived(message)))
                dispatch(chatCreated(chat))
                dispatch(setActiveChat(chat.id))
        })
    }
}

export function sendMessage(chat, message, distance){
    return function(dispatch){
        chat.sendMessage(message, distance)
            .then((message)=>{
                dispatch(messageSended(message))
                dispatch(resetMessage)
            })
    }
}

function messageSended(child){
    return {
        type: 'SEND_MESSAGE',
        data: child
    }
}

function resetMessage(){
    return function(dispatch){
        dispatch(setMessage())
        dispatch(setDistance(false))
    }
}

export function reset(participants){
    return function(dispatch){
        dispatch(setActiveChat())
        dispatch(setChatName())
        participants.forEach((p)=>dispatch(tooglePartSelection(p)))
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

export function setActiveChat(chat_id){
    return {
        type: 'SET_ACTIVE_CHAT',
        data: chat_id
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

export function notificationReceived(notification){
    return {
        type: 'NOTIFICATION_RECEIVED',
        data: notification
    }
}

export function removeNotification(id){
    return {
        type: 'REMOVE_NOTIFICATION',
        data:{
            id: id
        }
    }
}

export function clearNotifications(){
    return{
        type: 'CLEAR_NOTIFICATION'
    }
}
