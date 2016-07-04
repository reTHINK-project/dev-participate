import React from 'react'
import ReactDOM from 'react-dom'
import Dashboard from './components/dashboard'
import ChatList from './components/chat_list'
import ChatForm from './components/chat_form'
import Participants from './components/participants'
import Chat from './components/chat'
import Notifications from './components/notifications'
import Hotel from './components/hotelguest'
import chatApp from './reducers'
import { createStore, applyMiddleware } from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import bootstrap from './bootstrap'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import { initHyperties } from './actions'

// install runtime
let runtime = undefined
let domain = 'hybroker.rethink.ptinovacao.pt'
let store = createStore(chatApp, {chats:[], participants:[], selectedParticipants:[],
    chatName: undefined, activeChat:undefined, domain:domain, notifications:[],
    new_notifications: 0}, applyMiddleware(thunkMiddleware))

self.rethink.default.install({domain:domain, development: true})
    .then((r) => {
        runtime = r
        bootstrap.init(runtime, domain, store.dispatch)
        .then((hyperties)=>{
            store.dispatch(initHyperties(hyperties))
            ReactDOM.render(
                <Provider store={store}>
                    <Router history={hashHistory}>
                        <Route path="/" component={Dashboard}>
                            <IndexRoute  component={ChatList}/>
                            <Route path="new_chat" component={ChatForm}/>
                            <Route path="add_participants" component={Participants}/>
                            <Route path="chat" component={Chat}/>
                            <Route path="notifications" component={Notifications}/>
                            <Route path="hotel" component={Hotel}/>
                        </Route>
                    </Router>
                </Provider>,
                document.getElementById('react-anchor')
            );
        })
    })
