import React from 'react'
import { Link } from 'react-router'

const ActionForm = () => {
        return(
            <div>
                <div className="row">
                    <div className="btn-groupi col-xs-12 text-right" role="group">
                        <Link to="admin/chat" className="btn btn-default">Chat</Link>
                        <button type="button" className="btn btn-default">VideoCall</button>
                        <button type="button" className="btn btn-default">VoiceCall</button> 
                        <button type="button" className="btn btn-default">Messages</button> 
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <ul className="list-group">
                          <li className="list-group-item">
                            <div className="row">
                                <div className="col-xs-3">
                                    <img src="https://randomuser.me/api/portraits/women/49.jpg" className="img-responsive img-rounded"/>
                                </div>
                                <div className="col-cs-9">
                                    <p>Addison Patterson</p>
                                </div>
                            </div>
                          </li>
                          <li className="list-group-item">
                            <div className="row">
                                <div className="col-xs-3">
                                    <img src="https://randomuser.me/api/portraits/women/79.jpg" className="img-responsive img-rounded"/>
                                </div>
                                <div className="col-cs-9">
                                    <p>Aubree Wade</p>
                                </div>
                            </div>
                          </li>
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
                        <div className="panel panel-info">
                            <div className="panel-heading">
                                <h3 className="panel-title">Messages sended to group</h3>
                            </div>
                            <div className="panel-body">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default ActionForm
