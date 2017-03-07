import expect from 'expect'
import reducer from '../app/reducers'

describe('group reducers', () => {
    it('should add a new action', ()=>{
        const action = {type: 'ACTION_CREATED', data: { type: 'GROUP', title: 'test'}}
        const initialState = {actions:[]}
        expect(reducer(initialState, action))
            .toEqual({actions: [{type: 'GROUP', title: 'test'}]})
    })
})

describe('chat reducers', ()=>{
    it('should return initial state', ()=>{
        expect(reducer(undefined, {})).toEqual()
    })

    it('should add CHAT_CREATED', ()=>{
        const initialState = {chats:[]}
        expect(reducer(initialState,
                    {
                        type: 'CHAT_CREATED',
                        data:{}
                    })
              ).toEqual(
                  {
                    chats:[{}]
                  })
    })

    it('should SET_ACTIVE_CHAT', ()=>{
        const chat = {id: 'resource://1111', name: 'test'}
        const initialState = {chats:[chat], activeChat: undefined}
        expect(reducer(initialState,
                    {
                        type: 'SET_ACTIVE_CHAT',
                        data: 'resource://1111'
                    })
              ).toEqual(
                  {
                    chats:[chat],
                    activeChat: chat
                  })
    })
})

describe('notifications reducers', ()=>{
    it('should add NOTIFICATION_RECEIVED', ()=>{
        const initialState = {notifications:[], new_notifications: 0}
        expect(reducer(initialState,
                    {
                        type: 'NOTIFICATION_RECEIVED',
                        data:{
                                type:'NEW_CHAT',
                                payload: {
                                    name: 'New chat'
                                }
                        }
                    })
              ).toEqual(
                  {
                      notifications: [
                        {
                            type:'NEW_CHAT',
                            payload:{
                                name: 'New chat'
                            },
                            isNew: true,
                            id: 1
                        }],
                      new_notifications: 1
                  })
    })

    it('should REMOVE_NOTIFICATION', ()=>{
        const initialState = {notifications:[{
            type: 'NEW_CHAT',
            id: 1
        }]}

        expect(reducer(initialState,
                    {
                        type: 'REMOVE_NOTIFICATION',
                        data: {
                            id: 1
                        }
                    })
              ).toEqual(
                  {
                      notifications: []
                  })
    })

    it('should CLEAR_NOTIFICATION', ()=>{
        const initialState = {notifications:[{
            type: 'NEW_CHAT',
            isNew: true
        }], new_notifications: 1}

        expect(reducer(initialState,
                    {
                        type: 'CLEAR_NOTIFICATION'
                    })
              ).toEqual(
                  {
                      notifications: [{
                        type: 'NEW_CHAT',
                        isNew: false
                      }], new_notifications: 0
                  })
    })
})
