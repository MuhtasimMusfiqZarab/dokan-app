/** @format */

import React, { PureComponent } from 'react';
import { WebView, View } from 'react-native';
import { CustomPage } from '@containers';
import { AnimatedHeader } from '@components';

export default class CustomPageScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		header: null,
	});

	render() {
		const { state } = this.props.navigation;
		if (typeof state.params == 'undefined') {
			return <View />;
		}

		if (typeof state.params.url != 'undefined') {
			return (
				<View style={{ flex: 1 }}>
					<AnimatedHeader />
					<WebView source={{ uri: state.params.url }} />
				</View>
			);
		}

		return (
			<View>
				<AnimatedHeader />
				<CustomPage id={state.params.id} />
			</View>
		);
	}
}
