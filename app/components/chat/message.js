import React, { PropTypes } from 'react'

const Message = ({content, time, isMe, from}) => {
    return(
            <li className={(isMe?"right":"left")+ "clearfix"}>
                <span className={"chat-img pull-"+(isMe?"right":"left")}>
                    <img src={from.avatar} alt="User Avatar" className="img-circle avatar"/>
                </span>
                <div className="chat-body clearfix">
                    <div className={(isMe?"":"pull-right")+" header"}>
                        <strong className="primary-font">
                            {from.username + "  "}
                        </strong>
                        <small className="text-muted">
                            <span className="glyphicon glyphicon-time"/>
                            {time}
                        </small>
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
    from: PropTypes.object.isRequired
}
export default Message
