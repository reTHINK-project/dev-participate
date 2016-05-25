import { updateParticipants, messageReceived, chatCreated } from './actions'

const groupChatHyperty = (domain) => `hyperty-catalogue://${domain}/.well-known/hyperty/GroupChat`
const locationHyperty = (domain) => `hyperty-catalogue://${domain}/.well-known/hyperty/Location`
const participantsFakeHyperty = (domain)=> `hyperty-catalogue://${domain}/.well-known/hyperty/ParticipantsHyperty`

function init(runtime, domain, dispatch){
    let groupChat, participants, locationHy = undefined
    return runtime.requireHyperty(groupChatHyperty(domain))
        .then((hyperty)=>{
            groupChat = hyperty
            return runtime.requireHyperty(participantsFakeHyperty(domain))
                .then((hyperty)=>{
                    participants = hyperty
                    return runtime.requireHyperty(locationHyperty(domain))
                        .then((hyperty)=>{
                            locationHy = hyperty
                            groupChat.instance.onInvite((chat)=>{
                                chat.onMessage((message)=>dispatch(messageReceived(message)))
                                dispatch(chatCreated(chat))
                            })
                            participants.instance.getParticipants().then((participants)=>dispatch(updateParticipants(participants))) 
                            locationHy.instance.startPositionBroadcast([groupChat.runtimeHypertyURL, participants.runtimeHypertyURL])

                            return {locationHy: locationHy, participantsHy: participants, groupChatHy: groupChat}
                        })
                })
        })
}

export default { init: init}
