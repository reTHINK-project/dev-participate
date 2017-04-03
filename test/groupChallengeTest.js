import { expect } from 'chai'
import { createGroupChallenge } from '../app/model/challenges'
import { status } from '../app/model/participant'

describe('group challenge', ()=>{
	let group

	beforeEach(()=>{
		group = createGroupChallenge('test', {}, [{accepted:true, profile: {username:'aaa'}}, {accepted:false, profile: {username:'bbb'}}])
	})

	describe('get participants by status', ()=>{
		it('should return all the participants if no status is passed', ()=>{
			const participants = group.participantsByStatus()

			expect(participants.length).to.be.eql(2)
		})

		it('should return only confirmed participants if confirmed status is passed', ()=>{
			const participants = group.participantsByStatus(status.confirmed)

			expect(participants.length).to.be.eql(1)
		})
	})
})
