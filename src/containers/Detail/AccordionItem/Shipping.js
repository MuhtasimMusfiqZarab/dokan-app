import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

export default class AccordionShipping extends PureComponent {
	render() {
		return (
			<View>
				<Text style={{ color: '#19B491', fontSize: 12, marginBottom: 10 }}>
					No Shipping available
				</Text>
			</View>
		);
	}
}
