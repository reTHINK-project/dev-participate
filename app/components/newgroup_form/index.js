import { addNewGroup } from '../../actions'
import ActionForm from './form'
import { connect } from 'react-redux'

export default connect((state)=>{
	return {
		positions: state.userPositions.map(up => ({latitude: up.coords.latitude, longitude: up.coords.longitude, key: up.username})),
		center: state.position?{lat: state.position.coords.latitude, lng: state.position.coords.longitude }:{}
	}
}, (dispatch)=>{
	return {
		createNewGroup: ({ title, selection, locale }) => dispatch(addNewGroup(title, {username: selection, locale: locale}))
	}
})(ActionForm)

