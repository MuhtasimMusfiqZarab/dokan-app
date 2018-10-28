/** @format */

import { StyleSheet, Dimensions, Platform } from "react-native";
import { Color, Constants } from "@common";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8FA",
    flexWrap: "wrap",
    padding: 15
  },
  paymentOption: {
    // marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    // padding: 15
  },
  optionContainer: {
    // width: width / 2 - 10,
    width: "46%",
    height: 115,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderRadius: 5,
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: {width: 0, height: 3}
      },
      android: {
        elevation: 3
      }
    })
  },
  optionGradient: {
    width: "100%",
    height: "100%",
    padding: 20,
    borderRadius: 5,
  },
  tickMarkContainer: {
    position: "absolute",
    top: 95,
    width: 35,
    height: 35,
    borderRadius: 17.5,
    overflow: "hidden",
    elevation: 3
  },
  tickMarkGradient: {
    width: "100%",
    height: "100%",
    // position: "absolute",
    justifyContent: "center",
    alignItems: "center"
  },
  btnOption: {
    width: 80,
    height: 60,
  },
  selectedBtnOption: {
    width: width / 2,
    height: width / 3 - 40,
    backgroundColor: "rgba(206, 215, 221, 0.6)",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 6,
  },
  imgOption: {
    // width: null,
    width: "100%",
    height: null,
    flex: 1,
    resizeMode: "contain",
  },
  message: {
    fontSize: 13,
    color: "#333",
    textAlign: "center",
    padding: 30,
    marginTop: 0,
    paddingTop: 30,
    fontFamily: Constants.fontFamily,
  },
  formCard: {
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
  },
  btnNextContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  btnNext: {
    marginBottom: 20,
    backgroundColor: "#0091ea",
    height: 40,
    width: 200,
    borderRadius: 20,
  },
  btnNextText: {
    fontWeight: "bold",
  },
  label: {
    fontSize: 20,
    color: Color.Text,
    // fontFamily: Constants.fontHeader,
    fontFamily: Constants.fontFamilyLato,
    fontWeight: "bold",
    // paddingLeft: 15,
    marginBottom: 15
  },
  descriptionView: {
    marginTop: 20,
  },
  deliveryInfoContainer: {

  }
});
