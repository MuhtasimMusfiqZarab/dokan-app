/** @format */

import { StyleSheet, Platform, Dimensions, I18nManager } from "react-native";
const { width, height } = Dimensions.get("window");
import { Color, Config, Constants, Device, Styles } from "@common";

export default StyleSheet.create({
  container: {
    marginBottom: 2,
  },
  fullName: {
    color: Color.blackTextPrimary,
    backgroundColor: "transparent",
    fontSize: 26,
    marginTop: 10,
    marginBottom: 6,
  },
  address: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#9B9B9B",
    fontWeight: "600",
  },
  textContainer: {
    // marginLeft: 20,
    marginTop: Device.isIphoneX ? 70 : 50,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    alignItems: "center",
    backgroundColor: "#fff",
    height: height / 2,
  },
  store_banner: {
    width: "100%",
    height: "60%"    
  },
  avatar: {
    // height: width / 3,
    // width: width / 3,
    // borderRadius: 3,
    height: 90,
    width: 90,
    borderRadius: 45
  },
  loginText: {
    color: "#666",
  },
  profilePic: {
    position: "absolute",
    top: height / 4.5,
    justifyContent: "center",
    alignItems: "center",
    width: 110,
    height: 110,
    borderRadius: 55,
    // paddingTop: 15,
    backgroundColor: "rgba(255, 255, 255, 1)",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      }
    })
  },
});
