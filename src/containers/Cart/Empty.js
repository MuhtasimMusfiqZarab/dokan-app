/** @format */

import React from "react";
import PropTypes from "prop-types";
import { Text, View, Image } from "react-native";
import { Languages, Images } from "@common";
import { ShopButton } from "@components";
import styles from "./styles";

const PaymentEmpty = ({ onViewHome }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentEmpty}>
        <View>
          <Image
            source={Images.IconCart}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>{Languages.ShoppingCartIsEmpty}</Text>
        <Text style={styles.message}>{Languages.AddProductToCart}</Text>
      </View>

      <ShopButton onPress={onViewHome} />
    </View>
  );
};

PaymentEmpty.propTypes = {
  onViewHome: PropTypes.func.isRequired,
};

export default PaymentEmpty;
