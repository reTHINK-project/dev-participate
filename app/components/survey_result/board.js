import React from 'react'
import JsonTable from 'react-json-table'

const SurveyResultBoard = ({ survey }) => {
	return(<JsonTable rows={survey.results}/>)
}

export default SurveyResultBoard
