import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import sinon from 'sinon'
import { groupInvitation, challengeResponse } from '../app/model/messages'
import * as actions from '../app/actions'
import { __RewireAPI__  as acsRewireAPI } from '../app/actions'
import GroupChallenge from './builders/group-challenge'
import GroupInvitationChallenge from './builders/group-invitation-challenge'
import ParticipantCollection from './builders/participant'

const notificationsHy = {
	send: sinon.spy()
}
const discoveryHy = {
	queryUsers: sinon.stub()
}
const groupChatHy = {
	create: sinon.stub()
}
const notificationObsHy = {
}
const hyperties = function() {
	return new Promise(resolve => {
		resolve({
			Notifications: notificationsHy,
			Discovery: discoveryHy,
			GroupChat: groupChatHy,
			NotificationsObs: notificationObsHy
		})
	})
}
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

acsRewireAPI.__Rewire__('getHyperties', hyperties)

describe('participate actions', ()=> {
	let store

	beforeEach(()=>{
		store = mockStore({
		})
	})

	describe('addNewGroup', ()=>{
		const title = 'test'
		const definition = {
			locale: 'ES'
		}
		const profile = {username: 'test'}

		beforeEach(()=>{
			discoveryHy.queryUsers.withArgs(definition).returns([profile])
		})

		it('should create the group', ()=>{
			const expected_group = GroupChallenge(title)
				.withDefinition(definition)
				.addInvitation(profile)
				.create()
			return store.dispatch(actions.addNewGroup(title, definition))
				.then(()=>{
					expect(store.getActions()[0].data.isEqual(expected_group)).to.be.true
				})
		})

		it('should notify connected user that match the filters', () => {
			return store.dispatch(actions.addNewGroup(title, definition))
				.then(() => {
					expect(notificationsHy.send.calledWith([profile])).to.be.true
				})
		})
	})

	describe('showNewChallenge', () => {
		[{
			name: 'group',
			message: groupInvitation('test'),
			challenge: GroupInvitationChallenge('test').withFrom().create()
		}].forEach((data) => {
			it(`should create a new ${data.name} challenge`, ()=> {
				store.dispatch(actions.showNewChallenge(data.message))

				expect(store.getActions()[0].data).to.be.eql(data.challenge)
			})
		})
	})

	describe('answerChallenge', () => {
		const challenge = {title: 'test', from: {username: 'test'}}

		it('should remove the challenge', ()=>{
			return store.dispatch(actions.answerChallenge(challenge))
				.then(()=>{
					expect(store.getActions()[0].data).to.be.eql(challenge)
				})
		})

		it('should send a response', () =>{
			const accepted = true
			return store.dispatch(actions.answerChallenge(challenge, accepted))
				.then(() => {
					expect(notificationsHy.send.calledWith([challenge.from])).to.be.true
				})
		})
	})

	describe('processGroupChallengeResponse', () => {
		it('should update the membership status', () => {
			const title = 'test'
			const profile = {username: 'user'}
			const response_msg = challengeResponse(title, true)
			response_msg.from = profile

			const expected_status = {
				title: title,
				username: profile.username,
				accepted: true
			}
			store.dispatch(actions.processGroupChallengeResponse(response_msg))

			expect(store.getActions()[0].data).to.be.eql(expected_status)
		})
	})

	describe('openChat', () => {
		const title = 'ChatTest'

		beforeEach(()=>{
			groupChatHy.create.resolves({name: title})
		})

		it('should show a new chat challenge', () => {
			const participants = ParticipantCollection().create()
			return store.dispatch(actions.openChat(title, participants))
				.then(()=>{
					expect(store.getActions()[0].data.title).to.be.eql(title)
				})
		})

		it('should notify all participants about the new chat', () => {
			const participants = ParticipantCollection()
				.withParticipant([{accepted:true, profile:{username:'test'}}])
				.create()

			return store.dispatch(actions.openChat(title, participants))
				.then(()=>{
					expect(groupChatHy.create.calledWith(title)).to.be.true
				})
		})
	})

	describe('showReceivedMessage', ()=> {
	})

	describe('sendMessage', () => {
		it('should send the message', () => {
			const chat = {
				sendMessage: sinon.stub()
			}
			const message = {}

			chat.sendMessage.resolves({})
			return store.dispatch(actions.sendMessage(chat, message))
				.then(()=>{
					expect(chat.sendMessage.calledWith(message)).to.be.true
				})
		})
	})

	describe('checkIfAnyNewUserMatchFilters', ()=> {
		it('should add any user matching the filter to its group')
		it('should invite to the group any user matching the group filters')
	})
})
