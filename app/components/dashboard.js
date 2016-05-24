import React from 'react'
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
                                        <button className="btn btn-default navbar-toggle navbar-btn" href="#" onClick={this.activeSideBar}>
                                            <i className="glyphicon glyphicon-menu-hamburger"></i>
                                        </button>
                                        <a className="navbar-brand" href="/" alt="Participate">Participate</a>
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
                        <div className="col-xs-12 col-sm-8 col-md-9">
                            GroupChatHyperty: {this.props.groupChat.runtimeHypertyURL}
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
        groupChat: state.groupChatHy
    }
})(Dashboard)