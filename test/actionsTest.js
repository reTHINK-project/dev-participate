import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import sinon from 'sinon'
import { groupInvitation, challengeResponse } from '../app/model/messages'
import * as actions from '../app/actions'
import * as Challenges from '../app/model/challenges'
import * as ParticipantCollection from '../app/model/participantCollection'
import { __RewireAPI__  as acsRewireAPI } from '../app/actions'
import GroupChallenge from './builders/group-challenge'
import GroupInvitationChallenge from './builders/group-invitation-challenge'

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
					expect(store.getActions()[0].data.title).to.be.eql(expected_group.title)
					expect(store.getActions()[0].data.definition).to.be.eql(expected_group.definition)
					expect(store.getActions()[0].data.profile).to.be.eql(expected_group.profile)
				})
		})

		it('should notify connected user that match the filters', () => {
			return store.dispatch(actions.addNewGroup(title, definition))
				.then(() => {
					expect(notificationsHy.send.calledWith([profile])).to.be.true
				})
		})
	})

	describe('processGroupInvitation', () => {
		it('should create a new group invitation challenge', ()=> {
			const message = groupInvitation({title:'test', challenge: 1})
			const challenge = GroupInvitationChallenge('test').withFrom().create()

			store.dispatch(actions.processGroupInvitation(message))

			expect(store.getActions()[0].data.title).to.be.eql(challenge.title)
		})
	})

	describe('answerChallenge', () => {
		const challenge = {title: 'test', from: {username: 'test'}}

		it('should remove the challenge', ()=>{
			return store.dispatch(actions.answerChallenge(challenge))
				.then(()=>{
					expect(store.getActions()[0].data.title).to.be.eql(challenge.title)
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
			const profile = {username: 'user'}
			const challenge = Challenges.createGroupChallenge('test', {}, ParticipantCollection.createFrom([profile]), 'id')
			const challenges = [ challenge ]
			const response_msg = challengeResponse(challenges.toString(), true)
			response_msg.from = profile

			store.dispatch(actions.processGroupChallengeResponse(challenges, response_msg))

			expect(store.getActions()[0].data.participants.toArray()[0].accepted).to.be.true
		})
	})

	describe('openChat', () => {
		const title = 'ChatTest'

		beforeEach(()=>{
			groupChatHy.create.resolves({name: title, onMessage: ()=>{}})
		})

		it('should show a new chat challenge', () => {
			const participants = ParticipantCollection.create([])
			return store.dispatch(actions.openChat(title, participants))
				.then(()=>{
					expect(store.getActions()[0].data.title).to.be.eql(title)
				})
		})

		it('should notify all participants about the new chat', () => {
			const participants = ParticipantCollection.create([{accepted:true, profile:{username:'test'}}])

			return store.dispatch(actions.openChat(title, participants))
				.then(()=>{
					expect(groupChatHy.create.calledWith(title)).to.be.true
				})
		})
	})

	describe('receivedMessage', ()=> {
		it('should add received messages', ()=>{
			const chat = Challenges.createChatChallenge({})
			const state = {challenges: [ chat ]}
			const message = {}
			acsRewireAPI.__Rewire__('STORE', {getState:()=>state})
			store.dispatch(actions.receiveMessage(chat.toString(), message))

			expect(store.getActions()[0].data.messages.length).to.be.eql(1)
		})
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

		xit('should add the message', () => {
			const chat = {
				sendMessage: sinon.stub()
			}
			const message = {}

			chat.sendMessage.resolves({})
			return store.dispatch(actions.sendMessage(chat, message))
				.then(()=>{
					expect(store.getActions()[0].data.messages.length).to.be.eql(1)
				})
		})
	})

	describe('checkIfAnyNewUserMatchFilters', ()=> {
		it('should add any user matching the filter to its group')
		it('should invite to the group any user matching the group filters')
	})
})
