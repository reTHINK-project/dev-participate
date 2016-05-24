import React from 'react'
import ChatListed from './chat-listed'
import NewChatButton from './new-chat-button'
import {subscribeNewChat, setActiveChat,
        tooglePartSelection, setChatName} from '../../actions'
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
                    <NewChatButton onClick={this.cleanState}/>
                </li>                    
            </ul>
        )
    },

    cleanState(){
        this.props.setActChat()
        this.props.participants.forEach((p)=>props.toogleParticipantSelection(p))
        this.props.setName()
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
        toogleParticipantSelection: (participant)=>dispatch(tooglePartSelection(participant)),
        setName: (name)=>dispatch(setChatName(name))
    }
})(ChatList)

export default ChatList
