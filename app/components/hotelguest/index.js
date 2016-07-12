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
import {connect} from 'react-redux'
import colorConversion from './colorConversion'
//import {roomReceived} from '../../actions'

var RoomList = (data) => {
    //console.log("RoomList: data received", data);
    let rooms;

    if (typeof data === 'undefined') {
        rooms = <div className="alert alert-danger" role="alert">
            Error: Could not get room list
        </div>
    }
    else {

        rooms = data.map((room) => {
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
                                <div className="room">
                                    <DeviceList devices={room.devices}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )
        });
    }

    return (
        <div>
            {rooms}
        </div>
    )
};

let DeviceList = (data) => {
    //console.log("DeviceList: data received", data);
    let devices;

    if (typeof data.devices === 'undefined') {
        devices = <div className="alert alert-danger" role="alert">
            Error: Could not get device list
        </div>
    }
    else {
        devices = data.devices.map((device) => {
            return (
                <div key={device.name} className="">
                    <Device data={device}/>
                </div>
            )
        });
    }

    return (
        <div>
            {devices}
        </div>
    )
};

let LightList = (data) => {
    return (
        <div>
            <div className="flex-container">
                <div className="flex-item">
                    <h4>Lights</h4>
                </div>
            </div>
            <div className="flex-container">
                {
                    data.lights.map(function (light) {
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
};

let SimpleSensorList = (data) => {
    //console.log("SimpleSensorList: ", data);
    return (
        <div>
            <div className="flex-container">
                <div className="flex-item">
                    <h4>{data.descriptor}</h4>
                </div>
            </div>
            {
                data.sensors.map(function (sensor, index) {
                    return (
                        <div key={sensor.id}>
                            <SimpleRow
                                descriptor={sensor.id}
                                value={sensor.value}
                                unit={sensor.unit}
                            />
                            {(index === data.sensors.size - 1 || index === 0) ? <hr/> : null}
                        </div>
                    )
                })
            }
        </div>
    )
};


const Device = (device) => (
    <div>
        <SimpleSensorList descriptor={"Temperature"} sensors={device.data.lastValues.temperature}/>
        <SimpleSensorList descriptor={"Humidity"} sensors={device.data.lastValues.humidity}/>
        <LightList lights={device.data.lastValues.light}/>
    </div>
);

let Light = (data) => {
    var lightStateStyle = {};
    if (data.isOn) {
        lightStateStyle.backgroundColor = data.color; //TODO: Update on user interaction (color pick)
    }
    else {
        lightStateStyle.backgroundColor = "#5f5f5f";
        lightStateStyle.color = "#ffffff";
    }
    return (
        <div style={lightStateStyle} className="flex-item flex-container flex-col box-shadow">
            <div className="flex-item">
                <b>{data.name}</b>
            </div>
            <div className="flex-item">
                <button type="button" className="btn btn-default">{data.isOn ? 'ON' : 'OFF'}</button>
            </div>
            <div className="flex-item">
                <b>Color</b>
            </div>
            <div className="flex-item">
                <LightColor value={data.color} enabled={data.isOn}/>
            </div>
            <div className="flex-item">
                Dimmer
            </div>
            <div className="flex-item">
                <LightDimmer value={data.dimmer} enabled={data.isOn}/>
            </div>
        </div>
    );
};


let LightDimmer = (data) => (
    <div>
        {data.value} %
        <input
            type="range"
            value={data.value}
            //Supply with change handler that triggers action 'onChange={handler}'
            name="dimmer" min="1" max="100"
            disabled={!data.enabled}
        />
    </div>

);


let LightColor = (data) => (
    <div className="flex-container">
        <div className="flex-item">
            <input
                type="color"
                value={data.value}
                //Supply with change handler that triggers action 'onChange={handler}'
                disabled={!data.enabled}
            />
        </div>
        <div className="flex-item">
            {data.value}
        </div>
    </div>
);


let SimpleRow = (data) => {
    let unit = data.unit;
    switch (data.unit) { //Replacement rules
        case "Cel":
            unit = '℃';
            break; //To be extended
    }
    return (
        <div className="flex-container singleVar">
            <div className="flex-item">
                {data.descriptor}
            </div>
            <div className="flex-item">
                {data.value} {unit}
            </div>
        </div>
    )
};

let Hotel = ({roomClientHy, rooms}) => {
    //console.warn("Rooms:", rooms);
    //Meta info of hotel
    let hotelName = "Hightech Hotel";
    let hotelDescription = "Street name and number Zip code and city name.";
    let hotelThumbnailUrl = "img/hotel-thumbnail.jpg";

    let roomList = RoomList(rooms);

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
            {roomList}
        </div>
    )
};

Hotel = connect((state)=> {
    return {
        roomClientHy: state.roomClientHy,
        rooms: state.rooms
    }
}, (dispatch) => {
    return {}
})(Hotel);

export default Hotel;
