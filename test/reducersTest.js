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
