import React from 'react'
import ChatListed from './chat-listed'
import NewChatButton from './new-chat-button'
import {setActiveChat, reset} from '../../actions'
import { connect } from 'react-redux'

let ChatList = React.createClass({
    render(){
        let chats = this.props.chats.map((chat) => {
            return <ChatListed key={chat.name} chat={chat} onSelect={this.props.setActChat}/>
        })

        return (
            <ul className="list-group">
                <li className="list-group-item">
                    {chats}
                    <NewChatButton onClick={()=>this.props.reset(this.props.participants)}/>
                </li>                    
            </ul>
        )
    }
})

ChatList = connect((state)=>{
    return {
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
