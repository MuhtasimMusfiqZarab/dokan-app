/** @format */

import React from "react";
import PropTypes from "prop-types";
import { Text, View, Image } from "react-native";
import { Languages, Images } from "@common";
import { CustomIcon } from "@app/Omni";
import { ShopButton } from "@components";
import styles from "./styles";

const PaymentEmpty = ({ onViewHome }) => {
	return (
		<View style={styles.fill}>
			<View style={styles.contentEmpty}>
				<View>
					{/* <Image
						source={Images.IconCart}
						style={styles.icon}
						resizeMode="contain"
					/> */}
					<CustomIcon
						name="cart"
						size={80}
						color="#DFDFE3"
					/>
				</View>
				<Text
					style={[styles.title, {color: "#BECDD0"}]}>
					{Languages.ShoppingCartIsEmpty}
				</Text>
				<Text style={styles.message}>{Languages.AddProductToCart}</Text>
				<ShopButton onPress={onViewHome} text="Continue Shopping" />
			</View>

		</View>
	);
};

PaymentEmpty.propTypes = {
	onViewHome: PropTypes.func.isRequired,
};

export default PaymentEmpty;
