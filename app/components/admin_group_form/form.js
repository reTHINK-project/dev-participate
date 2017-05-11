import React from 'react'
import { Link } from 'react-router'
import Messages from './messages'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const ActionForm = React.createClass({
	getInitialState(){
		return {selectedUser: {profile:{}}}
	},

	render()
    {
        const participants = this.props.group.participants.toArray().map(p => {
            return (
                <li className="list-group-item">
                    <div className="row">
                        <div className="col-xs-3">
                            <img src={p.profile.avatar} className="img-responsive img-rounded"/>
                        </div>
                        <div className="col-cs-9">
                            <p>
								<button className="btn btn-link" onClick={()=>this.setState({selectedUser:p})}>{p.profile.username}</button><br/>
								<span className="label label-info">{p.accepted ? 'Confirmed' : 'Pending'}</span>
							</p>
                        </div>
                    </div>
                </li>
            )
        })

        const createChat = !this.props.chat ?
            (<Link to="admin" className="btn btn-default" onClick={() => this.props.openChat(this.props.group)}>
                Create Chat
            </Link>) :
            (<Link to={'admin/chat/' + this.props.chat.toString()} className="btn btn-default">
                Open Chat
            </Link>)

        return (
			<Tabs>
				<TabList>
					<Tab>Users</Tab>
					<Tab>Messages</Tab>
				</TabList>

				<TabPanel>
					<div className="row">
						<div className="btn-groupi col-xs-12 text-right" role="group">
							{createChat}&nbsp;
							<Link className="btn btn-default" to={'/admin/new_survey/' + this.props.group} id="btn-chat">
								Create Poll
							</Link>
						</div>
					</div>
					<div className="row top-buffer">
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
								<table className="table table-striped table-hover">
                                    <tbody>
										{Object.keys(this.state.selectedUser.profile).map(key => <tr><td>{key}:</td><td>{this.state.selectedUser.profile[key]}</td></tr>)}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</TabPanel>
				<TabPanel>
					<div className="row top-buffer">
						<div className="col-md-12">
							<Messages group={this.props.group} sendMessage={this.props.sendMessage}/>
						</div>
					</div>
				</TabPanel>
			</Tabs>
        )
	}
})

export default ActionForm
