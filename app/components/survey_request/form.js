import React from 'react'
import { hashHistory } from 'react-router'
import { Survey } from 'survey-react'

const SurveyRequestForm = React.createClass({
	render () {
		return(<Survey json={JSON.parse(this.props.pollRequest.definition)} onComplete={this.answerSurvey}/>)
	},

	answerSurvey (survey) {
		this.props.answerSurvey(survey.data, this.props.pollRequest)
		hashHistory.goBack()
	}
})

export default SurveyRequestForm
