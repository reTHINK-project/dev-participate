/*
 * Copyright [2015-2017] Fraunhofer Gesellschaft e.V., Institute for
 * Open Communication Systems (FOKUS)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React from 'react'
import colorConversion from './colorConversion'

//Room =====================
var RoomList = React.createClass({
    render: function () {
        var data = this.props.data;
        return (
            <div>
                {
                    data.map(function (room) {
                        return (
                            <div key={room.name} className="panel-group">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            {room.devices.length <= 0 ?
                                                <div>{room.name}</div>
                                                : <a data-toggle="collapse"
                                                     href={"#" + room.name + "-collapse"}>{room.name}</a>}
                                        </h4>
                                    </div>
                                    <div id={room.name + "-collapse"} className="panel-collapse collapse">
                                        <div className="panel-body">
                                            <Room key={room.name} room={room}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
});
var Room = React.createClass({
    render: function () {
        var room = this.props.room;
        return (
            <div className="room">
                <DeviceList devices={room.devices}/>
            </div>
        )
    }
});
//==========================


//Device ===================
//A LWM2M-Device which can hold multiple sensors/actors

var DeviceList = React.createClass({
    render: function () {
        var devices = this.props.devices;
        return (
            <div>
                {
                    devices.map(function (device) {
                        return (
                            <div key={device.name} className="">
                                <Device data={device}/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
});
var Device = React.createClass({
    render: function () {
        var device = this.props.data;
        return (
            <div>
                <SimpleSensorList descriptor={"Temperature"} sensors={device.lastValues.temperature}/>
                <SimpleSensorList descriptor={"Humidity"} sensors={device.lastValues.humidity}/>
                <LightList lights={device.lastValues.light}/>
            </div>
        )
    }

});
//==========================


//Light ====================
var LightList = React.createClass({
    render: function () {
        var lights = this.props.lights;
        return (
            <div>
                <div className="flex-container">
                    <div className="flex-item">
                        <h4>Lights</h4>
                    </div>
                </div>
                <div className="flex-container">
                    {
                        lights.map(function (light) {
                            var hexColor = colorConversion.rgbToHex_s(colorConversion.cieToRGB_s(light.color.value));
                            return (
                                <Light
                                    key={light.id}
                                    name={light.name}
                                    color={hexColor}
                                    dimmer={light.dimmer}
                                    isOn={light.isOn}
                                />
                            )
                        })
                    }

                </div>
            </div>
        )
    }
});
var Light = React.createClass({
    render: function () {
        var lightStateStyle = {};
        if (this.props.isOn) {
            lightStateStyle.backgroundColor = this.props.color; //TODO: Update on user interaction (color pick)
        }
        else {
            lightStateStyle.backgroundColor = "#5f5f5f";
            lightStateStyle.color = "#ffffff";
        }
        return (
            <div style={lightStateStyle} className="flex-item flex-container flex-col box-shadow">
                <div className="flex-item">
                    <b>{this.props.name}</b>
                </div>
                <div className="flex-item">
                    <button type="button" className="btn btn-default">{this.props.isOn ? 'ON' : 'OFF'}</button>
                </div>
                <div className="flex-item">
                    <b>Color</b>
                </div>
                <div className="flex-item">
                    <LightColor value={this.props.color} enabled={this.props.isOn}/>
                </div>
                <div className="flex-item">
                    Dimmer
                </div>
                <div className="flex-item">
                    <LightDimmer value={this.props.dimmer} enabled={this.props.isOn}/>
                </div>
            </div>
        )
    }
});
var LightDimmer = React.createClass({
    getInitialState: function () {
        return {value: this.props.value};
    },
    handleChange: function (event) {
        this.setState({value: event.target.value});
    },
    render: function () {
        return (
            <div>
                {this.state.value} %
                <input
                    type="range"
                    value={this.state.value}
                    onChange={this.handleChange}
                    name="dimmer" min="1" max="100"
                    disabled={!this.props.enabled}
                />
            </div>

        );
    }
});
var LightColor = React.createClass({
    getInitialState: function () {
        return {value: this.props.value};
    },
    handleChange: function (event) {
        this.setState({value: event.target.value});
        console.log(this);
        console.log(this.props);
    },
    render: function () {
        return (
            <div className="flex-container">
                <div className="flex-item">
                    <input
                        type="color"
                        value={this.state.value}
                        onChange={this.handleChange}
                        disabled={!this.props.enabled}
                    />
                </div>
                <div className="flex-item">
                    {this.state.value}
                </div>
            </div>
        );
    }
});
//==========================


//SimpleSensor =============
var SimpleSensorList = React.createClass({
    render: function () {
        var sensors = this.props.sensors;
        var descriptor = this.props.descriptor;
        return (
            <div>
                <div className="flex-container">
                    <div className="flex-item">
                        <h4>{descriptor}</h4>
                    </div>
                </div>
                {
                    sensors.map(function (sensor, index) {
                        return (
                            <div key={sensor.id}>
                                <SimpleRow
                                    descriptor={sensor.id}
                                    value={sensor.value}
                                    unit={sensor.unit}
                                />
                                {(index === sensors.size - 1 || index === 0) ? <hr/> : null}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
});
var SimpleRow = React.createClass({
    render: function () {
        var descriptor = this.props.descriptor;
        var value = this.props.value;
        var unit = this.props.unit;

        switch (unit) { //Replacement rules
            case "Cel":
                unit = '℃';
                break; //To be extended
        }
        return (
            <div className="flex-container singleVar">
                <div className="flex-item">
                    {descriptor}
                </div>
                <div className="flex-item">
                    {value} {unit}
                </div>
            </div>
        )
    }
});
//==========================

var Hotel = React.createClass({

    render: function () {
        //Meta info of hotel
        var hotelName = "Hightech Hotel";
        var hotelDescription = "Street name and number Zip code and city name.";
        var hotelThumbnailUrl = "img/hotel-thumbnail.jpg";

        //Data acquired from lwm2m-server
        var dummy = {
            "data": [{
                "isBooked": false,
                "name": "2010",
                "_id": "57690ec61dbc906c2ed8252c",
                "__v": 0,
                "members": [],
                "devices": []
            }, {
                "isBooked": true,
                "name": "2011",
                "_id": "57690ec61dbc906c2ed8252d",
                "__v": 0,
                "members": [],
                "devices": []
            }, {
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
            }], "error": null
        };

        return (
            <div>
                <div className="flex-container">
                    <div className="">
                        <img id="hotelThumbnail" src={hotelThumbnailUrl} className="flex-item img-thumbnail"
                             alt="MyHotel"/>
                    </div>
                    <div id="hotelDescription" className="flex-item">
                        <h3>{hotelName}</h3>
                        <p>{hotelDescription}</p>
                    </div>
                </div>
                <hr/>
                <RoomList
                    data={dummy.data}
                />
            </div>
        )
    }

});

export default Hotel;
