/** @format */

import React, { PureComponent } from 'react';
import { Back, HeaderRight } from './IconNav';
import { Images, Color, Styles } from '@common';
import { WishList } from '@containers';

export default class WishListScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		title: 'Wish List',
		headerLeft: Back(navigation, Images.icons.arrowBack),
		headerRight: HeaderRight(navigation),

		headerTintColor: Color.headerTintColor,
		headerStyle: Styles.Common.toolbar,
		headerLeftContainerStyle: Styles.Common.toolbarLeft,
		headerRightContainerStyle: Styles.Common.toolbarRight,
		headerTitleStyle: Styles.Common.headerTitleStyle,
	});

	render() {
		const { navigate } = this.props.navigation;
		// const rootNavigation = this.props.screenProps.rootNavigation;

		return (
			<WishList
				onViewProduct={product => navigate('DetailScreen', product)}
				onViewHome={() => navigate('Default')}
				navigation={this.props.navigation}
				onMustLogin={() => {
					navigate('LoginScreen');
				}}
			/>
		);
	}
}
