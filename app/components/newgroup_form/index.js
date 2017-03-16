import { addNewGroup } from '../../actions'
import ActionForm from './form'
import { connect } from 'react-redux'


export default connect((state)=>{
	return {
	}
}, (dispatch)=>{
	return {
		createNewGroup: ({ title, hobbies, nearby }) => dispatch(addNewGroup(title, {hobbies: hobbies, nearby: nearby}))
	}
})(ActionForm)

