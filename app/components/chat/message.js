import React, { PropTypes } from 'react'

const Message = ({content, time, isMe, identity}) => {
    return(
            <li className={(isMe?"right":"left")+ "clearfix"}><span className={"chat-img pull-"+(isMe?"right":"left")}>
                <img src={identity.avatar} alt="User Avatar" className="img-circle avatar"/>
            </span>
                <div className="chat-body clearfix">
                    <div className="header">
                        <strong className={(isMe?"":"pull-right")+" primary-font"}>{identity.username}</strong> <small className={(isMe?"":"pull-right")+ " text-muted"}>
                            <span className="glyphicon glyphicon-time"></span>{Math.round((((Date.now()-time) % 86400000) % 3600000) / 60000)} mins ago</small>
                    </div>
                    <p>
                        {content}
                    </p>
                </div>
            </li>
    )
}

Message.propTypes = {
    content: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    isMe: PropTypes.bool.isRequired,
    identity: PropTypes.object.isRequired
}
export default Message
