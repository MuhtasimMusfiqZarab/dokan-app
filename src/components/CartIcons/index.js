/** @format */

import React, { Component } from 'react';
import { View } from 'react-native';
import { Styles, Constants } from '@common';
import { connect } from 'react-redux';
import { NavigationBarIcon } from '@components';

class CartIcons extends Component {
	render() {
		const { carts, wishList, navigation } = this.props;
		// console.log("carts:::", carts);
		// const totalCart = carts.cartItems.length;
		const totalCart = carts.totalItems;
		const wishListTotal = wishList.wishListItems.length;

		return (
			<View
				style={[
					Styles.Common.Row,
					Constants.RTL ? { left: -10 } : { right: -5 },
				]}>
				<NavigationBarIcon
					type="icon"
					icon="cart"
					number={totalCart}
					onPress={() => navigation.navigate('CartScreen')}
				/>
				<NavigationBarIcon
					type="icon"
					icon="heart"
					number={wishListTotal}
					onPress={() => navigation.navigate('WishListScreen')}
				/>
			</View>
		);
	}
}

const mapStateToProps = ({ carts, wishList }) => ({ carts, wishList });
export default connect(mapStateToProps)(CartIcons);
