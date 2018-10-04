/** @format */

import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity, Platform } from 'react-native'
import { Styles, Images } from '@common'
import { ProductPrice, ImageCache, WishListIcon } from '@components'
import { getProductImage } from '@app/Omni'
import css from './wdstyle'

export default class ThreeColumn extends PureComponent {
  render() {
    const { viewPost, title, product } = this.props
    const imageURI =
      typeof product.images[0] !== 'undefined'
        ? getProductImage(product.images[0].src, Styles.width)
        : Images.PlaceHolderURL

    return (
      <View style={css.panelThreeView}>
        <TouchableOpacity
          style={css.panelThree}
          activeOpacity={0.9}
          onPress={viewPost}>
          <ImageCache uri={imageURI} style={css.imagePanelThree} />
        </TouchableOpacity>
        <Text numberOfLines={1} style={css.nameThree}>
          {title}
        </Text>
        <ProductPrice product={product} hideDisCount />
        <WishListIcon
          product={product}
          style={
            {
              ...Platform.select({
                android: {
                  elevation: 3
                }
              })
            }
          }
        />
      </View>
    )
  }
}