/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { Color } from "@common";
import { currencyFormatter } from "@app/Omni";
import styles from "./styles";

export default class ProductPrice extends PureComponent {
  static propTypes = {
    product: PropTypes.object,
    hideDisCount: PropTypes.bool,
    style: PropTypes.any,
  };

  render() {
    const { product, hideDisCount, style } = this.props;
    return (
      <View style={[styles.price_wrapper, style && style]}>
        <Text
          style={[
            styles.text_list,
            styles.price,
            { color: Color.blackTextSecondary },
          ]}>
          {`${currencyFormatter(product.price)} `}
        </Text>
        <Text style={[styles.text_list, styles.sale_price]}>
          {product.on_sale ? currencyFormatter(product.regular_price) : ""}
        </Text>
        {hideDisCount ? (
          <View />
        ) : !product.on_sale ? (
          <View />
        ) : (
          <View style={styles.saleWrap}>
            <Text style={[styles.text_list, styles.sale_off]}>
              {`-${(
                (1 - Number(product.price) / Number(product.regular_price)) *
                100
              ).toFixed(0)}%`}
            </Text>
          </View>
        )}
      </View>
    );
  }
}
