import expect from 'expect'

import * as actions from '../app/actions'

describe('actions creators', ()=>{
    it('should create an action to init hyperties', ()=>{
        const hyperties = [{},{},{}]
        const expectedAction = {
            type: 'INIT_HYPERTIES',
            data: hyperties
        }
        expect(actions.initHyperties(hyperties)).toEqual(expectedAction)
    })
})

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', ()=>{
    describe('createChat', ()=>{
        it('should create a action with the created chat', ()=>{
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
