import * as actions from './creators'
import getHyperties from '../rethink'
import { adminMessage, groupInvitation, challengeResponse } from '../model/messages'
import { ParticipantCollection } from '../model/participants'
import * as Challenges from '../model/challenges'
import Challenge from '../model/challenges/challenge'
import config from '../config'

// group challenge

export function processGroupInvitation(data) {
	const challenge = Challenges.createInvitationChallenge(data)

	return actions.newChallengeAction(challenge)
}

export function answerChallenge(challenge, accepted) {
	return function(dispatch) {
		return getHyperties()
			.then(hyperties => {
				hyperties.Notifications.send([challenge.from], challengeResponse(challenge.challenge_generator, accepted))
				return actions.removeChallengeAction(challenge)
			}).then((action)=>dispatch(action))
	}
}

function getUsers(hyperties, definition) {
	const removeUndefinedValues = (o) => JSON.parse(JSON.stringify(o))
	const users = hyperties.Discovery.queryUsers(removeUndefinedValues(definition))

	return users
}

export function addNewGroup(title, definition) {
	return function(dispatch){

		return getHyperties()
			.then(hyperties => {
				const users = getUsers(hyperties, definition)
				const challenge = Challenges.createGroupChallenge(
					title, definition, ParticipantCollection.createFrom(users))

				hyperties.Notifications.send(users, groupInvitation(challenge))
				return actions.newChallengeAction(challenge)
			}).then((action)=>dispatch(action))

	}
}

export function processGroupChallengeResponse(challenges, msg) {
	return function(dispatch) {
		const challenge = challenges.find(e=>e.isEqual(Challenge.create(msg.data.challenge)))
		const participants = challenge.participants.updateParticipant(msg.from.username, msg.data.accepted)
		const new_challenge = Challenges.createGroupChallenge(challenge.title, challenge.definition, participants, [], challenge._id)

		dispatch(actions.updateChallenge(new_challenge))
	}
}

// admin messages

export function processAdminMessage(data) {
	const challenge = Challenges.createAdminMessageChallenge(data)

	return actions.newChallengeAction(challenge)
}

export function sendAdminMessage(group, msg) {
	return function(dispatch) {
		return getHyperties()
			.then(hyperties => {
				const users = getUsers(hyperties, group.definition)

				hyperties.Notifications.send(users, adminMessage(msg))

				return actions.updateChallenge(Challenges.createGroupChallenge(group.title,
					group.definition, group.participants,
					group.sendedMessages.concat(msg), group._id))
			}).then((action)=>dispatch(action))
	}
}

// chat challenge

export function openChat(title, participants, parent) {
	return function(dispatch) {
		return getHyperties()
			.then(hyperties => {
				return hyperties.GroupChat.create(title, participants.toHypertyParticipant(config.domain))
			}).then(chat => {
				const chatChallenge = Challenges.createChatChallenge(chat, parent)
				chat.onMessage((msg)=>dispatch(actions.addMessageToChat(chatChallenge, msg)))
				return actions.newChallengeAction(chatChallenge)
			}).then(action=>dispatch(action))
	}
}

export function sendMessage(chat, message) {
	return function(dispatch) {
		return chat.sendMessage(message)
			.then(chat=>dispatch(actions.updateChallenge(chat)))
	}
}

// user

export function logUserIn(user, password) {
	return {
		type: 'LOGIN',
		data: {
			user: user,
			password: password,
		}
	}
}

// poll

export function createPoll(poll, participants) {
	return function(dispatch) {
		return getHyperties()
			.then(hyperties =>
				hyperties.SurveyRep.create(poll, participants.toHypertyParticipant(config.domain)))
			.then(survey => {
				const challenge_poll = Challenges.createPollChallenge(survey)
				return actions.newChallengeAction(challenge_poll)
			}).then(action=>dispatch(action))
	}
}

export function answerPoll(res, pollRequest) {
	return function(dispatch) {
        pollRequest.answer(res)
		dispatch(actions.removeChallengeAction(pollRequest))
	}
}
