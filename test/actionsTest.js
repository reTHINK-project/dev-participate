import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import sinon from 'sinon'
import { pollInvitation, groupInvitation, challengeResponse, adminMessage } from '../app/model/messages'
import * as actions from '../app/actions'
import * as Challenges from '../app/model/challenges'
import { ParticipantCollection } from '../app/model/participants'
import { __RewireAPI__  as acsRewireAPI } from '../app/actions'
import GroupChallenge from './builders/group-challenge'
import GroupInvitationChallenge from './builders/group-invitation-challenge'

let hypertyObject = {
	Notifications: { },
	Discovery: { },
	GroupChat: { },
	NotificationsObs: { },
	SurveyRep: {}
}
const hyperties = function() {
	return new Promise(resolve => {
		resolve(hypertyObject)
	})
}
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

acsRewireAPI.__Rewire__('getHyperties', hyperties)

describe('participate actions', ()=> {
	let store

	beforeEach(()=>{
		hypertyObject.Notifications = {
			send: sinon.spy()
		}
		hypertyObject.Discovery = {
			queryUsers: sinon.stub()
		}
		hypertyObject.GroupChat = {
			create: sinon.stub()
		}
		hypertyObject.SurveyRep = {
			createFromHyperties: sinon.stub()
		}
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
			hypertyObject.Discovery.queryUsers.withArgs(definition).returns([profile])
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
					expect(hypertyObject.Notifications.send.calledWith([profile])).to.be.true
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
					expect(hypertyObject.Notifications.send.calledWith([challenge.from])).to.be.true
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
			hypertyObject.GroupChat.create.resolves({name: title, onMessage: ()=>{}})
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
					expect(hypertyObject.GroupChat.create.calledWith(title)).to.be.true
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

	describe('sendAdminMessage', () => {
		it('should send a message to the users who matches the group filters', ()  => {
			const group = Challenges.createGroupChallenge('', {}, [])
			const message = {}

			return store.dispatch(actions.sendAdminMessage(group, message))
				.then(() => {
					expect(hypertyObject.Notifications.send.calledOnce).to.be.true
				})
		})

		it('should add the message to the group', ()  => {
			const group = Challenges.createGroupChallenge('', {}, [])
			const message = {}

			return store.dispatch(actions.sendAdminMessage(group, message))
				.then(()=>{
					expect(store.getActions()[0].data.sendedMessages.length).to.be.eql(1)
				})
		})
	})

	describe('processAdminMessage', () => {
		it('should create a new admin message challenge', ()=> {
			const message = adminMessage('test message')

			store.dispatch(actions.processAdminMessage(message))

			expect(store.getActions()[0].data.message).to.be.eql(message.data.message)
		})
	})

	describe('createPoll', () => {
		beforeEach(()=>{
		})

		it('should create the poll', ()=>{
            const poll = {}
			const challenge = Challenges.createPollChallenge({},
				Challenges.createGroupChallenge('', {}, [{}]))
			const expected_poll = Challenges.createPollChallenge(poll,challenge)

			return store.dispatch(actions.createPoll(poll, challenge))
				.then(()=>{
					expect(store.getActions()[0].data.definition).to.be.eql(expected_poll.definition)
					expect(store.getActions()[0].data.participants).to.be.eql(expected_poll.participants)
				})
		})

		it('should notify to challenge\'s users', () => {
            const poll = {title:'aa'}
			const challenge = Challenges.createPollChallenge(poll,
				Challenges.createGroupChallenge('', {}, [{}]))
			const invite = pollInvitation(challenge)

			return store.dispatch(actions.createPoll(poll, challenge))
				.then(() => {
					expect(hypertyObject.SurveyRep.createFromHyperties.calledWith(invite)).to.be.true
				})
		})
	})

	describe('pollReceived', () => {

	})

	describe('answerPoll', () => {

	})

	describe('checkIfAnyNewUserMatchFilters', ()=> {
		it('should add any user matching the filter to its group')
		it('should invite to the group any user matching the group filters')
	})
})
