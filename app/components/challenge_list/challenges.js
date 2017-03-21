import React, {PropTypes} from 'react'
import { Link } from 'react-router'

const Group = ({title, participants, definition}) => {
	return (
			<div>
				<div className="row">
					<div className="col-xs-6">
					</div>
					<div className="col-cs-6">
						<p>{participants.length} participants</p>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						<h3><Link to={'group/' + title}>{title}</Link></h3>
						<p>{JSON.stringify(definition)}</p>
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

export default { Survey: Survey, Group: Group, VideoCall: VideoCall, Message: Message, VoiceCall: VoiceCall, Chat: Chat }
