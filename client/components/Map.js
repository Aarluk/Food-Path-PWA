import React from "react";
import { connect } from "react-redux";
import GoogleMapReact from "google-map-react";
import { fetchMarkers } from "../store";

const Marker = ({ text, imageUrl }) => (
	<div
		className="marker"
		style={{ textAlign: "center", display: "block", width: "60px" }}
	>
		<p>{text}</p>
		<img src={imageUrl} width="60px" />
		<img src="/img/marker.png" height="30px" />
	</div>
);

class Map extends React.Component {
	setMap({ map, maps }) {
		console.log(maps.DirectionsRenderer);
		const directionDisplay = new maps.DirectionsRenderer();
		// directionDisplay.setOptions({directions: });
		directionDisplay.setMap(map);
	}

	componentDidMount() {
		this.props.fetchMarkers();
	}

	render() {
		const markers = this.props.markers || [];

		return (
			<div style={{ height: "50vh", width: "50%" }}>
				<div id="map"></div>
				<GoogleMapReact
					bootstrapURLKeys={{ key: "AIzaSyAy7Z9PHW6OU2vwcjwZTHxgRh9uHm1F9CM" }}
					defaultCenter={{ lat: 40.74, lng: -73.98 }}
					defaultZoom={13}
					yesIWantToUseGoogleMapApiInternals
					onGoogleApiLoaded={this.setMap}
				>
					{markers.map((marker) => (
						<Marker
							key={marker.id}
							lat={marker.coordinates.latitude}
							lng={marker.coordinates.longitude}
							text={marker.name}
							imageUrl={marker.image_url}
						/>
					))}
				</GoogleMapReact>
			</div>
		);
	}
}

const mapState = (state) => ({
	markers: state.markers,
});

const mapDispatch = (dispatch) => ({
	fetchMarkers: () => dispatch(fetchMarkers()),
});

export default connect(mapState, mapDispatch)(Map);
