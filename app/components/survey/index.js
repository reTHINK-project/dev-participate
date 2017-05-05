import SurveyForm from './form'
import { connect } from 'react-redux'
import { createPoll } from '../../actions'
import { Participant } from '../../model/participants'
import Challenge from '../../model/challenges/challenge'

export default connect((state, ownProps)=>{
	return {
		participants: state.challenges.find(c=>c.isEqual(Challenge.create(ownProps.params.challenge_id))).participants.filterByStatus(Participant.status.confirmed)
	}
}, (dispatch)=>{
	return {
		createPoll: (poll, participants) => dispatch(createPoll(poll, participants))
	}
})(SurveyForm)
