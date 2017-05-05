import SurveyResultBoard from './board'
import { connect } from 'react-redux'
import Challenge from '../../model/challenges/challenge'

export default connect((state, ownProps)=>{
	return {
		results: state.challenges.find(c=>c.isEqual(Challenge.create(ownProps.params.id))).answers()
	}
}, (dispatch)=>{
	return {
	}
})(SurveyResultBoard)

