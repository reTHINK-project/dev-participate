import { expect } from 'chai'
import Challenge from '../app/model/challenges/challenge'

describe('a challenge', ()=>{
	describe('toString', ()=>{
		it('should return the challenge identity', ()=>{
			const challenge = Challenge.create()

			expect(challenge.toString()).to.be.defined
		})
	})

	describe('isEqual', () => {
		it('should return true if two challlenges are equal', () =>{
			const challenge1 = Challenge.create()
			const challenge2 = Challenge.create(challenge1.toString())

			expect(challenge1.isEqual(challenge2)).to.be.true
		})
	})
})
