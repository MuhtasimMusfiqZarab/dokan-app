/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Color, Styles } from '@common'
import { Home } from '@containers'
import { Logo, Menu, HeaderHomeRight, CartWishListIcons } from './IconNav'

export default class HomeScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Home",
    headerLeft: Menu(),
    headerRight: CartWishListIcons(navigation),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.toolbar,
    headerTitleStyle: Styles.Common.headerTitleStyle,
  })

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  render() {
    const { navigate } = this.props.navigation

    return (
      <Home
        onShowAll={(config, index) =>
          navigate('ListAllScreen', { config, index })
        }
        onViewProductScreen={(item) => {
          this.props.navigation.tabBarVisible = false
          navigate('DetailScreen', item)
        }}
        navigation={this.props.navigation}
      />
    )
  }
}
