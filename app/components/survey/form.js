import React from 'react'
import { hashHistory } from 'react-router'
import * as SurveyJSEditor from 'surveyjs-editor';

const SurveyForm = React.createClass({
	componentDidMount() {
		let editorOptions = { showEmbededSurveyTab: true };
		this.editor = new SurveyJSEditor.SurveyEditor('surveyEditorContainer', editorOptions);
		this.editor.saveSurveyFunc = this.saveMySurvey;
	},

	render () {
		return(<div id="surveyEditorContainer"></div>)
	},

	saveMySurvey () {
		this.props.createPoll(this.editor.text, this.props.challenge)
		hashHistory.push('/')
	}
})

export default SurveyForm