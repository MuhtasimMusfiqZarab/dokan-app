/** @format */

import { StyleSheet, Platform } from 'react-native';
import { Constants } from '@common';

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	profileSection: {
		backgroundColor: '#FFF',
		marginTop: 15,
	},
	headerSection: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		fontSize: 13,
		color: '#4A4A4A',
		fontWeight: '600',
	},
	tabView: {
		// minHeight: height / 2,
		minHeight: 700,
		// position: "absolute",
	},
	tabItem: {
		// flex: 0.32,
		backgroundColor: 'rgba(255,255,255,1)',
	},
	tabButton: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-around',
		height: 50,
		backgroundColor: 'rgba(255,255,255,1)',
		...Platform.select({
			ios: {
				shadowColor: '#000',
				shadowOpacity: 0.3,
				shadowOffset: { width: 0, height: 4 },
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
	tabContent: {
		// padding: 35,
	},
	tabContentMap: {
		width: '100%',
		paddingTop: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	noLocation: {
		width: '95%',
		height: 250,
		position: 'absolute',
		top: 20,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
	},
	mapAddressBar: {
		width: '95%',
		minHeight: 70,
		// padding: 15,
		backgroundColor: '#fff',
		flexDirection: 'row',
		...Platform.select({
			ios: {
				shadowColor: '#000',
				shadowOpacity: 0.3,
				shadowOffset: { width: 0, height: 1 },
			},
			android: {
				elevation: 3,
			},
		}),
	},
	mapContactItem: {
		flex: 0.5,
		padding: 15,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});
