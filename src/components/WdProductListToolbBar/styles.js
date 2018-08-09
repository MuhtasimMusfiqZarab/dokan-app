import { StyleSheet } from "react-native";

export default StyleSheet.create({
    toolbarContainer: {
        height: 50,
        padding: 15,
        flexDirection: 'row',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 1}
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
    }
});