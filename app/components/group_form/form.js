import React from 'react'
import { Link } from 'react-router'

const ActionForm = React.createClass({
    handleInputChange (event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    },

    render () {
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
                </div>
            </div>
        )
    }
})

export default ActionForm
