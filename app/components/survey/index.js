import SurveyForm from './form'
import { connect } from 'react-redux'
import { createPoll } from '../../actions'
import { Participant } from '../../model/participants'

export default connect((state, ownProps)=>{
	return {
		participants: state.challenges.find(c=>c.isEqual({_id: ownProps.params.challenge_id})).participants.filterByStatus(Participant.status.confirmed)
	}
}, (dispatch)=>{
	return {
		createPoll: (poll, participants) => dispatch(createPoll(poll, participants))
	}
})(SurveyForm)
