/** @format */

import { StyleSheet, Platform, I18nManager, Dimensions } from 'react-native';
import { Constants, Color, Styles } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		borderBottomWidth: 1,
		borderBottomColor: '#d4dce1',
		// width: '100%',
	},
	content: {
		flexDirection: 'row',
		margin: 10,
	},
	imageView: {
		width: width / 3,
		height: height / 6,
		borderRadius: 5,
		backgroundColor: '#fff',
		...Platform.select({
			ios: {
				shadowColor: '#000',
				shadowOpacity: 0.1,
				shadowRadius: 10,
				shadowOffset: { width: 0, height: 1 },
			},
			android: {
				elevation: 1,
			},
		}),
	},
	image: {
		// width: 100,
		// height: 100,
		// borderRadius: 10,
		width: '100%',
		height: '100%',
		borderRadius: 5,
	},
	infoView: {
		marginLeft: 10,
		marginRight: 10,
		flex: 1,
	},
	title: {
		fontSize: Styles.FontSize.large,
		fontFamily: Constants.fontFamilyLato,
		color: Color.blackTextPrimary,
	},
	priceContainer: {
		flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
		marginTop: 10,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	price: {
		fontSize: Styles.FontSize.medium,
		color: Color.blackTextSecondary,
		fontWeight: 'bold',
		fontFamily: Constants.fontFamilyLato,
	},
	productVariant: {
		marginLeft: 10,
		fontSize: 11,
		color: Color.blackTextSecondary,
		fontFamily: Constants.fontHeader,
	},
	quantity: {
		marginRight: 10,
	},
});
