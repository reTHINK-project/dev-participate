import { addNewGroup } from '../../actions'
import ActionForm from './form'
import { connect } from 'react-redux'

const buildUsernamesCollection = (usernamesString, usernameArray) => {
	let res = usernamesString.split(';')
		.filter(u=>u!=='')
		.concat(usernameArray)

	return res.length>0?res:undefined
}

export default connect((state)=>{
	return {
		positions: state.userPositions.map(up => ({latitude: up.coords.latitude, longitude: up.coords.longitude, key: up.username})),
		center: {lat: 42.5950289, lng: -8.8222481 }
	}
}, (dispatch)=>{
	return {
		createNewGroup: ({ title, usernames='', locale, selection = [] }) =>
			dispatch(addNewGroup(title, {username: buildUsernamesCollection(usernames, selection), locale: locale}))
	}
})(ActionForm)

