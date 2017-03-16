let domain = 'localhost'
let runtimeURL = 'hyperty-catalogue://catalogue.localhost/.well-known/runtime/Runtime'

const groupChatHyperty = (domain) => `hyperty-catalogue://catalogue.${domain}/.well-known/hyperty/GroupChat`
const locationHyperty = (domain) => `hyperty-catalogue://catalogue.${domain}/.well-known/hyperty/Location`
//const participantsFakeHyperty = (domain)=> `hyperty-catalogue://catalogue.${domain}/.well-known/hyperty/ParticipantsHyperty`
const notificationsObserverHyperty = (domain)=> `hyperty-catalogue://catalogue.${domain}/.well-known/hyperty/NotificationsObserver`
const discoveryHyperty = (domain)=> `hyperty-catalogue://catalogue.${domain}/.well-known/hyperty/Discovery`

let hyperties = {}


export default function(){
    if(hyperties)
        return new Promise(resolve => resolve(hyperties))


    return self.rethink.default
        .install({ domain: domain, runtimeURL: runtimeURL})
        .then((runtime)=>{
            return runtime.requireHyperty(groupChatHyperty(domain))
                .then(gc=>hyperties.GroupChat = gc)
                .then(()=>runtime.requireHyperty(discoveryHyperty(domain)))
                .then(dh=>hyperties.Discovery = dh)
        })
}

