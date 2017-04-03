import { expect } from 'chai'
import { createParticipantColl, createParticipantCollFrom } from '../app/model/participant'

describe('participant collection', () => {
	describe('create collection', ()=>{
		describe('create collection from rethink user profile collection', ()=> {
			it('should return a participant collection', ()=>{
				const profiles = [{
					username: 'test@test.com',
					userURL: 'user://test.com/test@test.com'
				}]

				const result = createParticipantCollFrom(profiles)

				expect(result[0]).to.be.eql({
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
				const participants = createParticipantColl([{
					accepted: true,
					profile: {
						username: 'test@test.com',
						userURL: 'user://test.com/test@test.com'}
				}])

				const result = participants.toHypertyParticipant('localhost')

				expect(result).to.be.eql([{
					email: 'test@test.com',
					domain: 'localhost'
				}])
			})
		})
	})
})
