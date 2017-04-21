import React from 'react'

const MessagesPanel = React.createClass({
	handleInputChange (event) {
		const target = event.target
		const value = target.type === 'checkbox' ? target.checked : target.value
		const name = target.name

		this.setState({
			[name]: value
		})
	},

	render(){
		const messages = this.props.group.sendedMessages.map(m => {
			return <li>{m}</li>
		})
		return (
			<div>
				<div className="row">
					<div className="col-md-12">
                        <form>
                            <div class="form-group">
                                <label for="comment">Text:</label>
                                <textarea className="form-control" onChange={this.handleInputChange} name="message" row="6"/>
                            </div>
                            <button type="button" className="btn btn-default"
                                    onClick={() => this.props.sendMessage(this.props.group, this.state.message)}>Send the message
                            </button>
                        </form>
                    </div>
				</div>
				<div className="row top-buffer">
					<div className="col-md-12">
						<div className="panel panel-info">
							<div className="panel-heading">
								<h3 className="panel-title">Messages sended to the group</h3>
							</div>
							<div className="panel-body">
								{messages}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
})

export default MessagesPanel
