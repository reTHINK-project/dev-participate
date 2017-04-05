import * as ChatMessage from '../chatMessage'

function getID() {
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

function sendMessage(id, adapter, title, messages, message) {
	return adapter.sendMessage(message)
		.then(message => {
			return create(id, adapter, title,
				messages.concat(ChatMessage.createFrom(message)))
		})
}

function create(id, adapter, title, messages){
	return {
		_id: id,
		type: 'CHAT',
		title: title,
		messages: messages,
		sendMessage: (message) => sendMessage(id, adapter, title, messages, message),
		isEqual: (challenge) => challenge._id === id,
		toString: () => id
	}
}
export default function createChatChallenge(adapter) {
	return create(getID(), adapter, adapter.name, [])
}
