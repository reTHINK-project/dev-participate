import React from 'react'
import ReactDOM from 'react-dom'
import Components from './components'
import participateApp from './reducers'
import { createStore, applyMiddleware } from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import bootstrap from './bootstrap'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import { initHyperties } from './actions'

// install runtime
let runtime = undefined
let domain = 'localhost'
let runtimeURL = 'hyperty-catalogue://catalogue.localhost/.well-known/runtime/Runtime'
let store = createStore(participateApp, {actions: []}, applyMiddleware(thunkMiddleware))

self.rethink.default.install({ domain: domain, runtimeURL: runtimeURL, development: false})
    .then((r) => {
        runtime = r
        bootstrap.init(runtime, domain, store.dispatch)
        .then((hyperties)=>{
            store.dispatch(initHyperties(hyperties))
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
            );
        })
    })
