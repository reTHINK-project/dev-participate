import SurveyForm from './form'
import { connect } from 'react-redux'

export default connect((state, ownProps)=>{
	return {
		challenge: state.challenges.find(c=>c.isEqual({_id:ownProps.challenge_id}))
	}
}, (dispatch)=>{
	return {
		createPoll: (poll, challenge) => console.log('poll', poll)
	}
})(SurveyForm)
