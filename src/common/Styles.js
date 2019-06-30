/**
 * @format
 */

import { Dimensions, Platform } from 'react-native';
import Constants from './Constants';
import Device from './Device';
import Color from './Color';
import Config from './Config';

const { height, width, heightWindow } = Dimensions.get('window');

const Styles = {
	width: Dimensions.get('window').width,
	height: Platform.OS !== 'ios' ? height : height - 20,
	navBarHeight: Platform !== 'ios' ? height - heightWindow : 0,
	headerHeight: Platform.OS === 'ios' ? 40 : 56,

	thumbnailRatio: 1.2, // Thumbnail ratio, the product display height = width * thumbnail ratio

	app: {
		flexGrow: 1,
		// backgroundColor: Device.isIphoneX ? '#F8F8FA' : '#000',
		backgroundColor: '#F8F8FA',
		// paddingTop: Device.ToolbarHeight,
	},
	FontSize: {
		tiny: 12,
		small: 14,
		medium: 16,
		big: 18,
		large: 20,
	},
	IconSize: {
		TextInput: 25,
		ToolBar: 18,
		Inline: 20,
	},
	FontFamily: {},
};

Styles.Common = {
	Column: {},
	ColumnCenter: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	ColumnCenterTop: {
		alignItems: 'center',
	},
	ColumnCenterBottom: {
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	ColumnCenterLeft: {
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	ColumnCenterRight: {
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	Row: {
		flexDirection: 'row',
		...Platform.select({
			ios: {
				top: !Config.showStatusBar
					? Device.isIphoneX
						? -20
						: -8
					: Device.isIphoneX
					? -15
					: 0,
			},
			android: {
				top: 0,
			},
		}),
	},
	RowCenter: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	RowCenterTop: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	RowCenterBottom: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'center',
	},
	RowCenterLeft: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	RowCenterRight: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	RowCenterBetween: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	// More traits

	IconSearchView: {
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
		marginBottom: 10,
		borderRadius: 50,

		shadowOffset: { width: 0, height: -4 },
		shadowColor: 'rgba(0,0,0, .3)',
		elevation: 10,
		shadowOpacity: 0.1,
		zIndex: 9999,
	},
	IconSearch: {
		width: 20,
		height: 20,
		margin: 12,
		zIndex: 9999,
	},
	logo: {
		width: Platform.OS === 'ios' ? 180 : 200,
		height: Platform.OS === 'ios' ? 20 : 20,
		resizeMode: 'contain',
		...Platform.select({
			ios: {
				marginTop: Device.isIphoneX ? -40 : Config.showStatusBar ? -4 : -15,
			},
			android: {
				marginTop: 2,
				marginLeft: 10,
			},
		}),
	},
	toolbar: {
		backgroundColor: Color.navigationBarColor,
		zIndex: 1,
		paddingTop: 4,
		...Platform.select({
			ios: {
				height: Config.showStatusBar
					? Device.isIphoneX
						? 5
						: 40
					: Device.isIphoneX
					? 5
					: 25,
			},
			android: {
				height: 46,
				paddingTop: 0,
				marginTop: 0,
				elevation: 0,
				borderBottomWidth: 1,
				borderBottomColor: '#D2DBE0',
			},
		}),
	},
	toolbarTransparent: {
		backgroundColor: 'transparent',
		zIndex: 1,
		paddingTop: 4,
		borderBottomWidth: 0,
		...Platform.select({
			ios: {
				height: Config.showStatusBar
					? Device.isIphoneX
						? 5
						: 40
					: Device.isIphoneX
					? 5
					: 25,
			},
			android: {
				height: 46,
				paddingTop: 0,
				marginTop: 0,
				elevation: 0,
			},
		}),
	},
	toolbarLeft: {
		paddingLeft: 8,
	},
	toolbarRight: {
		paddingRight: 8,
	},
	headerStyle: {
		color: Color.navigationTitleColor,
		fontSize: 16,
		textAlign: 'center',
		alignSelf: 'center',
		flex: 1,
		height: 40,
		backgroundColor: '#fff',

		fontFamily: Constants.fontFamily,
		...Platform.select({
			ios: {
				marginBottom: !Config.showStatusBar ? 14 : 0,
				marginTop: Device.isIphoneX ? -10 : 12,
			},
			android: {
				marginBottom: 4,
			},
		}),
	},
	headerTitleStyle: {
		color: Color.navigationTitleColor,
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
		alignSelf: 'center',
		flex: 1,
		// height: 40,
		// backgroundColor: '#fff',

		fontFamily: Constants.fontFamilyLato,
		...Platform.select({
			ios: {
				height: 40,
				marginBottom: !Config.showStatusBar ? 14 : 0,
				marginTop: Device.isIphoneX ? -10 : 12,
			},
			android: {
				height: 20,
				marginBottom: 4,
			},
		}),
	},
	headerStyleWishList: {
		color: Color.navigationTitleColor,
		fontSize: 16,
		textAlign: 'center',
		alignSelf: 'center',
		fontFamily: Constants.fontFamily,
		marginBottom: !Config.showStatusBar
			? Device.isIphoneX
				? 40
				: 15
			: Device.isIphoneX
			? 25
			: 5,
	},
	toolbarIcon: {
		width: 16,
		height: 16,
		resizeMode: 'contain',
		marginRight: 12,
		marginBottom: 12,
		marginLeft: 8,
		opacity: 0.8,
		...Platform.select({
			ios: {
				marginTop: Config.showStatusBar
					? Device.isIphoneX
						? -20
						: 7
					: Device.isIphoneX
					? -30
					: -3,
			},
			android: {
				marginTop: 10,
			},
		}),
	},
	iconBack: {
		// width: 24,
		// marginLeft: 20,
		width: 20,
		height: 20,
	},
	toolbarFloat: {
		backgroundColor: 'transparent',
		position: 'absolute',
		top: 0,
		borderBottomWidth: 0,

		width,
		...Platform.select({
			ios: {
				marginTop: Config.showStatusBar
					? Device.isIphoneX
						? -20
						: 7
					: Device.isIphoneX
					? -30
					: -3,
			},
			android: {
				height: 46,
				paddingTop: Config.showStatusBar ? 24 : 0,
			},
		}),
	},
	viewCover: {
		backgroundColor: '#FFF',
		zIndex: 99999,
		bottom: 0,
		left: 0,
		width,
		height: 20,
		// position: "absolute",
	},
	viewCoverWithoutTabbar: {
		backgroundColor: '#FFF',
		zIndex: 99999,
		bottom: 0,
		left: 0,
		width,
		height: 35,
		position: 'absolute',
	},

	/* *******
	 ** weDevs
	 */
	prodDetailsHeaderTitleStyle: {
		// color: Color.navigationTitleColor,
		color: '#6D7684',
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
		alignSelf: 'center',
		flex: 1,
		height: 40,
		fontFamily: Constants.fontFamilyLato,
		...Platform.select({
			ios: {
				height: 40,
				marginBottom: !Config.showStatusBar ? 14 : 0,
				marginTop: Device.isIphoneX ? -10 : 12,
			},
			android: {
				height: 20,
				marginBottom: 4,
			},
		}),
	},
	prodDetailsToolbar: {
		backgroundColor: '#E8E8E8',
		borderBottomWidth: 0,
		borderBottomColor: 'transparent',
		zIndex: 1,
		paddingTop: 4,
		...Platform.select({
			ios: {
				height: Config.showStatusBar
					? Device.isIphoneX
						? 5
						: 40
					: Device.isIphoneX
					? 5
					: 25,
			},
			android: {
				height: 46,
				paddingTop: 0,
				marginTop: 0,
				elevation: 0,
				borderBottomWidth: 1,
				borderBottomColor: '#D2DBE0',
			},
		}),
	},
};

export default Styles;
