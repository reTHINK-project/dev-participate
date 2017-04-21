import React from 'react'
import * as Challenges from './challenges'
import NewChallengeButton from './new_challenge_button'

let ChallengeList = ({challenges, acceptChallenge, rejectChallenge}) => {
	let challengeComponents = challenges.map((challenge) => {
		switch (challenge.type){
		case 'GROUP':
			return <Challenges.Group id={challenge.toString()} title={challenge.title} definition={challenge.definition}
									 participants={challenge.participants.toArray()}/>
		case 'GROUP_INVITATION':
			return <Challenges.GroupInvitation onAccept={acceptChallenge} onReject={rejectChallenge} challenge={challenge}/>
		case 'CHAT':
			return <Challenges.Chat id={challenge.toString()} title={challenge.title}/>
        case 'ADMIN_MESSAGE':
            return <Challenges.Message id={challenge.toString()} message={challenge.message}/>
		default:
			return <p>Undefined challenge received</p>
		}
	})

	return (
        <div>
            <ul className="list-group">
                <li className="list-group-item">
                    {challengeComponents}
                    <NewChallengeButton />
                </li>
            </ul>
        </div>
	)
}

export default ChallengeList
