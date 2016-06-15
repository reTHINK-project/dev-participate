import React from 'react'
import { Link } from 'react-router'
import Sidebar from './sidebar'
import { connect } from 'react-redux'

const Dashboard = React.createClass({
    render(){
        return(
            <div>
                <header>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className="col-xs-12">
                                <nav className="navbar navbar-default navbar-fixed-top">
                                <div className="container-fluid">
                                    <div className='navbar-header'>
                                        <a type="button" className="btn btn-default navbar-btn navbar-toggle" onClick={this.activeSideBar}>
                                            <span className="glyphicon glyphicon-minus"></span>
                                        </a>
                                        <Link className="btn btn-default navbar-btn navbar-toggle" to="notifications">
                                            <span className="glyphicon glyphicon-envelope"></span>  <span className="badge">{this.props.notifications}</span>
                                        </Link>
                                        <a className="navbar-brand" href="/" alt="Participate">Participate</a>
                                    </div>
                                    <div className="navbar-collapse hidden-xs">
                                            <ul className="nav navbar-nav navbar-right">
                                                <li>
                                                    <Link className="btn btn-default navbar-btn navbar-toggle" to="notifications">
                                                        <span className="glyphicon glyphicon-envelope"></span>  <span className="badge">{this.props.notifications}</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                     </div>
                                </div>
                            </nav>
                        </div>
                        </div>
                    </div>
                </header>
                <div className="container-fluid">
                    <div className='row row-offcanvas row-offcanvas-left expando'>
                        <div className="col-sm-4 col-md-3 sidebar-offcanvas">
                            <div className="sidebar-panel">
                                <Sidebar />
                            </div>
                        </div>
                        <article className="col-xs-12 col-sm-8 col-md-9">
                            {this.props.children}
                        </article>
                    </div>                        
                </div>
            </div>
        )
    },
    
    activeSideBar(){
        $('.row-offcanvas').toggleClass('active');
    }
})

export default connect((state)=>{
    return {
        notifications: state.new_notifications===0?'':state.new_notifications
    }
})(Dashboard)
