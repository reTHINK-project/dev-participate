import { addNewGroup } from '../../actions'
import ActionForm from './form'
import { connect } from 'react-redux'


export default connect((state)=>{
	return {
	}
}, (dispatch)=>{
	return {
		createNewGroup: ({ title, usernames='', locale }) => dispatch(addNewGroup(title, {username: usernames.split(';'), locale: locale}))
	}
})(ActionForm)

