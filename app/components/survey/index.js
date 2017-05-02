import SurveyForm from './form'
import { connect } from 'react-redux'
import { createPoll } from '../../actions'

export default connect((state, ownProps)=>{
	return {
		challenge: state.challenges.find(c=>c.isEqual({_id:ownProps.params.challenge_id}))
	}
}, (dispatch)=>{
	return {
		createPoll: (poll, challenge) => dispatch(createPoll(poll, challenge))
	}
})(SurveyForm)
