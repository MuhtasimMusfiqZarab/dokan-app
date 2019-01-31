/** @format */

import React, { Component } from 'react';
import { View } from 'react-native';
import { Styles, Constants, Images, Icons, Events } from '@common';
import { connect } from 'react-redux';
import { NavigationBarIcon } from '@components';

class ProductDetailsIcons extends Component {
	constructor(props) {
		super(props);
	}

	handlePopover = () => {
		Events.togglePopover();
	};

	render() {
		const { carts, navigation } = this.props;
		// console.log("carts:::", carts);
		// const totalCart = carts.cartItems.length;
		const totalCart = carts.total;

		return (
			<View
				style={[
					Styles.Common.Row,
					Constants.RTL ? { left: -10 } : { right: -5 },
				]}>
				<NavigationBarIcon
					icon={Images.IconSearch}
					size={17}
					onPress={() => navigation.navigate('Search')}
				/>
				<NavigationBarIcon
					type="icon"
					icon="cart"
					number={totalCart}
					onPress={() => navigation.navigate('CartScreen')}
				/>
				<NavigationBarIcon
					type="materialIcon"
					icon={Icons.MaterialCommunityIcons.DotHorizontal}
					size={20}
					onPress={this.handlePopover}
				/>
			</View>
		);
	}
}

const mapStateToProps = ({ carts }) => ({ carts });
export default connect(mapStateToProps)(ProductDetailsIcons);
