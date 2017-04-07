import React from 'react'
import { Link } from 'react-router'
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps"

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
                <div>
                    <div className="form-group">
                        <label for="actionTitle">Title</label>
                        <input type="text" className="form-control" id="actionTitle" name="title" placeholder="Name" onChange={this.handleInputChange} />
                    </div>
                    <h4>Filters</h4>
					<div className="form-group">
						<label for="actionQueryHobbies">User names separated by commas</label>
						<textarea className="form-control" id="actionQueryUsername" name="usernames" placeholder="User names" onChange={this.handleInputChange} />
					</div>
					<div className="form-group">
						<label for="actionQueryNearby">Locale</label>
						<input type="text" className="form-control" id="actionQueryLocale" name="locale" onChange={this.handleInputChange} />
					</div>
                    <section disabled style={{height: "250px"}}>
                      <GoogleMapLoader
                        containerElement={
                          <div
                            style={{
                              height: "100%",
                            }}
                          />
                        }
                        googleMapElement={
                          <GoogleMap
                            ref={(map) => console.log(map)}
                            defaultZoom={15}
                            defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
                          />
                        }
                      />
                    </section>
                    <Link to='/admin' className="btn btn-default" onClick={()=>this.props.createNewGroup(this.state)}>Next</Link>
                </div>
        )
    }
})

export default ActionForm
