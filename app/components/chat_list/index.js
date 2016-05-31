import React from 'react'
import ChatListed from './chat-listed'
import NewChatButton from './new-chat-button'
import {setActiveChat, reset} from '../../actions'
import { connect } from 'react-redux'

let ChatList = ({chats, participants, groupChat, location, setActChat, reset}) => {
    let chatsComponents = chats.map((chat) => {
        return <ChatListed key={chat.name} chat={chat} onSelect={setActChat}/>
    })

    return (
        <div>
            <div className="alert alert-success" role="alert">
                GroupChatHyperty: {groupChat.runtimeHypertyURL}<br/>
                LocationHyperty: {location.runtimeHypertyURL}
            </div>
            <ul className="list-group">
                <li className="list-group-item">
                    {chatsComponents}
                    <NewChatButton onClick={()=>reset(participants)}/>
                </li>                    
            </ul>
        </div>
    )
}

ChatList = connect((state)=>{
    return {
        groupChat: state.groupChatHy,
        location: state.locationHy,
        chats:state.chats,
        participants: state.selectedParticipants
    }
}, (dispatch)=>{
    return {
        setActChat: (chat)=>dispatch(setActiveChat(chat)),
        reset: (participants)=>dispatch(reset(participants))
    }
})(ChatList)

export default ChatList
