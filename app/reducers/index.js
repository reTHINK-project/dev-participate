const chatApp = (state, action) => {
    //console.warn("STATE CHANGE", state, action);
    switch (action.type) {
        case ('RECEIVE_ROOM'):
            let rooms = state.rooms;
            rooms.push(action.data);
            return {...state, room: state.rooms};
        case ('CHAT_CREATED'):
            return {...state, chats: state.chats.concat([action.data])};
        case ('SET_ACTIVE_CHAT'):
            let activeChat = action.data ? state.chats.find((chat)=>chat.id === action.data)
                : action.data;
            return {...state, activeChat: activeChat};
        case('SEND_MESSAGE'):
        case('RECEIVE_MESSAGE'):
            return Object.assign({}, state,
                {activeChat: Object.assign(Object.create(state.activeChat), {...state.activeChat})});
        case('UPDATE_PARTICIPANTS'):
            return {...state, participants: action.data};
        case('TOGGLE_SELECTION'):
            return {
                ...state, selectedParticipants: state.selectedParticipants.some((e)=>e.email === action.data.email) ?
                    state.selectedParticipants.filter((e)=>e.email !== action.data.email) : state.selectedParticipants.concat([action.data])
            };
        case('SET_CHATNAME'):
            return {...state, chatName: action.data};
        case('INIT_HYPERTIES'):
            return Object.assign(state, action.data);
        case('SET_MESSAGE'):
            return {...state, message: action.data};
        case('SET_DISTANCE'):
            return {...state, distance: action.data};
        case('NOTIFICATION_RECEIVED'):
            return {
                ...state,
                notifications: state.notifications.concat([{
                    ...action.data,
                    isNew: true,
                    id: state.notifications.length + 1
                }]),
                new_notifications: state.new_notifications + 1
            };
        case('REMOVE_NOTIFICATION'):
            return {...state, notifications: state.notifications.filter((n)=>n.id !== action.data.id)};
        case('CLEAR_NOTIFICATION'):
            return {
                ...state, notifications: state.notifications.map((n)=> {
                    return {...n, isNew: false}
                }), new_notifications: 0
            };
        default:
            return state;
    }
};

export default chatApp
