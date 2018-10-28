/** @format */

import React, { PureComponent } from "react";
import { Text, View, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button } from "@components";
import { Languages, Color } from "@common";
import styles from "./styles";

export default class FinishOrder extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <View style={
          {
            width: "90%",
            height: 400,
            backgroundColor: "#fff",
            borderRadius: 3,
            justifyContent: "center",
            alignItems: "center",
            
            ...Platform.select({
              ios: {
                shadowColor: "#000",
                shadowOpacity: 0.3,
                shadowOffset: {width: 0, height: 1}
              },
              android: {
                elevation: 3
              }
            })
          }
        }>
          <View style={styles.iconContainer}>
            <Ionicons
              name="ios-checkmark-circle"
              size={80}
              color={Color.accent}
            />
          </View>

          {/* <Text style={styles.title}>{Languages.ThankYou}</Text> */}
          <Text style={styles.message}>{Languages.FinishOrder}</Text>

          <View style={styles.btnNextContainer}>
            <Button
              type="gradientBtn"
              text={Languages.ViewMyOrders}
              // style={styles.button}
              // textStyle={styles.buttonText}
              onPress={this.props.finishOrder}
            />
          </View>
        </View>
      </View>
    );
  }
}
