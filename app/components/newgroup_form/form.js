import Map from '../smap'
import React from 'react'
import { hashHistory } from 'react-router'

const ActionForm = React.createClass({
	getInitialState () {
		return {}
	},

	handleInputChange (event) {
		const target = event.target
		const value = target.type === 'checkbox' ? target.checked : target.value
		const name = target.name

		this.setState({
			[name]: value
		})
	},

    selectionChanged(selection) {
		this.setState({selection: selection.map(s=>s.key)})
	},

	submit(e) {
		e.preventDefault()
        if(!this.state.title){
            alert('Title field required')
			return
		}

		this.props.createNewGroup(this.state)
		hashHistory.push('/')
	},

	render () {
		return(
				<form onSubmit={this.submit}>
					<div className="form-group">
						<label htmlFor="actionTitle">Title</label>
						<input type="text" className="form-control" id="actionTitle" name="title" placeholder="Name" onChange={this.handleInputChange} />
					</div>
                    <h4>Filters</h4>
                    <section disabled style={{height: "250px"}}>
						<Map markers={this.props.positions} onSelectionChanged={this.selectionChanged} center={this.props.center} />
                    </section>
					<div className="form-group">
						<label htmlFor="actionQueryNearby">Locale</label>
						<select className="form-control" id="actionQueryLocale" name="locale" onChange={this.handleInputChange}>
							<option value=""></option>
							<option value="es-ES">Spain</option>
							<option value="en-GB">Great Britain</option>
							<option value="fr-FR">France</option>
							<option value="pt-PT">Portugal</option>
							<option value="de-DE">German</option>
						</select>
					</div>
					<button className="btn btn-default" onClick={this.submit}>Next</button>
				</form>
		)
	}
})

export default ActionForm
