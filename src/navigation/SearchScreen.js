/** @format */

import React, { PureComponent } from 'react';
import { Search } from '@components';

export default class SearchScreen extends PureComponent {
	static navigationOptions = () => ({
		title: 'Search',
		header: null,
		tabBarVisible: false,

		tabBarLabel: null,
	});

	didFocus() {
		console.log('focused');
	}

	render() {
		const { navigate, goBack } = this.props.navigation;

		return (
			<Search
				onBack={goBack}
				onViewProductScreen={product => navigate('DetailScreen', product)}
				navigation={this.props.navigation}
			/>
		);
	}
}
