import React from 'react'

const Participant = ({domain, email, online, onChange}) => {
    return (
            <li className="list-group-item">
                <div className="row">
                    <div className="col-xs-2">
                        <label>
                            <input type="checkbox" onClick={()=>onChange({email: email, domain: domain})}/>
                        </label>
                    </div>
                    <div className="col-xs-10">
                        <div className="row">
                            <div className="col-xs-12">
                               <h3>{email}</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-4">
                               <p>Status</p> 
                            </div>
                            <div className="col-xs-8">
                                <p>{online?"online":"offline"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        )
}

export default Participant
