import * as ChatMessage from './chatMessage'
import types from './types'
import Challenge from './challenge'

function sendMessage(id, adapter, title, messages, message, parent) {
	return adapter.sendMessage(message)
		.then(message => addMessage(id, adapter, title, messages, message, parent))
}

function addMessage(id, adapter, title, messages, message, parent) {
	return create(adapter, title,
		messages.concat(ChatMessage.createFrom(message)), parent, id)
}

function create(adapter, title, messages, parent, id){
    const base = Challenge.create(id)
	const p = Challenge.create(parent)
	return Object.assign(Object.create(base),{
		type: types.CHAT,
		title: title,
		messages: messages,
		parent: p,
		sendMessage: (message) => sendMessage(base.toString(), adapter, title, messages, message, parent),
		newMessageReceived: (message) => addMessage(base.toString(), adapter, title, messages, message, parent),
	})
}

export default function createChatChallenge(adapter, parent) {
	return create(adapter, adapter.name, [], parent)
}
