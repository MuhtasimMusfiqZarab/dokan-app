/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Text, View, TouchableOpacity, I18nManager } from "react-native";
import { WishListIcon, ImageCache, ProductPrice, Rating } from "@components";
import { Color } from "@common";
import css from "./style";

export default class SimpleLayout extends PureComponent {
	static propTypes = {
		post: PropTypes.object,
		type: PropTypes.string,
		// date: PropTypes.any,
		description: PropTypes.string,
		title: PropTypes.string,
		category: PropTypes.any,
		imageURL: PropTypes.string,
		viewPost: PropTypes.func,
		viewCategory: PropTypes.func,
	};

	render() {
		const {
			imageURL,
			post,
			type,
			title,
			description,
			// date,
			viewPost,
			category,
			viewCategory,
		} = this.props;

		const price = {
			alignItems: "flex-start",
			marginLeft: 5,
		};
		const priceRTL = {
			alignItems: "flex-end",
			marginRight: 5,
		};

		return (
			<View
				style={[
					css.panelList,
					I18nManager.isRTL && { flexDirection: "row-reverse" },
				]}
				>

				<TouchableOpacity
					activeOpacity={0.9}
					style={css.simpleImage}
					onPress={viewPost}>
					<ImageCache
						uri={imageURL}
						style={type === "Vendor" ? css.simpleImageVendor : css.simpleImageProduct}
						resizemode="contain" />
					{typeof type === "undefined" && (
						<WishListIcon product={post} style={{ top: 5, right: 10 }} />
					)}
				</TouchableOpacity>

				<View style={css.simpleContent}>
					<Text style={css.simpleTitle}>{title}</Text>
					
					{typeof type === "undefined" &&
						<View style={css.simpleVendorNameView}>
							<Text style={{color: Color.textGray, fontSize: 12}}>by</Text>
							<TouchableOpacity>
								<Text style={{color: Color.textBlue, fontSize: 12, marginLeft: 5}}>Vendor Name</Text>
							</TouchableOpacity>
						</View>
					}

					{description && <Text style={css.simpleDesc}>{description}</Text>}
					<View>
						{typeof type === "undefined" && (
							<ProductPrice
								product={post}
								style={I18nManager.isRTL ? priceRTL : price}
								hideDisCount
							/>
						)}
						{category && (
							<TouchableOpacity onPress={viewCategory}>
								<Text style={css.category}>- {category}</Text>
							</TouchableOpacity>
						)}
						{
							typeof type === "undefined" &&
							<Rating rating={post.average_rating} />
						}
						{
							type === "Vendor" &&
							<Rating rating={post.rating.rating} />
						}

						{type === "Vendor" && post.featured === true &&
							<View style={css.simpleVendorNameView}>  
								<Text style={{color: Color.textBlue, fontSize: 12}}>
									Featured
								</Text> 
							</View>
						}

					</View>
				</View>
				
			</View>
		);
	}
}
