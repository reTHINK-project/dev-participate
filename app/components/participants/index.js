import React from 'react'
import { Link } from 'react-router'
import Participant from './participant'

const Participants = (props) => {
    return(
            <div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Participant />
                    </li>
                    <li className="list-group-item">
                        <Participant />
                    </li>
                    <li className="list-group-item">
                        <Participant />
                    </li>
                </ul>
                <Link to={{pathname:'chat', state:{name:props.location.state.name, 
                    participants:[{domain:props.domain, email:'openidtest20@gmail.com'}]}}} className="btn btn-default">Create</Link>
            </div>
    )
}

export default Participants
