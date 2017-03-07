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
                                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    </button>    
                                      <Link to="/" className="navbar-brand">Participate</Link>
                                    </div>
                                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                        <ul className="nav navbar-nav">
                                            <li><Link to="/admin">Admin</Link></li>
                                        </ul>
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
