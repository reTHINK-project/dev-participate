import { expect } from 'chai'
import sinon from 'sinon'
import * as Challenges from '../app/model/challenges'

describe('chat challenge', () => {
	describe('sendMessage', () => {
		const adapter = {
			sendMessage: sinon.stub()
		}
		const message = {text:''}
		let chat

        before(()=>{
			chat = Challenges.createChatChallenge(adapter)
			adapter.sendMessage.resolves(message)
		})

		it('should delegate the call in the adapter', ()=>{
			return chat.sendMessage(message)
				.then(()=>{
					expect(adapter.sendMessage.calledWith(message)).to.be.true
				})
		})

		it('should add the messages to the collection', ()=>{
			return chat.sendMessage(message)
				.then((c)=>{
					expect(c.messages.length).to.be.eql(1)
				})
		})
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
