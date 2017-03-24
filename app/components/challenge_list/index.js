import { connect } from 'react-redux'
import ChallengeList from './challenge_list'
import { answerChallenge } from '../../actions'

export default connect((state)=>{
	return {
		challenges: state.challenges
	}
}, (dispatch)=>{
	return {
		rejectChallenge: (challenge) => dispatch(answerChallenge(challenge))
	}
})(ChallengeList)
