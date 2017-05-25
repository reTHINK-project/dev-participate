import { expect } from 'chai'
import sinon from 'sinon'
import * as create from '../app/actions/creators.js'
import reducer from '../app/reducers'
import { createChatChallenge, createInvitationChallenge } from '../app/model/challenges'

describe('participate reducers', () => {
	describe('addNewChallenge', () => {
		it('should add a new challenge', ()=> {
			const title = 'test'
			const initialState = {challenges: []}
			const finalState = {challenges: [{title:title, type: 'GROUP_INVITATION'}]}
			const action = create.newChallengeAction({title:title, type:'GROUP_INVITATION'})
			expect(reducer(initialState, action)).to.be.eql(finalState)
		})
	})

	describe('removeChallengeAction', () => {
		it('should remove a challenge', ()=> {
			const title = 'test'
			const challenge = createInvitationChallenge({data: {title: title}})
			const initialState = {challenges: [challenge]}
			const finalState = {challenges: []}
			const action = create.removeChallengeAction(challenge)
			expect(reducer(initialState, action)).to.be.eql(finalState)
		})
	})

	describe('sendMessage', () => {
		it('should update the challenge', ()=> {
			const adapter = {
				name: 'title',
				sendMessage: sinon.stub()
			}
			adapter.sendMessage.resolves({text: '', startingTime: '', identity: {profile: ''}, isMe: false})
			const challenge = createChatChallenge(adapter)
			const initialState = {challenges: [challenge]}

			return challenge.sendMessage({})
				.then(ch => {
					const action = create.updateChallenge(ch)

					expect(reducer(initialState, action).challenges[0].messages.length).to.be.eql(1)
				})
		})
	})

	describe('update user poistions', ()=>{
		const action = create.receivedUserPositions([{username: 'us1'} , {username: 'us2'}])
		const initialState = {userPositions:[]}

		expect(reducer(initialState, action).userPositions.length).to.be.eql(2)
	})

	describe('add message to chat', () => {
        const chat = createChatChallenge({})
		const action = create.addMessageToChat(chat, 'text')
		const initialState = {challenges: [chat]}

		expect(reducer(initialState, action).challenges[0].messages.length).to.be.eql(1)
	})

	describe('set current position', () => {
		const pos = {lat:1, long: 2}
		const action = create.setCurrentPosition(pos)
        const initialState = {}

		expect(reducer(initialState, action).position).to.be.eql(pos)
	})

	describe('set loading state', () => {
		const action = create.finishLoading()
        const initialState = {loading: true}

		expect(reducer(initialState, action).loading).to.be.false
	})
})
