/** @format */

import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  flatlist: {
    backgroundColor: "#fff",
    paddingTop: 8,
    paddingBottom: 20,
  },
  more: {
    width,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
});
