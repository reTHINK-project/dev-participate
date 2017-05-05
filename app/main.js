import React from 'react'
import ReactDOM from 'react-dom'
import Components from './components'
import participateApp from './reducers'
import logger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import initRethink from './rethink'
import initSubscriptions from './hypertiesListener'

let store = createStore(participateApp, {challenges: []}, applyMiddleware(thunkMiddleware, logger))
initRethink().then(hyperties=>initSubscriptions(store, hyperties))

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Components.Dashboard}>
                <IndexRoute  component={Components.List}/>
                <Route path="new_group" component={Components.NewGroupForm}/>
                <Route path="group/:id" component={Components.GroupForm}/>
                <Route path="chat/:id" component={Components.ChatForm}/>
				<Route path="new_survey/:challenge_id" component={Components.SurveyForm}/>
				<Route path="survey/:id" component={Components.SurveyResultBoard}/>
				<Route path="survey_request/:id" component={Components.SurveyRequestForm}/>
            </Route>
            <Route path="/admin" component={Components.AdminDashboard}>
                <IndexRoute  component={Components.AdminGroupList}/>
                <Route path="chat/:id" component={Components.ChatForm}/>
				<Route path="new_survey/:challenge_id" component={Components.SurveyForm}/>
				<Route path="survey/:id" component={Components.SurveyResultBoard}/>
				<Route path="survey_request/:id" component={Components.SurveyRequestForm}/>
                <Route path="admin_group/:id" component={Components.AdminGroup}/>
                <Route path="admin_newgroup" component={Components.AdminNewGroup}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('react-anchor')
)
