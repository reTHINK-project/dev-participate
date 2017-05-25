import { connect } from 'react-redux'
import { logUserIn } from '../../actions'
import AdminDashboard from './admin_dashboard'

export default connect((state)=>{
    return {
        user: state.user,
		loading: state.loading
    }
}, (dispatch)=>{
    return {
        logIn: (user, password) => dispatch(logUserIn(user, password))
    }
})(AdminDashboard)
