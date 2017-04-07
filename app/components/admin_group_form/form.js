import React from 'react'
import { Link } from 'react-router'
import Messages from './messages'

const ActionForm = ({group, chat, openChat, sendMessage}) => {
	const participants = group.participants.toArray().map(p=>{
		return (
			<li className="list-group-item">
				<div className="row">
					<div className="col-xs-3">
						<img src={p.profile.avatar} className="img-responsive img-rounded"/>
					</div>
					<div className="col-cs-9">
						<p>{p.profile.username} <span className="label label-info">{p.accepted?'Confirmed':'Pending'}</span></p>
					</div>
				</div>
			</li>
		)
	})

	const createChat =!chat?
		(<Link to="admin" className="btn btn-default" onClick={()=>openChat(group)}>
				Create Chat
        </Link>):
		(<Link to={'admin/chat/' + chat.toString()} className="btn btn-default">
				Open Chat
        </Link>)

	return(
		<div>
			<div className="row">
				<div className="btn-groupi col-xs-12 text-right" role="group">
					{createChat}
					<button type="button" className="btn btn-default">VideoCall</button>
					<button type="button" className="btn btn-default">VoiceCall</button>
				</div>
			</div>
			<div className="row">
				<div className="col-md-4">
					<ul className="list-group">
						{participants}
					</ul>
				</div>
				<div className="col-md-8">
					<div className="panel panel-primary">
						<div className="panel-heading">
							<h3 className="panel-title">User Info</h3>
						</div>
						<div className="panel-body">

						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
					<Messages group={group} sendMessage={sendMessage} />
				</div>
			</div>
		</div>
	)
}

export default ActionForm
