import { updateParticipants, messageReceived, chatCreated, notificationReceived } from './actions'

const groupChatHyperty = (domain) => `hyperty-catalogue://${domain}/.well-known/hyperty/GroupChat`
const locationHyperty = (domain) => `hyperty-catalogue://${domain}/.well-known/hyperty/Location`
const participantsFakeHyperty = (domain)=> `hyperty-catalogue://${domain}/.well-known/hyperty/ParticipantsHyperty`
const notificationsObserverHyperty = (domain)=> `hyperty-catalogue://${domain}/.well-known/hyperty/NotificationsObserver`

function init(runtime, domain, dispatch){
    let hyperties = {}
    return runtime.requireHyperty(groupChatHyperty(domain))
        .then((hyperty)=>{
            hyperties.groupChatHy = hyperty
        })
        .then(()=>runtime.requireHyperty(participantsFakeHyperty(domain)))
        .then((hyperty)=>{
            hyperties.participantsHy = hyperty
        })
        .then(()=>runtime.requireHyperty(locationHyperty(domain)))
        .then((hyperty)=>{
            hyperties.locationHy = hyperty
        })
        .then(()=>runtime.requireHyperty(notificationsObserverHyperty(domain)))
        .then((hyperty)=>{
            hyperties.notificationsHy = hyperty
        })
        .then(()=>{
            hyperties.groupChatHy.instance.onInvite((chat)=>{
                chat.onMessage((message)=>dispatch(messageReceived(message)))
                dispatch(chatCreated(chat))
            })
            //setInterval(()=>{
              hyperties.participantsHy.instance.getParticipants().then((participants)=>dispatch(updateParticipants(participants))) 
            //},5000)
            hyperties.locationHy.instance.startPositionBroadcast([
                    hyperties.groupChatHy.runtimeHypertyURL,
                    hyperties.participantsHy.runtimeHypertyURL
            ])
            hyperties.notificationsHy.instance.onNotification((notification)=>{
                dispatch(notificationReceived(notification))
            })

            return hyperties
        })
}

export default { init: init}
