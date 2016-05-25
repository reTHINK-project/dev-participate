import React from 'react'
import { Link } from 'react-router'
import Participant from './participant'
import { connect } from 'react-redux'
import { tooglePartSelection, createChat } from '../../actions'

const Participants = ({ domain, groupChatHy, chatName, create, participants, selectedParticipants, toogleParticipantSelection }) => {
    let participantsCmp = participants
        .map((p)=><Participant key={p.email} domain={domain} online={p.online} email={p.email} onChange={toogleParticipantSelection} />)
    return(
            <div>
                <ul className="list-group">
                    {participantsCmp}
                </ul>
                <Link to='chat' className="btn btn-default" onClick={()=>create(groupChatHy, domain, chatName, selectedParticipants)}>Create</Link>
            </div>
    )
}

export default connect((state)=>{
    return {
        participants:state.participants,
        selectedParticipants: state.selectedParticipants,
        domain: state.domain,
        chatName: state.chatName,
        groupChatHy: state.groupChatHy
    }
}, (dispatch)=>{
    return {
        toogleParticipantSelection: (participant)=>dispatch(tooglePartSelection(participant)),
        create: (groupChatHy, domain, chatName, selectedParticipants)=>dispatch(createChat(groupChatHy, domain, chatName, selectedParticipants))
    }
})(Participants)
