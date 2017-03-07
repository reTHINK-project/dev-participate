import { createNewGroup } from '../../actions'
import ActionForm from './form'
import { connect } from 'react-redux'


export default connect((state)=>{
    return {
    }
}, (dispatch)=>{
    return {
        createNewGroup: ({ title, hobbies, nearby }) => dispatch(createNewGroup(title, {hobbies: hobbies, nearby: nearby}))
    }
})(ActionForm)

