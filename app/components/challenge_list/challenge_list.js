import React from 'react'
import * as Challenges from '../challenges'
import NewChallengeButton from './new_challenge_button'
import { types } from '../../model/challenges'

let ChallengeList = ({challenges, acceptChallenge, rejectChallenge}) => {
	let challengeComponents = challenges.map((challenge) => {
		switch (challenge.type){
		case types.GROUP:
			return <Challenges.Group key={challenge.toString()} id={challenge.toString()} title={challenge.title} definition={challenge.definition}
									 participants={challenge.participants.toArray()} path="/group/"/>
		case types.GROUP_INVITATION:
			return <Challenges.GroupInvitation key={challenge.toString()} onAccept={acceptChallenge} onReject={rejectChallenge} challenge={challenge}/>
		case types.CHAT:
			return <Challenges.Chat key={challenge.toString()} path="/chat/" id={challenge.toString()} title={challenge.title}/>
        case types.ADMIN_MESSAGE:
            return <Challenges.Message key={challenge.toString()} id={challenge.toString()} message={challenge.message}/>
		case types.SURVEY:
			return <Challenges.Survey key={challenge.toString()} id={challenge.toString()} path="/survey/"/>
		case types.SURVEY_REQUEST:
			return <Challenges.SurveyRequest key={challenge.toString()} id={challenge.toString()} />
		default:
			return <p>Undefined challenge received</p>
		}
	})

	if(challengeComponents.length === 0){
		challengeComponents = (
		<div className="jumbotron">
			<h1>Currently you have zero challenges!</h1>
			<p>Go ahead and create the first one!</p>
		</div>)
	}
	return (
        <div className="row equal">
			{challengeComponents}
			<NewChallengeButton />
        </div>
	)
}

export default ChallengeList
