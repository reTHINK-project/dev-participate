import SurveyResultBoard from './board'
import { connect } from 'react-redux'

export default connect((state, ownProps)=>{
	return {
		survey: { results: [{"question2":"dsdsdsds","question4":"1","question3":"1","question1":"dsdsdsds"},
		{"question2":"dsdsdsds","question4":"1","question3":"1","question1":"dsdsdsds"}]}
	}
}, (dispatch)=>{
	return {
	}
})(SurveyResultBoard)

