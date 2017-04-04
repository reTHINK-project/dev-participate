import * as ChatMessage from '../chatMessage'

function sendMessage(adapter, title, messages, message) {
	return adapter.sendMessage(message)
		.then(message => {
			create(adapter,
				title,
				messages.concat(ChatMessage.createFrom(message)))
		})
}

function create(adapter, title, messages){
	return {
		type: 'CHAT',
		title: title,
		messages: messages,
		sendMessage: (message) => sendMessage(adapter, title, messages, message)
	}
}
export default function createChatChallenge(adapter) {
	return create(adapter, adapter.name, [])
}
