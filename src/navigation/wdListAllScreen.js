/** @format */

import React, { Component } from 'react'

import { Images, Styles, Color } from '@common'
import { ProductList } from '@components'
import { Menu, Back, CartWishListIcons} from './IconNav'
import MenuFilter from "@components/WdFilterMenu/MenuFilter";

export default class ListAllScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Product List",
    headerLeft: Back(navigation, Images.icons.arrowBack),
    headerRight: CartWishListIcons(navigation),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.toolbar,
    headerTitleStyle: Styles.Common.headerTitleStyle,
  })


  render() {
    const { state, navigate } = this.props.navigation
    const params = state.params

    return (
      <MenuFilter
        goToScreen={this.goToScreen}
        routes={
          <ProductList
            headerImage={params.config.image}
            config={params.config}
            page={1}
            navigation={this.props.navigation}
            index={params.index}
            onViewProductScreen={(item) => navigate("DetailScreen", item)}
          />
        }
      />
    )
  }
}
