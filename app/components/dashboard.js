import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import WaitScreen from './wait_screen'

const Dashboard = ({loading, children}) => {
    if(loading) {
		return (<WaitScreen />)
	}

    return(
        <div>
            <header>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="col-xs-12">
                            <nav className="navbar navbar-default navbar-fixed-top">
                                <div className="container-fluid">
                                    <div className="navbar-header">
                                      <Link to="/" className="navbar-brand">Participate</Link>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container">
                {children}
            </div>
        </div>
    )
}

export default connect((state, ownProps)=>{
	return {
		loading: state.loading,
		children: ownProps.children
	}
})(Dashboard)
