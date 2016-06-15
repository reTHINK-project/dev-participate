import React from 'react'
import { Link } from 'react-router'
import Notification from './notification'
import { connect } from 'react-redux'
import { removeNotification, clearNotifications, setActiveChat } from '../../actions'

const Notifications = ({ notifications, removeNotification, clearNotifications, setActvChat }) => {
    let notificationsCmp = notifications
        .map((n)=><Notification key={n.id} id={n.id} data={n.payload} type={n.type} onRemove={removeNotification} isNew={n.isNew} setActiveChat={setActvChat} />)
    const clear = ()=>{
        setTimeout(()=>{
            clearNotifications()
        }, 5000)}
    return(
            <div>
                <ul className="list-group" onLoad={clear}>
                    {notificationsCmp}
                </ul>
            </div>
    )
}

export default connect((state)=>{
    return {
        notifications: state.notifications
    }
}, (dispatch)=>{
    return {
        removeNotification: (id)=>dispatch(removeNotification(id)),
        clearNotifications: ()=>dispatch(clearNotifications()),
        setActvChat: (id)=>dispatch(setActiveChat(id))
    }
})(Notifications)
