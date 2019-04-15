/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { Languages } from '@common';
import { CustomIcon } from '@app/Omni';
import { ShopButton, Spinkit } from '@components';
import styles from './styles';

const PaymentEmpty = ({ onViewHome, isCartFetching }) => {
	return (
		<View style={styles.fill}>
			{isCartFetching && (
				<View style={styles.contentEmpty}>
					<Spinkit size="large" />
				</View>
			)}
			{!isCartFetching && (
				<View style={styles.contentEmpty}>
					<View>
						{/* <Image
						source={Images.IconCart}
						style={styles.icon}
						resizeMode="contain"
					/> */}
						<CustomIcon name="cart" size={80} color="#DFDFE3" />
					</View>
					<Text style={[styles.title, { color: '#BECDD0' }]}>
						{Languages.ShoppingCartIsEmpty}
					</Text>
					<Text style={styles.message}>{Languages.AddProductToCart}</Text>
					<ShopButton onPress={onViewHome} text="Continue Shopping" />
				</View>
			)}
		</View>
	);
};

PaymentEmpty.propTypes = {
	onViewHome: PropTypes.func.isRequired,
	isCartFetching: PropTypes.bool.isRequired,
};

export default PaymentEmpty;
