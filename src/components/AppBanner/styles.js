/** @format */

import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		width,
		height: (height * 30) / 100,
		paddingHorizontal: 15,
		justifyContent: 'center',
		marginBottom: 20,
	},
	imageBannerPanel: {
		width: '100%',
		height: (height * 30) / 100,
		justifyContent: 'center',
		borderRadius: 5,
		backgroundColor: '#fff',
		...Platform.select({
			ios: {
				shadowColor: '#000',
				shadowOpacity: 0.1,
				shadowOffset: { width: 0, height: 1 },
				shadowRadius: 10,
			},
			android: {
				elevation: 3,
			},
		}),
	},
	imageBanner: {
		// width,
		// height: (height * 40) / 100,
		// borderRadius: 5,
		flex: 1,
		width: null,
		height: null,
		borderRadius: 5,
	},
});
