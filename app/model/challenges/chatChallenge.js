import * as ChatMessage from './chatMessage'
import types from './types'
import Challenge from './challenge'

function sendMessage(id, adapter, title, messages, message) {
	return adapter.sendMessage(message)
		.then(message => addMessage(id, adapter, title, messages, message))
}

function addMessage(id, adapter, title, messages, message) {
	return create(adapter, title,
		messages.concat(ChatMessage.createFrom(message)), id)
}

function create(adapter, title, messages, id){
    const base = Challenge.create(id)
	return Object.assign(Object.create(base),{
		type: types.CHAT,
		title: title,
		messages: messages,
		sendMessage: (message) => sendMessage(base.toString(), adapter, title, messages, message),
		newMessageReceived: (message) => addMessage(base.toString(), adapter, title, messages, message),
	})
}

export default function createChatChallenge(adapter) {
	return create(adapter, adapter.name, [])
}
