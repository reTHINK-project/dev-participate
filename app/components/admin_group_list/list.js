import React from 'react'
import { Link } from 'react-router'
import NewActionButton from './new_action_button'
import { types } from '../../model/challenges'
import * as Challenges from '../challenges'

const GroupList = ({groups}) => {
	const groupComponents = groups.map(g=>{
			switch (g.type){
			case types.GROUP:
				return <Challenges.Group key={g.toString()} id={g.toString()} title={g.title} definition={g.definition}
									 participants={g.participants.toArray()} path="/admin/admin_group/"/>
			case types.SURVEY:
				return <Challenges.Survey key={g.toString()} id={g.toString()} path="/admin/survey/"/>
			case types.CHAT:
				return <Challenges.Chat key={g.toString()} path='/admin/chat/' id={g.toString()} title={g.title}/>
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
