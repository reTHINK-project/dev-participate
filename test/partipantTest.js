import { expect } from 'chai'
import { transformToHypertyParticipant, participantCollectionFrom } from '../app/model/participant'

describe('participant collection', () => {
	describe('participantCollectionFrom', ()=> {
		it('should return a participant collection from a profile collection', ()=>{
			const profiles = [{
				username: 'test@test.com',
				userURL: 'user://test.com/test@test.com'
			}]

			const result = participantCollectionFrom(profiles)

			expect(result).to.be.eql([{
				accepted: false,
				profile: {
					username: 'test@test.com',
					userURL: 'user://test.com/test@test.com'
				}
			}])
		})
	})

	describe('transformToHypertyParticipant', ()=>{
		it('should return a hyperty partipant collection', ()=>{
			const participants = [{
				accepted: true,
				profile: {
					username: 'test@test.com',
					userURL: 'user://test.com/test@test.com'}
			}]

			const result = transformToHypertyParticipant('localhost', participants)

			expect(result).to.be.eql([{
				email: 'test@test.com',
				domain: 'localhost'
			}])
		})
	})
})
