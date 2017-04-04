import { expect } from 'chai'
import { createGroupChallenge } from '../app/model/challenges'
import { status } from '../app/model/participant'
import * as ParticipantCollection from '../app/model/participantCollection'

describe('group challenge', ()=>{
	let group

	beforeEach(()=>{
		group = createGroupChallenge('test', {},
			ParticipantCollection.create([{accepted:true, profile: {username:'aaa'}}, {accepted:false, profile: {username:'bbb'}}]))
	})
})
