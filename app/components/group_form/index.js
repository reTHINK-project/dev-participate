import ActionForm from './form'
import { connect } from 'react-redux'
import { openChat } from '../../actions'
import { status as participantStatus } from '../../model/participant'

export default connect((state, ownProps)=>{
	const challenge = state.challenges.filter(g => g.title === ownProps.routeParams.id).shift()
	return {
		group: challenge
	}
}, (dispatch)=>{
	return {
		openChat: (challenge) => dispatch(openChat(challenge.title, challenge.participantsByStatus(participantStatus.confirmed)))
	}
})(ActionForm)

