import SurveyRequestForm from './form'
import { connect } from 'react-redux'
import { answerPoll } from '../../actions'

export default connect((state, ownProps)=>{
	return {
		pollRequest: state.challenges.find(c=>c.isEqual({_id: ownProps.params.id}))
	}
}, (dispatch)=>{
	return {
		answerSurvey: (res, pollRequest) => dispatch(answerPoll(res, pollRequest))
	}
})(SurveyRequestForm)
