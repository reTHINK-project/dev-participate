import React from 'react'
import * as Challenges from './challenges'
import NewChallengeButton from './new_challenge_button'
import { types } from '../../model/challenges'

let ChallengeList = ({challenges, acceptChallenge, rejectChallenge}) => {
	let challengeComponents = challenges.map((challenge) => {
		switch (challenge.type){
		case types.GROUP:
			return <Challenges.Group id={challenge.toString()} title={challenge.title} definition={challenge.definition}
									 participants={challenge.participants.toArray()}/>
		case types.GROUP_INVITATION:
			return <Challenges.GroupInvitation onAccept={acceptChallenge} onReject={rejectChallenge} challenge={challenge}/>
		case types.CHAT:
			return <Challenges.Chat id={challenge.toString()} title={challenge.title}/>
        case types.ADMIN_MESSAGE:
            return <Challenges.Message id={challenge.toString()} message={challenge.message}/>
		case types.SURVEY:
			return <Challenges.Survey id={challenge.toString()} />
		case types.SURVEY_REQUEST:
			return <Challenges.SurveyRequest id={challenge.toString()} />
		default:
			return <p>Undefined challenge received</p>
		}
	})

	if(challengeComponents.length === 0){
		challengeComponents = (
		<div class="jumbotron">
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
