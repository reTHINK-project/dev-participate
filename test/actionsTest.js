import { expect } from 'chai'
import proxyquire from 'proxyquire'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import sinon from 'sinon'

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
const actions = proxyquire('../app/actions', {'../rethink': hyperties})
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('participate actions', ()=> {
    let store

    beforeEach(()=>{
        store = mockStore({
            groups:[],
            actions:[]
        })
    })

    describe('addNewGroup', ()=>{
        const title = 'test'
        const definition = {
            locale: "ES"
        }           
        const profile = {username: 'test'}

        beforeEach(()=>{
            discoveryHy.queryUsers.withArgs(definition).resolves([profile])
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

    describe('checkIfAnyNewUserMatchFilters', ()=> {
    })
})

describe('actions creators', ()=>{
    xit('should create an action to init hyperties', ()=>{
        const hyperties = [{},{},{}]
        const expectedAction = {
            type: 'INIT_HYPERTIES',
            data: hyperties
        }
        expect(actions.initHyperties(hyperties)).toEqual(expectedAction)
    })
})



describe('async actions', ()=>{
    describe('createChat', ()=>{
        xit('should create a action with the created chat', ()=>{
            const chat = {
                            onMessage:function(){}
                        }
            const groupChat = {
                instance:{
                    create: function(name, participants){
                        return {
                            then: function(callback){
                                callback(chat)
                                return {
                                    then: function(callback){
                                        callback()
                                    }
                                }
                            }
                        }
                    }
                }
            }

            const store = mockStore({chats:[], participants:[], selectedParticipants:[], chatName: undefined, activeChat:undefined, domain:''})
            return store.dispatch(actions.createChat(groupChat, '','',[]))
                .then(()=>{
                    expect(store.getActions()).toInclude({ data: chat, type: 'CHAT_CREATED' })
                })
        })

        xit('should create a action setting active chat', ()=>{
        })

        xit('should subscribe the chat to a onMessages handler', ()=>{
        })
    })
})
