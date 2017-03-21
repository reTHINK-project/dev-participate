import React from 'react'
import { Link } from 'react-router'

const ActionForm = ({group}) => {
	const participants = group.participants.map(p=>{
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

	return(
			<div>
				<div className="row">
					<div className="btn-groupi col-xs-12 text-right" role="group">
						<Link to="chat" className="btn btn-default">Chat</Link>
						<button type="button" className="btn btn-default">VideoCall</button>
						<button type="button" className="btn btn-default">VoiceCall</button>
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
