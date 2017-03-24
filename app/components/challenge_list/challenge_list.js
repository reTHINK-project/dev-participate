import React from 'react'
import * as Challenges from './challenges'
import NewChallengeButton from './new_challenge_button'

let ChallengeList = ({challenges, acceptChallenge, rejectChallenge}) => {
	let challengeComponents = challenges.map((challenge) => {
		switch (challenge.type){
		case 'GROUP':
			return <Challenges.Group {...challenge} />
		case 'GROUP_INVITATION':
			return <Challenges.GroupInvitation onAccept={acceptChallenge} onReject={rejectChallenge} challenge={challenge}/>
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
