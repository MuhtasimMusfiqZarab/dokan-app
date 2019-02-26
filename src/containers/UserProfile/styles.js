/** @format */

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5',
	},
	profileSection: {
		backgroundColor: '#FFF',
		marginTop: 15,
	},
	headerSection: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		fontSize: 16,
		// color: "#4A4A4A",
		color: '#000',
		fontWeight: '600',
		flex: 2,
	},
	editText: {
		flex: 1,
		textAlign: 'right',
		paddingVertical: 10,
		paddingRight: 20,
		fontSize: 13,
		color: 'red',
	},
	editTextInputStyle: {
		width: '90%',
		marginBottom: 15,
		backgroundColor: '#fff',
		borderRadius: 5,
		padding: 5,
	},
});
