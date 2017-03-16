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
