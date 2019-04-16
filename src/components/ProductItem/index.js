/** @format */

import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, View, Image, Dimensions } from 'react-native';
import styles from './styles';
import { getProductImage, currencyFormatter } from '@app/Omni';
import ChangeQuantity from '@components/ChangeQuantity';
import { connect } from 'react-redux';

class ProductItem extends PureComponent {
	render() {
		const {
			product,
			quantity,
			viewQuantity,
			variation,
			onPress,
			isCartProduct,
			token,
			isCartUpdating,
			updateCartItem,
		} = this.props;
		const price =
			variation === null || variation === undefined
				? product.price
				: variation.price;

		return (
			<View style={styles.container}>
				<View style={styles.content}>
					{isCartProduct ? (
						<Image
							source={{
								uri: getProductImage(product.data.images[0].src, 100),
							}}
							style={styles.image}
						/>
					) : (
						<Image
							source={{ uri: getProductImage(product.images[0].src, 100) }}
							style={styles.image}
						/>
					)}
					<View
						style={[
							styles.infoView,
							{ width: Dimensions.get('window').width - 180 },
						]}>
						<TouchableOpacity onPress={() => onPress({ product })}>
							<Text style={styles.title}>
								{isCartProduct ? product.data.name : product.name}
							</Text>
						</TouchableOpacity>
						<View style={styles.priceContainer}>
							<Text style={styles.price}>
								{isCartProduct
									? currencyFormatter(product.data.price)
									: currencyFormatter(price)}
							</Text>
							{variation &&
								typeof variation.attributes !== 'undefined' &&
								variation.attributes.map(variant => {
									return (
										<Text key={variant.name} style={styles.productVariant}>
											{variant.option}
										</Text>
									);
								})}
						</View>
					</View>
					{viewQuantity && (
						<ChangeQuantity
							style={styles.quantity}
							quantity={quantity}
							// onChangeQuantity={this.onChangeQuantity.bind(this)}
							productKey={product.key}
							token={token}
							isCartUpdating={isCartUpdating}
							updateCartItem={updateCartItem}
						/>
					)}
				</View>
			</View>
		);
	}

	// onChangeQuantity(quantity) {
	// 	if (this.props.quantity < quantity) {
	// 		this.props.addCartItem(
	// 			this.props.product,
	// 			this.props.variation,
	// 			this.props.token
	// 		);
	// 	} else {
	// 		this.props.removeCartItem(this.props.product, this.props.variation);
	// 	}
	// }
}

const mapStateToProps = ({ user, carts }) => {
	return { token: user.token, isCartUpdating: carts.isFetching };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { dispatch } = dispatchProps;
	const { actions } = require('@redux/CartRedux');
	return {
		...ownProps,
		...stateProps,
		addCartItem: (product, variation, token) => {
			actions.addCartItem(dispatch, product, variation, token);
		},
		removeCartItem: (product, variation) => {
			actions.removeCartItem(dispatch, product, variation);
		},
		updateCartItem: (productKey, quantity, token) => {
			actions.updateCartItem(dispatch, productKey, quantity, token);
		},
	};
}

export default connect(
	mapStateToProps,
	undefined,
	mergeProps
)(ProductItem);
