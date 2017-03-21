import { expect } from 'chai'
import * as create from '../app/actions/creators.js'
import reducer from '../app/reducers'

describe('participate reducers', () => {
	describe('addNewGroup', () => {
		it('should add a new group', ()=> {
			const challenge = {
				type: 'GROUP',
				title: 'test',
				definition: [],
				invitations: []
			}
			const initialState = {challenges: []}
			const finalState = {challenges: [challenge]}
			const action = create.newGroupAction(challenge)
			expect(reducer(initialState, action)).to.be.eql(finalState)
		})
	})

	describe('addNewChallenge', () => {
		it('should add a new challenge', ()=> {
			const title = 'test'
			const initialState = {challenges: []}
			const finalState = {challenges: [{title:title, type: 'GROUP_INVITATION'}]}
			const action = create.newChallengeAction({title:title, type:'GROUP_INVITATION'})
			expect(reducer(initialState, action)).to.be.eql(finalState)
		})
	})
})
