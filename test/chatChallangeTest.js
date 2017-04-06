import { expect } from 'chai'
import * as Challenges from '../app/model/challenges'

describe('chat challenge', () => {
	describe('sendMessage', () => {
		xit('')
	})

	describe('newMessageReceived', ()=>{
		it('should add the message to the chat', ()=>{
			let chat = Challenges.createChatChallenge({})
			const message = {text:''}
			chat = chat.newMessageReceived(message)

			expect(chat.messages.length).to.be.equal(1)
		})
	})
})
