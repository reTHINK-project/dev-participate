import React from 'react'
import { connect } from 'react-redux'
import { createChat, sendMessage } from '../../actions'
import Message from './message'

let Chat = React.createClass({
    componentWillMount(){
        if(!this.props.chat){
            let dispatch = this.props.dispatch
            dispatch(createChat(this.props.runtime, this.props.domain, 
                        this.props.location.state.name, this.props.location.state.participants))
        }
    },

    render(){
        let messages = this.props.chat?
            this.props.chat.messages.map(this.buildMessage):[]
        return(
                <div className="expando">
                <div className="panel-body">
                    <ul className="chat">
                        {messages}
                    </ul>
                </div>
                <div className="panel-footer">
                    <div className="input-group">
                        <input id="btn-input" onChange={(event)=>this.setState({message: event.target.value})} type="text" className="form-control input-sm" placeholder="Type your message here..."/>
                        <span className="input-group-btn">
                            <button className="btn btn-warning btn-sm" onClick={()=>this.props.dispatch(sendMessage(this.props.chat, this.state.message))} id="btn-chat">
                                Send
                            </button>
                        </span>
                    </div>
                </div>
            </div>
            )
    },

    buildMessage(message){
        return <Message content={message.text} time={Date.now()} isMe={message.isMe}/> 
    }
})

Chat = connect((state)=>{
    return {
        chat: state.activeChat?
            state.activeChat:undefined
    }
})(Chat)

export default Chat
