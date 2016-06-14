import expect from 'expect'
import reducer from '../app/reducers'

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
})

describe('notifications reducers', ()=>{
    it('should add NOTIFICATION_RECEIVED', ()=>{
        const initialState = {notifications:[]}
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
                        }]
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
        }]}

        expect(reducer(initialState,
                    {
                        type: 'CLEAR_NOTIFICATION'
                    })
              ).toEqual(
                  {
                      notifications: [{
                        type: 'NEW_CHAT',
                        isNew: false
                      }]
                  })
    })
})
