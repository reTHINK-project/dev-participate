import React from 'react'
import { hashHistory } from 'react-router'
import { Survey } from 'survey-react'

const SurveyRequestForm = React.createClass({
	render () {
		return(<Survey json={this.props.survey} onComplete={this.answerSurvey}/>)
	},

	answerSurvey (survey) {
		this.props.answerSurvey(survey.data)
		hashHistory.push('/')
	}
})

export default SurveyRequestForm
