import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { sendMessage } from '../../actions'
import Message from './message'

const Chat = React.createClass({
	handleInputChange (event) {
		const target = event.target
		const value = target.type === 'checkbox' ? target.checked : target.value
		const name = target.name

		this.setState({
			[name]: value
		})
	},

	render () {
		let messages= this.props.chat.messages.map((message, index) => <Message key={index} content={message.text} time={message.date} isMe={message.sendedByMe} from={message.from}/>)
		return (
			<div className="expando">
				<div className="panel-body">
					<ul className="chat">
						{messages}
					</ul>
				</div>
				<div className="panel-footer">
					<div className="input-group">
						<input id="btn-input" name="message" onChange={this.handleInputChange} type="text" className="form-control input-sm" placeholder="Type your message here..."/>
						<span className="input-group-btn">
                            <button className="btn btn-warning btn-sm" onClick={() => this.props.sendMessage(this.props.chat, this.state.message)}
									id="btn-chat">
                                Send
                            </button>
                            <Link className="btn btn-warning btn-sm" to={'new_survey/' + this.props.chat.toString()} id="btn-chat">
                                Create Poll
                            </Link>
                        </span>
					</div>
				</div>
			</div>
		)
	}
})

export default connect((state, ownProps)=>{
	return {
		chat: state.challenges.filter(g => g.isEqual({ _id: ownProps.routeParams.id })).shift()
	}
},(dispatch) =>{
	return {
		sendMessage:(chat, message) => dispatch(sendMessage(chat, message))
	}
})(Chat)
