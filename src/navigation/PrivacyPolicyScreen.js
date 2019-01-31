/**
 * @format
 */

import React, { PureComponent } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Back, HeaderRight } from './IconNav';
import { Images, Config, Constants, Color, Styles } from '@common';

export default class PrivacyPolicyScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		title: 'Privacy Policy',
		headerLeft: Back(navigation, Images.icons.arrowBack),
		headerRight: HeaderRight(navigation),

		headerTintColor: Color.headerTintColor,
		headerStyle: Styles.Common.toolbar,
		headerLeftContainerStyle: Styles.Common.toolbarLeft,
		headerRightContainerStyle: Styles.Common.toolbarRight,
		headerTitleStyle: Styles.Common.headerTitleStyle,
	});

	render() {
		// const { navigate } = this.props.navigation;

		return (
			<ScrollView
				contentContainerStyle={{
					width: '100%',
					padding: 15,
				}}>
				{Config.policies.map((item, index) => {
					return (
						<View key={`p-${index}`} style={{ marginBottom: 15 }}>
							<Text
								style={{
									fontFamily: Constants.fontFamilyLato,
									color: '#000',
									fontSize: 18,
									fontWeight: 'bold',
									marginBottom: 5,
								}}>
								{item.heading}
							</Text>
							<Text
								style={{
									color: '#7C8592',
									fontSize: 16,
								}}>
								{item.text}
							</Text>
						</View>
					);
				})}
			</ScrollView>
		);
	}
}
