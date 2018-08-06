/** @format */

import React, { Component } from "react";

import { Images, Styles } from "@common";
import { ProductList } from "@components";
import { Back } from "./IconNav";

export default class ListAllScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: Back(navigation, Images.icons.backs),

    headerStyle: Styles.Common.toolbarFloat,
  });

  render() {
    const { state, navigate } = this.props.navigation;
    const params = state.params;

    return (
      <ProductList
        headerImage={params.config.image}
        config={params.config}
        page={1}
        navigation={this.props.navigation}
        index={params.index}
        onViewProductScreen={(item) => navigate("DetailScreen", item)}
      />
    );
  }
}
