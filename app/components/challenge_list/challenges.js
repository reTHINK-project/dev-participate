import React, {PropTypes} from 'react'
import { Link } from 'react-router'

const Group = ({title}) => {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-6">
                        <p>Date?</p>
                    </div>
                    <div className="col-cs-6">
                        <p>? participants</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <h3><Link to='group'>{title}</Link></h3>
                        <p> ?...</p>
                    </div>
                </div>
            </div>
        )
}

const Message = ()=>{}
const VideoCall = ()=>{}
const VoiceCall = ()=>{}
const Chat = ()=>{}
const Survey = ()=>{}

export default { Group: Group, VideoCall: VideoCall, Message: Message, VoiceCall: VoiceCall, Chat: Chat }
