import ActionForm from './form'
import { connect } from 'react-redux'
import { openChat } from '../../actions'
import { Participant } from '../../model/participants'
import Challenge from '../../model/challenges/challenge'

export default connect((state, ownProps)=>{
	const challenge = state.challenges.filter(g => g.isEqual(Challenge.create(ownProps.routeParams.id))).shift()
	const chat = state.challenges.find(g=>g.parent && g.parent.isEqual(challenge))
	return {
		group: challenge,
		chat: chat
	}
}, (dispatch)=>{
	return {
		openChat: (challenge) => dispatch(
			openChat(challenge.title, challenge.participants.filterByStatus(Participant.status.confirmed), challenge.toString())
		)
	}
})(ActionForm)

