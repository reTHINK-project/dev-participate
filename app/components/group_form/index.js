import ActionForm from './form'
import { connect } from 'react-redux'


export default connect((state, ownProps)=>{
	return {
		group: state.challenges.filter(g => g.title === ownProps.routeParams.id).shift()
	}
}, (dispatch)=>{
	return {
	}
})(ActionForm)

