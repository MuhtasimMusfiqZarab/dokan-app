/**
 * @format
 */

import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import { Back, HeaderRight } from './IconNav';
import { Images, Constants, Color, Styles, Config } from '@common';
import { CustomPage } from '@containers';

export default class ContactUsScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		title: 'Contact Us',
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
		// const rootNavigation = this.props.screenProps.rootNavigation;

		return (
			<View style={{ flex: 1, alignItems: 'center' }}>
				<View
					style={{
						width: '90%',
						backgroundColor: '#fff',
						borderRadius: 3,
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: 15,
						paddingTop: 35,
						paddingBottom: 35,
					}}>
					{/* <Image
						source={Images.ContactUs}
						style={{ width: 100, height: 90, marginBottom: 15 }}
						resizeMode="contain"
					/>

					<Text
						style={{
							fontSize: 20,
							color: '#000',
							fontFamily: Constants.fontFamilyLato,
							marginBottom: 15,
						}}>
						How can we help?
					</Text>

					<Text
						style={{
							fontSize: 14,
							color: '#818995',
							fontFamily: Constants.fontFamilyLato,
							marginBottom: 15,
						}}>
						Call us daily from 10.00 PM to 11.00 AM at
					</Text>

					<Text
						style={{
							fontSize: 24,
							fontFamily: Constants.fontFamilyLato,
							fontWeight: 'bold',
							color: '#E9485E',
							marginTop: 10,
							marginBottom: 15,
						}}>
						+9746464534343
					</Text>

					<Text
						style={{
							fontSize: 14,
							color: '#818995',
							fontFamily: Constants.fontFamilyLato,
							marginBottom: 15,
						}}>
						or Email us
					</Text>

					<Text
						style={{
							fontSize: 24,
							fontFamily: Constants.fontFamilyLato,
							color: '#1ABC9C',
							marginTop: 10,
							marginBottom: 15,
						}}>
						help@domain.com
					</Text> */}
					<CustomPage id={Config.appSettings.contact_us_page_id} />
				</View>
			</View>
		);
	}
}
