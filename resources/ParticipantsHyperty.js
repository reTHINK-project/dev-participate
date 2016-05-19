import HypertyDiscovery from 'service-framework/src/hyperty-discovery/HypertyDiscovery'
import URI from 'urijs'

const ParticipantsHyperty = {
    getParticipants(){
        let users = [
            'openidtest10@gmail.com',
            'openidtest20@gmail.com',
            'openidtest30@gmail.com'
        ]

        return Promise.all(users.map((p)=>{
            console.log("tachan")
            console.log(this)
            return ParticipantsHyperty.hypertyDiscovery.discoverHypertyPerUser(p, ParticipantsHyperty.domain)
                .then((user)=>{ return { email: p, online: true } }) 
                .catch((error)=>{ return { email: p, online: false } })
        }))
    }
}

const ParticipantsHypertyFactory = function(hypertyURL, bus, config){
    ParticipantsHyperty.domain = new URI(hypertyURL).hostname()
    ParticipantsHyperty.hypertyDiscovery = new HypertyDiscovery(hypertyURL, bus)

    return ParticipantsHyperty
}

export default function activate(hypertyURL, bus, config){
    return {
        name: 'ParticipantsHyperty',
        instance: ParticipantsHypertyFactory(hypertyURL, bus, config)
    }
}
