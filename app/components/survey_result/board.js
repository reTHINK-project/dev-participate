import React from 'react'
import JsonTable from 'react-json-table'

const SurveyResultBoard = ({ results }) => {
	return(<JsonTable rows={results}/>)
}

export default SurveyResultBoard
