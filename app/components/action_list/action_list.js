import React from 'react'
import Actions from './actions'
import NewActionButton from './new_action_button'

let ActionList = ({actions}) => {
    let actionsComponent = actions.map((action) => {
        //TODO: right component
        return <Actions.Group title={action.title} />
    })

    return (
        <div>
            <ul className="list-group">
                <li className="list-group-item">
                    {actionsComponent}
                    <NewActionButton />
                </li>                    
            </ul>
        </div>
    )
}

export default ActionList
