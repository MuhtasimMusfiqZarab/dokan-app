import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Color } from '@common';
import styles from './ProductDetail_Style';

export default function VendorSummary(props) {
	const storeName = props.store
		? props.store.shop_name || props.store.name
		: '';
	const storeInitial = storeName ? storeName.charAt(0).toUpperCase() : '';

	if (storeName) {
		return (
			<View style={styles.topVendorInfoContainer}>
				<View style={styles.topVendorNameInitials}>
					<Text style={{ color: 'white', fontSize: 17 }}>{storeInitial}</Text>
				</View>
				<View style={{ marginLeft: 15 }}>
					<Text
						style={{
							color: Color.wdDeepGray,
							fontSize: 17,
						}}>
						{storeName}
					</Text>
				</View>
			</View>
		);
	} else {
		return (
			<View
				style={[styles.topVendorInfoContainer, { justifyContent: 'center' }]}>
				<Text style={{ color: 'red' }}>Store Info Not found</Text>
			</View>
		);
	}
}
