import { expect } from 'chai'
import * as ParticipantCollection from '../app/model/participantCollection'
import * as Participant from '../app/model/participant'

describe('participant collection', () => {
	const participants = ParticipantCollection.create([{
		accepted: true,
		profile: {
			username: 'true@test.com',
			userURL: 'user://test.com/test@test.com'}
	},{
		accepted: false,
		profile: {
			username: 'false@test.com',
			userURL: 'user://test.com/test@test.com'}
	}])

	describe('create collection', ()=>{
		describe('create collection from rethink user profile collection', ()=> {
			it('should return a participant collection', ()=>{
				const profiles = [{
					username: 'test@test.com',
					userURL: 'user://test.com/test@test.com'
				}]

				const result = ParticipantCollection.createFrom(profiles)

				expect(result.toArray()[0]).to.be.eql({
					accepted: false,
					profile: {
						username: 'test@test.com',
						userURL: 'user://test.com/test@test.com'
					}
				})
			})
		})
	})

	describe('transform', ()=>{
		describe('to Hyperty user', ()=>{
			it('should return a hyperty user collection', ()=>{
				const result = participants.toHypertyParticipant('localhost')

				expect(result).to.be.eql([{
					email: 'true@test.com',
					domain: 'localhost'
				}, {
					email: 'false@test.com',
					domain: 'localhost'
				}])
			})
		})
	})

	describe('filter collection', ()=>{
		describe('by state', ()=> {
			it('should return only participants in the set state', ()=>{
				const result = participants.filterByStatus(Participant.status.confirmed)

				expect(result.toArray()).to.be.eql([{
					accepted: true,
					profile: {
						username: 'true@test.com',
						userURL: 'user://test.com/test@test.com'}
				}])
			})
		})
	})

	describe('update participant status', ()=>{
		it('should update the participant with the new status', ()=>{
			const result = participants.updateParticipant({
				username: 'false@test.com',
				userURL: 'user://test.com/test@test.com'
            }, Participant.status.confirmed)

			expect(result.filterByStatus(Participant.status.confirmed).toArray().length)
				.to.be.eql(2)

		})
	})
})
