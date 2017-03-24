import { expect } from 'chai'
import * as create from '../app/actions/creators.js'
import reducer from '../app/reducers'

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
			const initialState = {challenges: [{title: title}]}
			const finalState = {challenges: []}
			const action = create.removeChallengeAction({title: title})
			expect(reducer(initialState, action)).to.be.eql(finalState)
		})
	})

	describe('updateParticipantStatusAction', () => {
		it('should update the participant status', ()=>{
			const title = 'title'
			const username = 'test'
			const challenge = (accepted) => {
				return {
					title: title,
					participants: [{
						profile: {
							username: username
						},
						accepted: accepted
					}]
				}
			}
			const initialState = {challenges: [challenge(false)]}
			const finalState = {challenges: [challenge(true)]}
			const action = create.updateParticipantStatusAction(title, username, true)
			expect(reducer(initialState, action)).to.be.eql(finalState)
		})
	})
})
