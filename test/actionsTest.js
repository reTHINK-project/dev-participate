import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import sinon from 'sinon'
import { groupInvitation } from '../app/model/messages'
import { createChallengeFrom } from '../app/model/challenges'
import * as actions from '../app/actions'
import { __RewireAPI__  as acsRewireAPI } from '../app/actions'

const notificationsHy = {
	send: sinon.spy()
}
const discoveryHy = {
	queryUsers: sinon.stub()
}
const hyperties = function() {
	return new Promise(resolve => {
		resolve({
			Notifications: notificationsHy,
			Discovery: discoveryHy
		})
	})
}
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

acsRewireAPI.__Rewire__('getHyperties', hyperties)

describe('participate actions', ()=> {
	let store

	beforeEach(()=>{
		store = mockStore({
		})
	})

	describe('addNewGroup', ()=>{
		const title = 'test'
		const definition = {
			locale: 'ES'
		}
		const profile = {username: 'test'}

		beforeEach(()=>{
			discoveryHy.queryUsers.withArgs(definition).returns([profile])
		})

		it('should create the group', (done)=>{
			const expected_group = {
				title: title,
				definition: definition,
				invitations: [{ profile: profile, accepted: false }]
			}

			return store.dispatch(actions.addNewGroup(title, definition))
				.then(()=>{
					expect(store.getActions()[0].data).to.be.eql(expected_group)
					done()
				})
		})

		it('should notify connected user that match the filters', (done) => {
			return store.dispatch(actions.addNewGroup(title, definition))
				.then(() => {
					expect(notificationsHy.send.calledWith([profile])).to.be.true
					done()
				})
		})
	})

	describe('showNewChallenge', () => {
		it('should create a new challenge', ()=> {
			const data = groupInvitation('test')
			const expected_challenge = createChallengeFrom(data)

			store.dispatch(actions.showNewChallenge(data))

			expect(store.getActions()[0].data).to.be.eql(expected_challenge)
		})
	})

	describe('checkIfAnyNewUserMatchFilters', ()=> {
		it('should add any user matching the filter to its group')
		it('should invite to the group any user matching the group filters')
	})
})
