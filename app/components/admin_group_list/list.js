import React from 'react'
import { Link } from 'react-router'
import NewActionButton from './new_action_button'

const GroupList = ({groups}) => {
	const groupComponents = groups.map(g=>{
		return (
			<div className="col-xs-6 col-sm-4 col-md-3 col-lg-2">
                <div className="panel panel-default">
                    <div className="panel-heading"><Link to={'admin/admin_group/' + g.toString()}>{g.title}</Link></div>
                </div>
			</div>
		)
	})

	return(
		<div>
			<div className="row">
                {groupComponents}
			</div>
			<NewActionButton/>
		</div>
	)
}

export default GroupList
