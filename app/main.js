import React from 'react'
import ReactDOM from 'react-dom'
import Components from './components'
import participateApp from './reducers'
import { createStore, applyMiddleware } from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import initRethink from './rethink'

initRethink()

let store = createStore(participateApp, {challenges: []}, applyMiddleware(thunkMiddleware))

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Components.Dashboard}>
                <IndexRoute  component={Components.List}/>
                <Route path="new_group" component={Components.NewGroupForm}/>
                <Route path="group" component={Components.GroupForm}/>
                <Route path="chat" component={Components.ChatForm}/>
            </Route>
            <Route path="/admin" component={Components.AdminDashboard}>
                <IndexRoute  component={Components.AdminGroupList}/>
                <Route path="chat" component={Components.ChatForm}/>
                <Route path="admin_group" component={Components.AdminGroup}/>
                <Route path="admin_newgroup" component={Components.AdminNewGroup}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('react-anchor')
)
