import React from 'react'
import { Link } from 'react-router'

const Dashboard = ({children}) => {
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
            <div className="container-fluid">
                {children}
            </div>
        </div>
    )
}

export default Dashboard
