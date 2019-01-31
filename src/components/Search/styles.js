/** @format */

import { StyleSheet, Dimensions, I18nManager, Platform } from 'react-native';
import { Constants } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	flatlist: {
		// backgroundColor: "#fff",
		backgroundColor: '#F8F8FA',
		paddingTop: 8,
		paddingBottom: 20,
	},
	more: {
		width,
		alignItems: 'center',
		marginBottom: 10,
		marginTop: 10,
	},
	//weDevs
	tabView: {
		minHeight: height / 2,
	},
	tabItem: {
		// flex: 0.32,
		backgroundColor: 'rgba(255,255,255,1)',
	},
	tabButton: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		height: 50,
		// borderTopWidth: 1,
		// borderBottomWidth: 1,
		// borderTopColor: "#f5f5f5",
		// borderBottomColor: "#f5f5f5",
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: 'rgba(255,255,255,1)',
		...Platform.select({
			ios: {
				shadowColor: '#000',
				shadowOpacity: 0.3,
				shadowOffset: { width: 0, height: 2 },
			},
			android: {
				elevation: 3,
			},
		}),
	},
	textTab: {
		fontFamily: Constants.fontFamilyLato,
		fontSize: 14,
		color: '#7C8592',
	},
	description: {
		padding: 20,
		paddingTop: 10,
		// backgroundColor: "rgba(255,255,255,1)",
		alignItems: I18nManager.isRTL ? 'flex-end' : 'flex-start',
	},
	popCatContainer: {
		flexDirection: 'row',
		width: '100%',
		padding: 10,
		flexWrap: 'wrap',
		marginBottom: 10,
	},
	popCat: {
		margin: 3,
		borderRadius: 3,
		width: '31%',
		height: 100,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
