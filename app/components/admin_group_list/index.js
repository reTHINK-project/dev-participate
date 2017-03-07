import { connect } from 'react-redux'
import { logUserIn } from '../../actions'
import List from './list'

export default connect((state)=>{
    return {
        groups: []
    }
}, (dispatch)=>{
    return {
    }
})(List)
