import React from 'react'
import { Link } from 'react-router'

const AdminDashboard = ({user, children, logIn}) => {
    const header= <header>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className="col-xs-12">
                                <nav className="navbar navbar-default navbar-fixed-top">
                                    <div className="container-fluid">
                                        <Link to="/admin" className="navbar-brand">Admin Participate</Link>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </header>

    //TODO: implement a secure way to do this
    if(!user) {
        return (
        <div className="container">
            {header}
            <form className="form-signin">
                <h2 className="form-signin-heading">Please sign in</h2>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus/>
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                <div className="checkbox">
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" onClick={()=>logIn('aa', 'aaa')}>Sign in</button>
            </form>
        </div>)
    } else {
        return(
            <div>
                {header}
                <div className="container">
                    {children}
                </div>
            </div>
        )
    }
}

export default AdminDashboard
