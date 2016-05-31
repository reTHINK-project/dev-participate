const chatApp = (state, action) => {
    switch (action.type) {
        case 'CHAT_CREATED':
            return {...state, chats: state.chats.concat([action.data])};
            break;
        case 'SET_ACTIVE_CHAT':
            let activeChat = action.data ? state.chats.find((chat)=>chat.name === action.data.name)
                : action.data;
            return {...state, activeChat: activeChat};
            break;
        case 'SEND_MESSAGE':
        case  'RECEIVE_MESSAGE':
            return Object.assign({}, state,
                {activeChat: Object.assign(Object.create(state.activeChat), {...state.activeChat})});
            break;
        case 'UPDATE_PARTICIPANTS':
            return {...state, participants: action.data};
            break;
        case 'TOGGLE_SELECTION':
            return {
                ...state, selectedParticipants: state.selectedParticipants.some((e)=>e.email === action.data.email) ?
                    state.selectedParticipants.filter((e)=>e.email !== action.data.email) : state.selectedParticipants.concat([action.data])
            };
            break;
        case 'SET_CHATNAME':
            return {...state, chatName: action.data};
            break;
        case 'INIT_HYPERTIES':
            return Object.assign(state, action.data);
            break;
        case 'SET_MESSAGE':
            return {...state, message: action.data};
            break;
        case 'SET_DISTANCE':
            return {...state, distance: action.data};
            break;
        default:
            return state;
            break;
    }
};


export default chatApp
