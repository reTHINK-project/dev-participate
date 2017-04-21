import { connect } from 'react-redux'
import List from './list'
import { types } from '../../model/challenges'

export default connect((state)=>{
	return {
		groups: state.challenges.filter(c=>c.type === types.GROUP)
	}
}, (dispatch)=>{
	return {
	}
})(List)
