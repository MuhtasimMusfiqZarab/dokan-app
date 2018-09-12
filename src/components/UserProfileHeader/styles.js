/** @format */

import { StyleSheet, Platform, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { Color, Config, Constants, Device, Styles } from "@common";

export default StyleSheet.create({
  container: {
    marginBottom: 2,
  },
  fullName: {
    fontWeight: "600",
    color: Color.blackTextPrimary,
    backgroundColor: "transparent",
    fontSize: 30,
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
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    // flexDirection: "row",
    backgroundColor: "#fff",
    // padding: 20,
    height: 300,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    alignItems: "center"
  },
  headerGradient: {
    width: "100%",
    height: 150    
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
    justifyContent: "center",
    alignItems: "center",
    width: 110,
    height: 110,
    borderRadius: 55,
    // paddingTop: 15,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    elevation: 3,
    position: "absolute",
    top: 80,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    // shadowRadius: 3,
    // elevation: 15
  }
});
