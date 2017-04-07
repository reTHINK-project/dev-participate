import { connect } from 'react-redux'
import List from './list'

export default connect((state)=>{
	return {
		groups: state.challenges.filter(c=>c.type === 'GROUP') //TODO: remove hardcode
	}
}, (dispatch)=>{
	return {
	}
})(List)
