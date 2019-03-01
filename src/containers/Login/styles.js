/** @format */

import { Dimensions, StyleSheet, I18nManager, Platform } from 'react-native';
import { Color, Styles, Constants } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
	backgroundImage: {
		flex: 1,
		width: null,
		height: null,
	},
	container: {
		// flex: 1,
		flexGrow: 1,
	},
	backButton: {
		paddingHorizontal: Styles.width * 0.1,
		marginTop: Styles.width * 0.1,
	},
	logoWrap: {
		// ...Styles.Common.ColumnCenter,
		flexGrow: 0.3,
		paddingHorizontal: Styles.width * 0.1,
		paddingBottom: 50,
	},
	logo: {
		// width: Styles.width * 0.8,
		// height: (Styles.width * 0.8) / 2,
		width: 120,
		height: 80,
	},
	logoText: {
		width: width / 2,
		color: Color.wdgray5,
	},
	loginText: {
		paddingHorizontal: Styles.width * 0.1,
		fontSize: 30,
		fontFamily: Constants.fontFamilyLato,
		fontWeight: 'bold',
		color: '#000',
		marginBottom: 20,
	},
	subContain: {
		paddingHorizontal: Styles.width * 0.1,
		paddingBottom: 50,
	},
	loginForm: {},
	inputWrap: {
		// flexDirection: "row",
		// alignItems: "center",
		// borderColor: Color.blackDivide,
		// borderBottomWidth: 1,
		marginBottom: 20,
	},
	label: {
		color: '#7C8592',
	},
	input: {
		color: Color.blackTextPrimary,
		backgroundColor: '#fff',
		borderRadius: 5,
		height: 45,
		marginTop: 10,
		paddingHorizontal: 10,
		textAlign: I18nManager.isRTL ? 'right' : 'left',
		...Platform.select({
			ios: {
				shadowColor: '#000',
				shadowOpacity: 0.05,
				shadowOffset: { width: 0, height: 1 },
			},
			android: {
				elevation: 1,
			},
		}),
	},
	loginButton: {
		marginTop: 20,
		backgroundColor: Color.primary,
		borderRadius: 5,
		elevation: 1,
	},
	separatorWrap: {
		paddingVertical: 15,
		flexDirection: 'row',
		alignItems: 'center',
	},
	separator: {
		borderBottomWidth: 1,
		flexGrow: 1,
		borderColor: Color.blackTextDisable,
	},
	separatorText: {
		color: Color.blackTextDisable,
		paddingHorizontal: 10,
	},
	fbButton: {
		backgroundColor: Color.facebook,
		borderRadius: 5,
		elevation: 1,
	},
	// ggButton: {
	//     marginVertical: 10,
	//     backgroundColor: Color.google,
	//     borderRadius: 5,
	// },
	signUp: {
		color: Color.blackTextSecondary,
		marginTop: 20,
	},
	highlight: {
		fontWeight: 'bold',
		color: Color.wdgray,
	},
	overlayLoading: {
		...StyleSheet.absoluteFillObject,
		width,
		height,
	},
	pwdResetInfo: {
		width: width / 1.5,
		height: 200,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		backgroundColor: '#fff',
		...Platform.select({
			ios: {
				shadowColor: '#000',
				shadowOpacity: 0.3,
				shadowOffset: { width: 0, height: 0 },
			},
			android: {
				elevation: 3,
			},
		}),
	},
});
