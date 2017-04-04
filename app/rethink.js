import config from './config'

let hyperties
export default function(){
	if(hyperties)
		return new Promise(resolve => resolve(hyperties))

	hyperties = {}
	return self.rethink.default
		.install({ domain: config.domain, runtimeURL: config.runtimeURL})
		.then((runtime)=>{
			return runtime.requireHyperty(config.notificationsReporterHyperty)
				.then(nh=>hyperties.Notifications = nh.instance)
				.then(()=>runtime.requireHyperty(config.notificationsObserverHyperty))
				.then(nh=>hyperties.NotificationsObs = nh.instance)
				.then(()=>runtime.requireHyperty(config.groupChatHyperty))
				.then(gh=>hyperties.GroupChat = gh.instance)
				.then(()=>runtime.requireHyperty(config.discoveryHyperty))
				.then(dh=>hyperties.Discovery = dh.instance)
				.then(()=>hyperties)
		})
}

