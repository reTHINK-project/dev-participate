import * as actions from './actions/creators'
import * as Challenges from './model/challenges'
import { processGroupInvitation,
		processGroupChallengeResponse,
		processAdminMessage} from './actions'

export default function initSubscriptions(store, hyperties) {
	const dispatch = store.dispatch

	hyperties.NotificationsObs.onNotification((msg) => {
		if(msg.type === 'GROUP_INVITATION'){
			dispatch(processGroupInvitation(msg))
		}else if (msg.type === 'CHALLENGE_RESPONSE') {
			dispatch(processGroupChallengeResponse(store.getState().challenges, msg))
		}else if (msg.type === 'ADMIN_MESSAGE') {
			dispatch(processAdminMessage(msg))
		}
	})
	hyperties.Discovery.onUserListChanged(() => {})
	hyperties.GroupChat.onInvite((groupChat)=>{
		const chatChallenge = Challenges.createChatChallenge(groupChat)
		groupChat.onMessage((msg)=>dispatch(actions.addMessageToChat(chatChallenge, msg)))
		dispatch(actions.newChallengeAction(chatChallenge))
	})
	hyperties.LocationObs.watchUsersPosition(positions => {
		dispatch(actions.receivedUserPositions(positions))
	})
	hyperties.SurveyObs.onRequest((poll) => {
		const challenge = Challenges.createPollRequestChallenge(poll)
		dispatch(actions.newChallengeAction(challenge))
	})
}
