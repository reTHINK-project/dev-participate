export function newGroupAction(title, definition, users) {
    return {
        type: 'ADD_NEW_GROUP', 
        data: {
            title: title,
            definition: definition,
            invitations: users.map(u=>{
                return {profile:u, accepted: false}
            })
        }
    }
}
