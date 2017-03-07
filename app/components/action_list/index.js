import { connect } from 'react-redux'
import ActionList from './action_list'

export default connect((state)=>{
    return {
        actions: state.actions
    }
}, (dispatch)=>{
    return {
    }
})(ActionList)
