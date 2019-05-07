/**
 * @format
 */

import React, { PureComponent } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	Dimensions,
	TouchableWithoutFeedback,
	Linking,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { Back, HeaderRight } from './IconNav';
import { Images, Color, Styles, Config, Constant } from '@common';
import { ImageCache } from '@components';
import { version } from '../../package.json';

export default class AboutUsScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		title: 'About Us',
		headerLeft: Back(navigation, Images.icons.arrowBack),
		headerRight: HeaderRight(navigation),

		headerTintColor: Color.headerTintColor,
		headerStyle: Styles.Common.toolbar,
		headerLeftContainerStyle: Styles.Common.toolbarLeft,
		headerRightContainerStyle: Styles.Common.toolbarRight,
		headerTitleStyle: Styles.Common.headerTitleStyle,
	});

	render() {
		return (
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					// justifyContent: 'center',
					backgroundColor: '#fff',
				}}>
				<View style={styles.logoWrap}>
					{Config.appSettings.app_logo ? (
						<ImageCache
							uri={Config.appSettings.app_logo}
							style={styles.logo}
							resizeMode="contain"
						/>
					) : (
						<Image
							source={Config.LogoWithText}
							style={styles.logo}
							resizeMode="contain"
						/>
					)}
					<Text style={styles.logoText}>Running Dokan v{version}</Text>
				</View>
				<View style={styles.linkContainer}>
					<View style={styles.links}>
						<TouchableWithoutFeedback
							hitSlop={{ top: 0, left: 0, bottom: 0, right: 0 }}
							onPress={() => Linking.openURL('https://wedevs.com/contact/')}>
							<Text style={styles.linkText}>Contact</Text>
						</TouchableWithoutFeedback>
					</View>
					<View style={styles.links}>
						<TouchableWithoutFeedback
							hitSlop={{ top: 0, left: 0, bottom: 0, right: 0 }}
							onPress={() =>
								Linking.openURL('https://wedevs.com/privacy-policy/')
							}>
							<Text style={styles.linkText}>Privacy Policy</Text>
						</TouchableWithoutFeedback>
					</View>
					{/* <View style={styles.socialIconContainer}>
						<Avatar.Icon
							style={styles.socialIcon}
							size={50}
							color="#fff"
							icon={({ size, color }) => (
								<Image
									source={Images.FBlogo}
									style={{ width: size, height: size, tintColor: color }}
								/>
							)}
						/>
						<Avatar.Image
							style={styles.socialIcon}
							size={50}
							source={{
								uri:
									'https://avatars0.githubusercontent.com/u/17571969?v=3&s=400',
							}}
						/>
						<Avatar.Image
							style={styles.socialIcon}
							size={50}
							source={{
								uri:
									'https://avatars0.githubusercontent.com/u/17571969?v=3&s=400',
							}}
						/>
						<Avatar.Image
							style={styles.socialIcon}
							size={50}
							source={{
								uri:
									'https://avatars0.githubusercontent.com/u/17571969?v=3&s=400',
							}}
						/>
					</View> */}
				</View>
			</View>
		);
	}
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	logoWrap: {
		justifyContent: 'center',
		alignItems: 'center',
		flexGrow: 0.2,
		// paddingHorizontal: Styles.width * 0.1,
		// paddingBottom: 50,
	},
	logo: {
		width: width * 0.5,
		height: (width * 0.5) / 2,
	},
	logoText: {
		// width: width / 2,
		color: Color.wdgray5,
	},
	linkContainer: {
		marginTop: 50,
		justifyContent: 'center',
	},
	links: {
		width: width * 0.8,
		// marginBottom: 15,
		padding: 15,
		borderBottomWidth: 1,
		borderColor: Color.wdgray5,
		alignItems: 'center',
	},
	linkText: {
		color: Color.blackTextPrimary,
		fontSize: 18,
	},
	socialIconContainer: {
		width: width * 0.8,
		marginTop: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	socialIcon: {
		marginHorizontal: 5,
	},
});
