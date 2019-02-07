import { StyleSheet } from 'react-native';
import { Constants, Color } from '@common';

export default StyleSheet.create({
	orderDetailsBlock: {
		width: '100%',
		backgroundColor: '#fff',
		borderRadius: 5,
		paddingVertical: 15,
		marginBottom: 15,
	},
	title: {
		fontSize: 18,
		fontFamily: Constants.fontFamilyLato,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	standardTextBlack: {
		fontFamily: Constants.fontFamilyLato,
		fontSize: 16,
		color: '#000',
	},
	standardTextGray: {
		fontFamily: Constants.fontFamilyLato,
		fontSize: 16,
		color: Color.TextLight,
	},
	standardTextRed: {
		fontFamily: Constants.fontFamilyLato,
		fontSize: 16,
		color: 'red',
	},
	separator: {
		width: '100%',
		marginVertical: 10,
		borderBottomWidth: 0.5,
		borderBottomColor: Color.TextLight,
	},
});
