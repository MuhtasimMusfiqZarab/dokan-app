import { StyleSheet } from 'react-native';

// const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		width: '100%',
		padding: 15,
		marginBottom: 10,
		borderRadius: 3,
		borderWidth: 1,
		borderColor: '#E6EAEB',
	},
	header: {
		flexDirection: 'row',
		marginBottom: 5,
	},
	headerImage: {
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	headerText: {
		marginLeft: 5,
	},
	content: {
		marginBottom: 15,
	},
	footer: {
		alignItems: 'flex-end',
	},
});
