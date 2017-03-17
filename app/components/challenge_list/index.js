import { connect } from 'react-redux'
import ChallengeList from './challenge_list'

export default connect((state)=>{
	return {
		challenges: state.challenges
	}
}, (dispatch)=>{
	return {
	}
})(ChallengeList)
