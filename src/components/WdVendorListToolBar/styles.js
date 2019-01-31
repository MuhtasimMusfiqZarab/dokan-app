import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
	toolbarContainer: {
		height: 50,
		padding: 15,
		flexDirection: 'row',
		backgroundColor: '#fff',
		justifyContent: 'flex-end',
		...Platform.select({
			ios: {
				shadowColor: '#000',
				shadowOpacity: 0.2,
				shadowOffset: { width: 0, height: 1 },
			},
			android: {
				elevation: 3,
			},
		}),
	},
	toolbar: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	toolbarIcon: {
		color: '#A0A9BD',
	},
});
