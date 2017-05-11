import React from 'react'
import { Link } from 'react-router'
import NewActionButton from './new_action_button'
import { types } from '../../model/challenges'

const GroupList = ({groups}) => {
	const groupComponents = groups.map(g=>{
			switch (g.type){
			case types.GROUP:
				return (
					<div className="list-group-item list-group-item-success">
						<div className="row">
							<div className="col-md-12">
								<h2><Link to={'admin/admin_group/' + g.toString()}>{g.title}</Link></h2>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-12">
								<p>Filters: {JSON.stringify(g.definition)} </p>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-12">
								<p>{g.participants.toArray().length} participants</p>
							</div>
						</div>
					</div>
				)
			case types.SURVEY:
				return (
						<div className="list-group-item list-group-item-default">
							<div className="row">
								<div className="col-xs-12">
									<h2>Survey</h2>
								</div>
							</div>
							<div className="row">
								<div className="col-xs-12">
									<p><Link to={"/admin/survey/"+g.toString()}>See results</Link></p>
								</div>
							</div>
						</div>
				)
			default:
				return <p>Undefined challenge received</p>
			}
	})

	return(
		<div>
			<div className="row equal">
                {groupComponents}
			</div>
			<NewActionButton/>
		</div>
	)
}

export default GroupList
