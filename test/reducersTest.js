import { expect } from 'chai'
import * as create from '../app/actions/creators.js'
import reducer from '../app/reducers'

describe('participate reducers', () => {
	describe('addNewGroup', () => {
		it('should add a new group', ()=> {
			const title = 'test'
			const definition = {}
			const participants = []
			const initialState = {challenges: []}
			const finalState = {challenges: [{title:title, definition: definition, invitations: []}]}
			const action = create.newGroupAction(title, definition, participants)
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
