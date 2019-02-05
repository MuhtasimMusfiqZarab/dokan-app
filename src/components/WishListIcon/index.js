/** @format */

import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Button } from '@components';
import { Color } from '@common';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import styles from './styles';

import { connect } from 'react-redux';

class WishListIcon extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedSize: 0,
			selectedColor: 0,
		};
		this.productSize = this.getProductSize(props.product);
		this.productColor = this.getProductColor(props.product);
	}

	addToWishList() {
		const {
			wishList,
			product,
			removeWishListItem,
			addWishListItem,
		} = this.props;
		const isInWishList =
			wishList.wishListItems.find(item => item.product.id === product.id) !==
			undefined;
		console.log('wishList');
		if (isInWishList) {
			removeWishListItem(product);
		} else addWishListItem(product);
	}

	getProductSize(product) {
		var attribute = null;
		if (typeof product.attributes == 'undefined') return;

		const attrLength = product.attributes.length;
		for (let i = 0; i < attrLength; i++) {
			if (product.attributes[i].name.toLowerCase() == 'size') {
				attribute = product.attributes[i];
				break;
			}
		}
		return attribute;
	}

	getProductColor(product) {
		var attribute = null;
		if (typeof product.attributes == 'undefined') return;

		const attrLength = product.attributes.length;
		for (var i = 0; i < attrLength; i++) {
			if (product.attributes[i].name.toLowerCase() == 'color') {
				attribute = product.attributes[i];
				break;
			}
		}
		return attribute;
	}

	render() {
		const { wishList, product, iconSize } = this.props;
		// console.log("wishlist", wishList.wishListItems);
		// console.log("productThis", this.props.product.id);
		let clicked =
			wishList.wishListItems.filter(item => item.product.id == product.id) == ''
				? false
				: true;

		return (
			// <Button
			// 	type="image"
			// 	source={require('@images/icons/icon-love.png')}
			// 	imageStyle={[
			// 		{
			// 			width: this.props.width ? this.props.width : 15,
			// 			height: this.props.height ? this.props.height : 15,
			// 		},
			// 		clicked && { tintColor: Color.heartActiveWishList },
			// 	]}
			// 	buttonStyle={[styles.buttonStyle, this.props.style && this.props.style]}
			// 	onPress={this.addToWishList.bind(this)}
			// />

			<TouchableOpacity
				style={[styles.buttonStyle, this.props.style && this.props.style]}
				onPress={() => {
					this.addToWishList();
				}}>
				{clicked && (
					<FontAwesome
						name="heart"
						size={iconSize ? iconSize : 18}
						color="red"
					/>
				)}
				{!clicked && (
					<FontAwesome
						name="heart-o"
						size={iconSize ? iconSize : 18}
						color="#b5b8c1"
					/>
				)}
			</TouchableOpacity>
		);
	}
}

const mapStateToProps = ({ wishList }) => ({ wishList });

function mergeProps(stateProps, dispatchProps, ownProps) {
	// const { netInfo } = stateProps;
	const { dispatch } = dispatchProps;
	const WishListRedux = require('@redux/WishListRedux');
	return {
		...ownProps,
		...stateProps,
		addWishListItem: product => {
			WishListRedux.actions.addWishListItem(dispatch, product);
		},
		removeWishListItem: product => {
			WishListRedux.actions.removeWishListItem(dispatch, product);
		},
	};
}

export default connect(
	mapStateToProps,
	null,
	mergeProps
)(WishListIcon);
