import React from 'react'
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps'

const SELECTED_COLOR = '#44873e'
const UNSELECTED_COLOR = '#CD0022'

const newMarker = ({lat, lng, key, color}) => {
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
		/>
	)
}

const Map = React.createClass({
	getInitialState() {
		const markers = this.props.markers.map(marker =>
			newMarker({
				lat: marker.latitude,
				lng: marker.longitude,
				key: marker.key,
				color: UNSELECTED_COLOR
				})
		)

		return {center: { lat:0, lng: 0 }, markers: markers}
	},

	componentDidMount() {
		navigator.geolocation.getCurrentPosition((position) => {
			this.setState({
				center: {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				}
			})
		})
	},

	onSelection(Bounds) {
		const markers = this.state.markers.map(marker => {
			return	newMarker({
				lat: marker.props.position.lat,
				lng: marker.props.position.lng,
				key: marker.key,
				color: (Bounds.contains(new google.maps.LatLng({
                        lat: marker.props.position.lat,
                        lng: marker.props.position.lng
                    }))) ? SELECTED_COLOR : UNSELECTED_COLOR
			})
		})

		this.setState({markers: markers})
		this.props.onSelectionChanged(this.state.markers
			.filter(m=>m.props.icon.fillColor === SELECTED_COLOR)
			.map(m=>({latitude:m.props.position.lat, longitude: m.props.position.lng, key: m.key})))
	},

	onMapLoad(map) {
		map.props.map.enableKeyDragZoom({}, this.onSelection)
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
						center={this.state.center}
					>
						{this.state.markers}
					</GoogleMap>
				}
			/>
		)
	}
})

export default Map
