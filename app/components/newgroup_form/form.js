import React from 'react'
import { Link } from 'react-router'

const ActionForm = React.createClass({
    handleInputChange (event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    },

    render () {
        return(
                <form>
                    <div className="form-group">
                        <label for="actionTitle">Title</label>
                        <input type="text" className="form-control" id="actionTitle" name="title" placeholder="Name" onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label for="actionQueryHobbies">Hobbies</label>
                        <textarea className="form-control" id="actionQueryHobbies" name="hobbies" placeholder="Hobbies" onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label for="actionQueryNearby">Nearby</label>
                        <input type="checkbox" className="form-control" id="actionQueryNearby" name="nearby" onChange={this.handleInputChange} />
                    </div>
                    <Link to='/' className="btn btn-default" onClick={()=>this.props.createNewGroup(this.state)}>Next</Link>
                </form>
        )
    }
})

export default ActionForm
