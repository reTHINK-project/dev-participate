import React from 'react'
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps'

const SELECTED_COLOR = '#44873e'
const UNSELECTED_COLOR = '#CD0022'

const newMarker = ({lat, lng, key, color, onClick}) => {
	return (
		<Marker
			position={{ lat: lat, lng: lng }}
			key={key}
			icon={
				{
					path:google.maps.SymbolPath.CIRCLE,
					scale:5,
					fillColor: color,
					fillOpacity: 1,
					strokeColor: '',
					strokeWeight: 1
				}
			}
			onClick = {() => onClick(key)}
		>
			<InfoWindow >
				<div>{key}</div>
			</InfoWindow>
		</Marker>
	)
}

const oppositeColor = (color) => color === SELECTED_COLOR ? UNSELECTED_COLOR : SELECTED_COLOR

const Map = React.createClass({
	onSelection(key) {
		const markers = this.state.markers.map(marker => {
			return	newMarker({
				lat: marker.props.position.lat,
				lng: marker.props.position.lng,
				key: marker.key,
				color: marker.key === key ? oppositeColor(marker.props.icon.fillColor) : marker.props.icon.fillColor,
				onClick: this.onSelection
			})
		})

		this.setState({markers: markers})
		this.props.onSelectionChanged(this.state.markers
			.filter(m=>m.props.icon.fillColor === SELECTED_COLOR)
			.map(m=>({latitude:m.props.position.lat, longitude: m.props.position.lng, key: m.key})))
	},

	getInitialState() {
		const markers = this.props.markers.map(marker =>
			newMarker({
				lat: marker.latitude,
				lng: marker.longitude,
				key: marker.key,
				color: UNSELECTED_COLOR,
				onClick: this.onSelection
			})
		)

		return {center: { lat:0, lng: 0 }, markers: markers}
	},

	render() {
		return(
			<GoogleMapLoader
				containerElement={
					<div
						style={{
							height: '100%',
						}}
					/>
				}
				googleMapElement={
					<GoogleMap
						ref={this.onMapLoad}
						defaultZoom={12}
						defaultCenter={this.props.center}
					>
						{this.state.markers}
					</GoogleMap>
				}
			/>
		)
	}
})

export default Map
