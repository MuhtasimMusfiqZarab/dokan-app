/** @format */

import { StyleSheet, Platform, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { Color, Config, Constants, Device } from "@common";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: "#FFF",
    marginTop: 15,
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 13,
    color: "#4A4A4A",
    fontWeight: "600",
  },
  tabView: {
    // minHeight: height / 2,
    minHeight: 700,
    // position: "absolute",
  },
  tabItem: {
    // flex: 0.32,
    backgroundColor: "rgba(255,255,255,1)",
  },
  tabButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    backgroundColor: "rgba(255,255,255,1)",
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 0},
      },
      android: {
        elevation: 3
      }
    }),
  },
  textTab: {
    fontFamily: Constants.fontFamilyLato,
    fontSize: 14,
    color: "#7C8592"
  },
  tabContent: {
    // padding: 35,
  },
  tabContentMap: {
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});
