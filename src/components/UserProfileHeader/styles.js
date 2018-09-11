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
    marginTop: 60,
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
    height: width / 3,
    width: width / 3,
    borderRadius: 3,
  },
  loginText: {
    color: "#666",
  },
  profilePic: {
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 120,
    borderRadius: 60,
    paddingTop: 15,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    position: "absolute",
    top: 80,
    // left: width / 2.7,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2}
  }
});
