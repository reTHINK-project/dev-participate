import React, {PropTypes} from 'react'
import { Link } from 'react-router'

export const Group = ({title, participants, definition}) => {
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

export const GroupInvitation = ({challenge, onAccept, onReject}) => {
	return (
			<div>
				<div className="row">
					<div className="col-xs-6">
						<p>Group invitation</p>
					</div>
					<div className="col-xs-6">
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						<h3>{challenge.title}</h3>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						<button onClick={()=>onAccept(challenge)}>ACCEPT</button>
						<button onClick={()=>onReject(challenge)}>REJECT</button>
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
