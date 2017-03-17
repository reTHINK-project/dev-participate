import React from 'react'
import Challenges from './challenges'
import NewChallengeButton from './new_challenge_button'

let ChallengeList = ({challenges}) => {
    let challengeComponents = challenges.map((challenge) => {
        //TODO: right component
        return <Challenges.Group title={challenge.title} />
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
