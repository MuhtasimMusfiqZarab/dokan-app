/** @format */

import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Color, Config, Constants } from '@common';

export default StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "white",
		backgroundColor: '#F8F8FA',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 15,
		borderBottomWidth: 0.5,
		borderColor: '#CED7DD',
		backgroundColor: 'transparent',
	},
	label: {
		fontSize: 16,
		color: Color.Text,
		fontFamily: Constants.fontHeader,
	},
	value: {
		fontSize: 16,
		color: Color.headerTintColor,
		fontFamily: Constants.fontFamilyLato,
		// right: 20,
		// position: "absolute",
		top: 5,
		left: 10,
		marginBottom: 10,

		...Platform.select({
			android: {
				paddingTop: Config.showStatusBar ? 15 : 0,
			},
		}),
	},
	list: {
		flex: 1,
	},
	buttonContainer: {
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 10,
		marginBottom: 10,
		paddingLeft: Platform.OS === 'ios' ? 20 : 10,
		paddingRight: Platform.OS === 'ios' ? 20 : 10,
		flexDirection: 'row',
	},
	button: {
		height: 40,
		width: width / 2,
		backgroundColor: '#4cb906',
		borderRadius: 0,
	},
	buttonText: {
		fontSize: 14,
		fontWeight: 'bold',
	},
	hiddenRow: {
		flex: 1,
		backgroundColor: 'red',
		alignItems: 'flex-end',
		justifyContent: 'center',
	},

	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		width: 70,
		height: 70,
		tintColor: '#B7C4CB',
	},
	numberWrap: {
		position: 'absolute',
		top: -18,
		right: -15,
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: 'red',
		justifyContent: 'center',
	},
	number: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
		textAlign: 'center',
		backgroundColor: 'rgba(0,0,0,0)',
	},
	title: {
		marginTop: 20,
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		width: 230,
		lineHeight: 40,
		opacity: 0.8,
		fontFamily: Constants.fontFamilyLato,
	},
	message: {
		fontSize: 14,
		textAlign: 'center',
		color: '#BECDD0',
		width: 230,
		marginTop: 10,
		lineHeight: 25,
		fontFamily: Constants.fontFamily,
	},

	button: {
		height: 40,
		width: 160,
		borderRadius: 20,
		backgroundColor: Color.primary,
	},
	buttonText: {
		fontSize: 15,
		fontFamily: Constants.fontHeader,
	},
	bottomView: {
		flexDirection: 'row',
		marginTop: 50,
		borderTopWidth: 1,
		borderTopColor: '#d4dce1',
		justifyContent: 'space-between',
		height: 50,
		alignItems: 'center',
	},
	total: {
		fontSize: 16,
		marginLeft: 15,
		color: '#999',
	},
	money: {
		fontSize: 16,
		marginRight: 15,
		color: '#0f98ec',
	},
	scrollView: {
		paddingBottom: 100,
		height: height,
		paddingTop: 20,
	},
	bottomView: {
		height: 40,
		flexDirection: 'row',
		borderTopWidth: 1,
		borderTopColor: '#f3f7f9',
	},
	btnClean: {
		flex: 0.5,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Color.BuyNowButton,
	},
	btnCleanText: {
		color: 'white',
		fontSize: 14,
		fontFamily: Constants.fontHeader,
	},
	btnCart: {
		flex: 0.5,
		backgroundColor: '#f5f5f5',
	},
	btnCartText: {
		color: '#999',
		fontSize: 14,
		fontWeight: 'bold',
		fontFamily: Constants.fontHeader,
	},
});
