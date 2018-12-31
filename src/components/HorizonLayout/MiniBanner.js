/** @format */

"use strict";
import React, { PureComponent } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import css from "./style";
import { Constants, Icons, Images, Styles, Languages, Tools } from "@common";
import { CommentIcons, ImageCache, WishListIcon } from "@components";
import { getProductImage, currencyFormatter } from "@app/Omni";

import { LinearGradient } from "@expo";

export default class miniBanner extends PureComponent {
	render() {
		const { viewPost, title, product } = this.props;
		const imageURI =
			typeof product.images[0] != "undefined"
				? getProductImage(product.images[0].src, Styles.width)
				: Images.PlaceHolderURL;
		let productPrice = currencyFormatter(product.price) + " ";
		let productPriceSale = product.on_sale
			? currencyFormatter(product.regular_price) + " "
			: null;

		return (
			<TouchableOpacity
				activeOpacity={0.9}
				style={css.panelMini}
				onPress={viewPost}>
				<ImageCache uri={imageURI} style={css.imageMini} />
				<LinearGradient
					colors={["rgba(0,0,0,0)", "rgba(0,0,0, 0.7)"]}
					style={css.bannerGradient}>
					<Text style={css.bannerTitle}>{title}</Text>
					<View style={css.priceView}>
						<Text style={[css.price]}>{productPrice}</Text>
						<Text style={[css.price, product.on_sale && css.sale_price]}>
							{productPriceSale}
						</Text>
					</View>
				</LinearGradient>
				<WishListIcon product={product} />
			</TouchableOpacity>
		);
	}
}
