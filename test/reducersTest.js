import expect from 'expect'
import reducer from '../app/reducers'

describe('group reducers', () => {
    xit('should add a new action', ()=>{
        const action = {type: 'ACTION_CREATED', data: { type: 'GROUP', title: 'test'}}
        const initialState = {actions:[]}
        expect(reducer(initialState, action))
            .toEqual({actions: [{type: 'GROUP', title: 'test'}]})
    })
})
