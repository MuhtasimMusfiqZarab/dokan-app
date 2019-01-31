/** @format */

import { StyleSheet, Platform } from 'react-native';
import { Color, Styles, Device } from '@common';

const shadowX = {
	position: 'absolute',
	top: -45,
	width: '100%',
	height: '110%',
	shadowColor: '#000',
	shadowOpacity: 0.3,
	shadowRadius: 10,
	shadowOffset: {
		width: 4,
		height: 0,
	},
};

const shadow = {
	shadowColor: '#000',
	shadowOpacity: 0.3,
	shadowRadius: 10,
	shadowOffset: {
		width: 4,
		height: 0,
	},
};

export default StyleSheet.create({
	container: {
		flexGrow: 1,
		flex: 1,
		// paddingTop: Device.isIphoneX ? 45 : 40,
		paddingTop: 45,
		paddingBottom: 10,
		backgroundColor: '#FFF',
		...Platform.select({
			ios: Device.isIphoneX ? shadowX : shadow,
			android: {
				elevation: 20,
			},
		}),
	},
	avatarBackground: {
		flexDirection: 'row',
		paddingRight: 20,
		paddingBottom: 0,
		paddingLeft: 10,
		backgroundColor: '#FFF',
		marginBottom: 10,
		flexWrap: 'wrap',
	},
	avatar: {
		height: Styles.width / 5,
		width: Styles.width / 5,
		borderRadius: Styles.width / 10,
		borderWidth: 0.5,
		borderColor: Color.DirtyBackground,
		marginBottom: 10,
	},
	fullName: {
		fontWeight: '600',
		color: Color.blackTextPrimary,
		backgroundColor: 'transparent',
		fontSize: Styles.FontSize.medium,
		marginBottom: 6,
		textAlign: 'left',
	},
	email: {
		backgroundColor: 'transparent',
		fontSize: 13,
		textAlign: 'left',
		// color: Color.blackTextPrimary,
		color: '#9EA7A7',
	},
	textItem: {
		// color: Color.blackTextPrimary,
		color: 'red',
		fontSize: Styles.FontSize.small,
	},
	textContainer: {
		marginLeft: 10,
		justifyContent: 'center',
		flex: 1,
	},
});
