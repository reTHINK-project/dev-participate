import SurveyRequestForm from './form'
import { connect } from 'react-redux'
import { answerPoll } from '../../actions'
import Challenge from '../../model/challenges/challenge'

export default connect((state, ownProps)=>{
	return {
		pollRequest: state.challenges.find(c=>c.isEqual(Challenge.create(ownProps.params.id)))
	}
}, (dispatch)=>{
	return {
		answerSurvey: (res, pollRequest) => dispatch(answerPoll(res, pollRequest))
	}
})(SurveyRequestForm)
