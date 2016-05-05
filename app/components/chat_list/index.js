import React from 'react'
import ChatListed from './chat-listed'
import NewChatButton from './new-chat-button'
import {init, subscribeNewChat, setActiveChat} from '../../actions'
import { connect } from 'react-redux'

let ChatList = React.createClass({
    componentWillMount(){
        init(this.props.runtime, this.props.domain, this.props.dispatch)
        this.props.dispatch(setActiveChat())
    },

    render(){
        let chats = this.props.chats.map(function(chat){
            return <ChatListed chat={chat} onSelect={this.handleSelect}/>
        }.bind(this))

        return (
            <ul className="list-group">
                <li className="list-group-item">
                    {chats}
                    <NewChatButton />
                </li>                    
            </ul>
        )
    },

    handleSelect(chat){

        this.props.dispatch(setActiveChat(chat))
    }
})

ChatList = connect((state)=>{
    return {chats:state.chats}
})(ChatList)

export default ChatList
