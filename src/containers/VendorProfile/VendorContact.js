import React, { Component } from 'react';
import { Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import _ from 'lodash';
import { Icons } from '@common';
import { Icon } from '@app/Omni';
import styles from './styles';

export default class VendorContact extends Component {
	constructor(props) {
		super(props);

		this.lat = Number(this.props.location.split(',')[0]);
		this.lon = Number(this.props.location.split(',')[1]);
	}

	getAddress = () => {
		const addressObj = this.props.address;

		if (!_.isEmpty(addressObj)) {
			const street1 = addressObj.street_1;
			const street2 = addressObj.street_2;
			const state = addressObj.state;
			const city = addressObj.city;
			const country = addressObj.country;
			const zip = addressObj.zip;
			const fullAdressString = `${street1} ${street2} ${state} ${city}-${zip} ${country}`;

			return fullAdressString;
		} else {
			return 'Nothing Found!';
		}
	};

	render() {
		const address = this.getAddress();

		return (
			<View style={styles.tabContentMap}>
				<MapView
					//provider={PROVIDER_GOOGLE} // remove if not using Google Maps
					style={{ width: '95%', height: 250 }}
					initialRegion={{
						latitude: this.lat ? this.lat : 0,
						longitude: this.lon ? this.lon : 0,
						latitudeDelta: 0.015,
						longitudeDelta: 0.0121,
					}}>
					<Marker
						coordinate={{
							latitude: this.lat ? this.lat : 0,
							longitude: this.lon ? this.lon : 0,
						}}
						title={this.props.storeName}
					/>
				</MapView>
				{!this.lat ||
					(!this.lon && (
						<View style={styles.noLocation}>
							<Text style={{ color: '#fff', fontSize: 24 }}>
								No Location Found
							</Text>
						</View>
					))}
				<View style={styles.mapAddressBar}>
					<View style={styles.mapContactItem}>
						<Icon
							name={Icons.MaterialCommunityIcons.Pin}
							size={20}
							color="#9B59B6"
						/>
						<Text style={{ color: '#7C8591', marginLeft: 5 }}>{address}</Text>
					</View>
					<View style={styles.mapContactItem}>
						<Icon
							name={Icons.MaterialCommunityIcons.Phone}
							size={20}
							color="#1ABC9C"
						/>
						{this.props.phone ? (
							<Text style={{ color: '#7C8591', marginLeft: 5 }}>
								{this.props.phone}
							</Text>
						) : (
							<Text style={{ color: 'red' }}>Nothing Found</Text>
						)}
					</View>
				</View>
			</View>
		);
	}
}
