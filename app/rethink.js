let domain = 'localhost'
let runtimeURL = 'hyperty-catalogue://catalogue.localhost/.well-known/runtime/Runtime'

const groupChatHyperty = (domain) => `hyperty-catalogue://catalogue.${domain}/.well-known/hyperty/GroupChat`
const locationHyperty = (domain) => `hyperty-catalogue://catalogue.${domain}/.well-known/hyperty/Location`
//const participantsFakeHyperty = (domain)=> `hyperty-catalogue://catalogue.${domain}/.well-known/hyperty/ParticipantsHyperty`
const notificationsObserverHyperty = (domain)=> `hyperty-catalogue://catalogue.${domain}/.well-known/hyperty/NotificationsObserver`
const notificationsReporterHyperty = (domain)=> `hyperty-catalogue://catalogue.${domain}/.well-known/hyperty/NotificationsReporter`
const discoveryHyperty = (domain)=> `hyperty-catalogue://catalogue.${domain}/.well-known/hyperty/Discovery`

let hyperties


export default function(){
	if(hyperties)
		return new Promise(resolve => resolve(hyperties))

	hyperties = {}
	return self.rethink.default
		.install({ domain: domain, runtimeURL: runtimeURL})
		.then((runtime)=>{
			return runtime.requireHyperty(notificationsReporterHyperty(domain))
				.then(nh=>hyperties.Notifications = nh.instance)
				.then(()=>runtime.requireHyperty(notificationsObserverHyperty(domain)))
				.then(nh=>hyperties.NotificationsObs = nh.instance)
				.then(()=>runtime.requireHyperty(discoveryHyperty(domain)))
				.then(dh=>hyperties.Discovery = dh.instance)
				.then(()=>hyperties)
		})
}

