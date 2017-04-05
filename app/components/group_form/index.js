import ActionForm from './form'
import { connect } from 'react-redux'
import { openChat } from '../../actions'
import * as participant from '../../model/participant'

export default connect((state, ownProps)=>{
	const challenge = state.challenges.filter(g => g.isEqual({_id: ownProps.routeParams.id})).shift()
	return {
		group: challenge
	}
}, (dispatch)=>{
	return {
		openChat: (challenge) => dispatch(
			openChat(challenge.title, challenge.participants.filterByStatus(participant.status.confirmed))
		)
	}
})(ActionForm)

