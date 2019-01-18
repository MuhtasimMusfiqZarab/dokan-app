import React, { Component } from 'react';
import { Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import styles from "./styles";

export default class VendorContact extends Component {
	constructor(props) {
		super(props);

		this.lat = Number(this.props.location.split(",")[0]);
		this.lon = Number(this.props.location.split(",")[1]);

		console.log(this.lat, this.lon);
	}

	render() {
		return (
			<View style={styles.tabContentMap}>
				<MapView
					//provider={PROVIDER_GOOGLE} // remove if not using Google Maps
					style={{width: 330, height: 200}}
					initialRegion={{
						latitude: this.lat,
						longitude: this.lon,
						latitudeDelta: 0.015,
						longitudeDelta: 0.0121,
					}}>
					<Marker
						coordinate={{
							latitude: this.lat,
							longitude: this.lon,
						}}
						title={this.props.storeName}
					/>
				</MapView>
				<View style={{
					width: "100%",
					height: 60,
					bakgroundColor: "#fff"
				}}>

				</View>
			</View>
		)
	}
}
