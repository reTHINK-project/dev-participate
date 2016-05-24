import React from 'react'
import { Link } from 'react-router'
import Participant from './participant'
import { connect } from 'react-redux'
import { tooglePartSelection } from '../../actions'

const Participants = ({ domain, participants, selectedParticipants, toogleParticipantSelection }) => {
    let participantsCmp = participants.map((p)=><Participant key={p.email} domain={domain} online={p.online} email={p.email} onChange={toogleParticipantSelection} />)
    return(
            <div>
                <ul className="list-group">
                    {participantsCmp}
                </ul>
                <Link to='chat' className="btn btn-default">Create</Link>
            </div>
    )
}

export default connect((state)=>{
    return {
        participants:state.participants,
        selectedParticipants: state.selectedParticipants
    }
}, (dispatch)=>{
    return {
        toogleParticipantSelection: (participant)=>dispatch(tooglePartSelection(participant))
    }
})(Participants)
