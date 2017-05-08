import React from 'react'
import JsonTable from 'react-json-table'

const SurveyResultBoard = ({ results }) => {
	return(<JsonTable rows={results} className="table table-striped table-hover"/>)
}

export default SurveyResultBoard
