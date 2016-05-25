import React from 'react'
import { connect } from 'react-redux'
import { sendMessage, setDistance, setMessage } from '../../actions'
import Message from './message'

let Chat = ({chat, send, distance, message, setDistance, setMessage }) => {
    let messages = !chat?[]:chat.messages
        .map((message, index)=><Message key={index} content={message.text} time={Date.now()} isMe={message.isMe}/>)
    return(
            <div className="expando">
            <div className="panel-body">
                <ul className="chat">
                    {messages}
                </ul>
            </div>
            <div className="panel-footer">
                <div className="input-group">
                    <input id="btn-input" onKeyUp={(event)=>setMessage(event.target.value)} type="text" className="form-control input-sm" placeholder="Type your message here..."/>
                    <span className="input-group-btn">
                        <button className="btn btn-warning btn-sm" onClick={()=>send(chat, message, distance)} id="btn-chat">
                            Send
                        </button>
                    </span>
                </div>
                <div className="checkbox">
                    <label>
                        <input type="checkbox" onClick={(e)=>setDistance(e.target.checked)}/>Nearest
                    </label>
                </div>
            </div>
        </div>
        )
}

Chat = connect((state)=>{
    return {
        chat: state.activeChat,
        message: state.message,
        distance: state.distance
    }
},(dispatch) =>{
    return {
        send:(chat, message, distance) => dispatch(sendMessage(chat, message, distance)),
        setMessage: (message)=>dispatch(setMessage(message)),
        setDistance: (active) => dispatch(setDistance(active))
    }
})(Chat)

export default Chat
