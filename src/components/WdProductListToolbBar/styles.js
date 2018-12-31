import { StyleSheet, Platform } from "react-native";
import { Constants } from "@common";

export default StyleSheet.create({
	toolbarContainer: {
		height: 50,
		padding: 15,
		flexDirection: 'row',
		backgroundColor: '#fff',
		...Platform.select({
				ios: {
					shadowColor: '#000',
					shadowOpacity: 0.2,
					shadowOffset: {width: 0, height: 1}
				},
				android: {
					elevation: 3
				}
		})
	},
	toolbarLeft: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	toolbarRight: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	toolbarIcon: {
		color: '#A0A9BD',
	},
	modal: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(255, 255, 255, 0.9)'
	},
	modalClose: {
		width: 50,
		height: 50,
		borderRadius: 25,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
		...Platform.select({
				ios: {
					shadowColor: "#000",
					shadowOpacity: 0.4,
					shadowOffset: {width: -1, height: 2}
				},
				android: {
						elevation: 3
				}
		})
	},
	modalContent: {
		width: "70%",
		height: 250,
		backgroundColor: "#fff",
		padding: 15,
		marginTop: 10,
		...Platform.select({
				ios: {
					shadowColor: "#000",
					shadowOpacity: 0.3,
					shadowOffset: {width: -1, height: 2}
				},
				android: {
					elevation: 3
				}
		})
	},
	sortingTextContainer: {
		padding: 5,
		marginBottom: 15
	},
	sortingText: {
		color: "#7C8592",
		fontSize: 15,
		fontFamily: Constants.fontFamilyLato
	}
});