import HypertyDiscovery from 'service-framework/src/hyperty-discovery/HypertyDiscovery'
import IdentityManager from 'service-framework/dist/IdentityManager'
import URI from 'urijs'

const ParticipantsHyperty = {
    _resolveIdentity(){
        return new Promise((resolve, reject)=>{
                if(this.identity)
                {
                    resolve(this.identity)
                }
                else
                {
                    this.identityManagerService.discoverUserRegistered('.', this.hypertyURL)
                        .then((identity)=>{
                            this.identity=identity
                            resolve(identity)
                        })
                }
            })
    },

    getParticipants(){
        let users = [
            'openidtest10@gmail.com',
            'openidtest20@gmail.com',
            'openidtest30@gmail.com'
        ]

        let identity = undefined
        return this._resolveIdentity()
            .then((identity)=>Promise.all(users.filter((u)=>u!==identity.username).map((p)=>{
                return ParticipantsHyperty.hypertyDiscovery.discoverHypertyPerUser(p, ParticipantsHyperty.domain)
                    .then((user)=>{ return { email: p, online: true } }) 
                    .catch((error)=>{ return { email: p, online: false } })
            })))
    }
}

const ParticipantsHypertyFactory = function(hypertyURL, bus, config){
    let identityManager = new IdentityManager(hypertyURL, config.runtimeURL, bus)

    ParticipantsHyperty.domain = new URI(hypertyURL).hostname()
    ParticipantsHyperty.hypertyDiscovery = new HypertyDiscovery(hypertyURL, bus)
    ParticipantsHyperty.identityManagerService = identityManager

    return ParticipantsHyperty
}

export default function activate(hypertyURL, bus, config){
    return {
        name: 'ParticipantsHyperty',
        instance: ParticipantsHypertyFactory(hypertyURL, bus, config)
    }
}
