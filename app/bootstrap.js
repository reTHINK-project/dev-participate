import { updateParticipants, messageReceived, chatCreated, notificationReceived, roomReceived } from './actions'

const groupChatHyperty = (domain) => `hyperty-catalogue://${domain}/.well-known/hyperty/GroupChat`;
const locationHyperty = (domain) => `hyperty-catalogue://${domain}/.well-known/hyperty/Location`;
const participantsFakeHyperty = (domain)=> `hyperty-catalogue://${domain}/.well-known/hyperty/ParticipantsHyperty`;
const notificationsObserverHyperty = (domain)=> `hyperty-catalogue://${domain}/.well-known/hyperty/NotificationsObserver`;

//roomui
const roomClientHyperty = (domain) => `hyperty-catalogue://${domain}/.well-known/hyperty/RoomClient`;

function init(runtime, domain, dispatch){
    let hyperties = {};
    return runtime.requireHyperty(groupChatHyperty(domain))
        .then((hyperty)=>{
            hyperties.groupChatHy = hyperty
        })
        .then(()=>runtime.requireHyperty(participantsFakeHyperty(domain)))
        .then((hyperty)=>{
            hyperties.participantsHy = hyperty
        })
        .then(()=>runtime.requireHyperty(locationHyperty(domain)))
        .then((hyperty)=>{
            hyperties.locationHy = hyperty
        })
        .then(()=>runtime.requireHyperty(notificationsObserverHyperty(domain)))
        .then((hyperty)=>{
            hyperties.notificationsHy = hyperty
        })
        .then(()=>runtime.requireHyperty(roomClientHyperty(domain)))
        .then((hyperty)=>{
            hyperties.roomClientHy = hyperty
        })
        .then(()=>{
            //FIXME: test data
            let dummyRoom2= {
                "__v": 1,
                "_id": "57690ec61dbc906c2ed8252b",
                "isBooked": true,
                "name": "2010",
                "members": [],
                "devices": []
            };
            let dummyRoom= {
                    "__v": 1,
                    "_id": "57690ec61dbc906c2ed8252b",
                    "isBooked": true,
                    "name": "2012",
                    "members": [],
                    "devices": [{
                        "__v": 2,
                        "_id": "57690ec61dbc906c2ed8252e",
                        "name": "myRaspberry",
                        "room": "57690ec61dbc906c2ed8252b",
                        "lastValues": {
                            "misc": [],
                            "light": [{
                                "_id": "57690ef71dbc906c2ed82531",
                                "dimmer": 75,
                                "id": 1,
                                "isOn": true,
                                "name": "Desklamp",
                                "timestamp": "2016-06-21T12:42:53.009Z",
                                "color": {
                                    "unit": "CIE_JSON",
                                    "value": {
                                        "x": 0.3514825534134924,
                                        "y": 0.36724112917562374
                                    }
                                }
                            },
                                {
                                    "_id": "57690ef71dbc906c2ed82531",
                                    "dimmer": 100,
                                    "id": 2,
                                    "isOn": false,
                                    "name": "Ceiling Lamp",
                                    "timestamp": "2016-06-21T12:42:53.009Z",
                                    "color": {
                                        "unit": "CIE_JSON",
                                        "value": {"x": 0.32272672086556803, "y": 0.3290229095590793}
                                    }
                                }],
                            "humidity": [{
                                "_id": "57690efa1dbc906c2ed82532",
                                "id": 1,
                                "unit": "%",
                                "value": 75,
                                "timestamp": "2016-06-21T12:46:07.735Z"
                            }],
                            "temperature": [{
                                "_id": "57690efa1dbc906c2ed82532",
                                "id": 0,
                                "unit": "Cel",
                                "value": 26.4,
                                "timestamp": "2016-06-21T12:46:07.735Z"
                            },
                                {
                                    "_id": "57690efa1dbc906c2ed82532",
                                    "id": 1,
                                    "unit": "Cel",
                                    "value": 22.7,
                                    "timestamp": "2016-06-21T12:46:07.735Z"
                                }]
                        },
                        "registration": {
                            "payload": "</3311/1>,</3303/0>",
                            "timestamp": "2016-06-21T12:13:05.024Z",
                            "registered": true
                        }
                    }]
                };
            dispatch(roomReceived(dummyRoom));
            dispatch(roomReceived(dummyRoom2));
            //TODO

            hyperties.roomClientHy.instance.addEventListener("newRoom", (room) => dispatch(roomReceived(room)));
            hyperties.groupChatHy.instance.onInvite((chat)=>{
                chat.onMessage((message)=>dispatch(messageReceived(message)));
                dispatch(chatCreated(chat))
            });
            //setInterval(()=>{
              hyperties.participantsHy.instance.getParticipants().then((participants)=>dispatch(updateParticipants(participants)));
            //},5000)
            hyperties.locationHy.instance.startPositionBroadcast([
                    hyperties.groupChatHy.runtimeHypertyURL,
                    hyperties.participantsHy.runtimeHypertyURL
            ]);
            hyperties.notificationsHy.instance.onNotification((notification)=>{
                dispatch(notificationReceived(notification))
            });

            return hyperties
        })
}

export default { init: init}
