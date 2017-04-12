import { expect } from 'chai'
import { createGroupChallenge } from '../app/model/challenges'
import { ParticipantCollection } from '../app/model/participants'

describe('group challenge', ()=>{
	let group

	beforeEach(()=>{
		group = createGroupChallenge('test', {},
			ParticipantCollection.create([{accepted:true, profile: {username:'aaa'}}, {accepted:false, profile: {username:'bbb'}}]))
	})
})
