import { expect } from 'chai'
import sinon from 'sinon'
import * as create from '../app/actions/creators.js'
import reducer from '../app/reducers'
import { createGroupChallenge, createChatChallenge, createInvitationChallenge } from '../app/model/challenges'
import * as ParticipantCollection from '../app/model/participantCollection'

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

	describe('updateParticipantStatusAction', () => {
		it('should update the participant status', ()=>{
			const title = 'title'
			const username = 'test'
			const participants = ParticipantCollection.create([{
				profile: {
					username: username
				},
				accepted: false
			}])
			const challenge = createGroupChallenge(title, {}, participants)
			const initialState = {challenges: [challenge]}

			const action = create.updateParticipantStatusAction(title, username, true)

			const res = reducer(initialState, action)
				.challenges[0].participants.toArray()[0]

			expect(res.accepted).to.be.true
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
})
