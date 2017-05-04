import SurveyResultBoard from './board'
import { connect } from 'react-redux'

export default connect((state, ownProps)=>{
	return {
		results: state.challenges.find(c=>c.isEqual({_id: ownProps.params.id})).answers()
	}
}, (dispatch)=>{
	return {
	}
})(SurveyResultBoard)

