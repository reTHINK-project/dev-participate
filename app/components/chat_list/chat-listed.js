import React, {PropTypes} from 'react'
import { Link } from 'react-router'

const ChatListed = ({chat, onSelect}) => {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-6">
                        <p>{new Date(chat.startingTime).toLocaleString('en-US')}</p>
                    </div>
                    <div className="col-cs-6">
                        <p>{chat.participants.length} participants</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <h3><Link to='chat' onClick={()=>onSelect(chat)}>{chat.name}</Link></h3>
                        <p> {chat.messages[chat.messages.length-1]?chat.messages[chat.messages.length-1].text:''}...</p>
                    </div>
                </div>
            </div>
        )
}

ChatListed.propTypes = {
    chat: PropTypes.object.isRequired
}

export default ChatListed
