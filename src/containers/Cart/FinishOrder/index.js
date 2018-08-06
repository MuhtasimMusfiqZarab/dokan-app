/** @format */

import React, { PureComponent } from "react";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button } from "@components";
import { Languages, Color } from "@common";
import styles from "./styles";

export default class FinishOrder extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons
            name="ios-checkmark-circle"
            size={80}
            color={Color.accent}
          />
        </View>

        <Text style={styles.title}>{Languages.ThankYou}</Text>
        <Text style={styles.message}>{Languages.FinishOrder}</Text>

        <View style={styles.btnNextContainer}>
          <Button
            text={Languages.ViewMyOrders}
            style={styles.button}
            textStyle={styles.buttonText}
            onPress={this.props.finishOrder}
          />
        </View>
      </View>
    );
  }
}
