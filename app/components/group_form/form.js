import React from 'react'
import { Link } from 'react-router'

const ActionForm = ({group, chat, openChat}) => {
	let participants = group.participants.toArray().map(p=>{
		return <li className="list-group-item">
			<div className="row">
				<div className="col-xs-3">
					<img src={p.profile.avatar} className="img-responsive img-rounded"/>
				</div>
				<div className="col-cs-9">
					<p>{p.profile.username} <span className="label label-info">{p.accepted?'Confirmed':'Pending'}</span></p>
				</div>
			</div>
		</li>
	})

	if(participants.length === 0)
		participants = <p>No participants in this group.</p>

	const createChat = !chat ?
		(<Link to="/" className="btn btn-default" onClick={() => openChat(group)}>
			Create Chat
		</Link>) :
		(<Link to={'chat/' + chat.toString()} className="btn btn-default">
			Open Chat
		</Link>)

	return(
			<div>
				<div className="row">
					<div className="btn-groupi col-xs-12 text-right" role="group">
						{createChat}&nbsp;
						<Link className="btn btn-default" to={'new_survey/' + group.toString() } id="btn-chat">
							Create Poll
						</Link>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						<ul className="list-group">
							{participants}
						</ul>
					</div>
				</div>
			</div>
	)
}

export default ActionForm
