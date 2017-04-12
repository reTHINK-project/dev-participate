export function createFrom(hypMessage) {
	return {
		text: hypMessage.text,
		date: hypMessage.startingTime,
		from: hypMessage.identity,
		sendedByMe: hypMessage.isMe
	}
}
