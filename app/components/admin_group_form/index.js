import ActionForm from './form'
import { connect } from 'react-redux'
import { openChat, sendAdminMessage } from '../../actions'
import { Participant } from '../../model/participants'
import { types } from '../../model/challenges'
import Challenge from '../../model/challenges/challenge'


export default connect((state, ownProps)=>{
	const group = state.challenges.find(g => g.isEqual(Challenge.create(ownProps.routeParams.id))) //TODO: build a chalenge identifier
	const chat = state.challenges.find(g=>g.title===group.title && g.type === types.CHAT) //TODO: get chat from group
	return {
		group: group,
		chat: chat
	}
}, (dispatch)=>{
	return {
		openChat: (challenge) => dispatch(
			openChat(challenge.title, challenge.participants.filterByStatus(Participant.status.confirmed))
		),
		sendMessage: (group, message) => dispatch(sendAdminMessage(group, message))
	}
})(ActionForm)

