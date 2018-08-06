/** @format */

import React, { PureComponent } from "react";
import { Text, View, Image } from "react-native";
import { Languages, Images } from "@common";
import { ShopButton } from "@components";
import styles from "./styles";

export default class PaymentEmpty extends PureComponent {
  render() {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.content}>
          <View>
            <Image
              source={Images.IconOrder}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>{Languages.MyOrder}</Text>
          <Text style={styles.message}>{this.props.text}</Text>

          <ShopButton
            onPress={this.props.onReload}
            text={Languages.reload}
            css={{
              backgroundColor: "#ccc",
              marginTop: 20,
              width: 120,
              height: 40,
            }}
          />
        </View>

        <ShopButton onPress={this.props.onViewHome} />
      </View>
    );
  }
}
