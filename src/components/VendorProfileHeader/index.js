/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text, Image, } from "react-native";
import { Constants, Images } from "@common";
import { Rating, ImageCache } from "@components";
import styles from "./styles";
import { LinearGradient } from "@expo";
import DokanWorker from "@services/Dokan/DokanWorker";

export default class VendorProfileHeader extends PureComponent {
	constructor(props) {
		super(props);
		this.page = 1;
		this.limit = Constants.pagingLimit;
		this.state = {
			tabIndex: 0,
		};
		this.vendorProducts = ""
	}

	render() {
		const { vendor } = this.props;

		return (
			<View style={styles.header}>
				{
					vendor.banner ?
						<ImageCache
							style={styles.store_banner}
							uri={vendor.banner}
						/> :
						<Image
							style={styles.store_banner}
							source={Images.StoreDefaultBanner}
						/>
				}
				
				<View style={styles.profilePic}>
					<ImageCache
						uri={vendor.gravatar}
						style={styles.avatar}/>
				</View>

				<View style={styles.textContainer}>
					<Text style={styles.fullName}>
						{`${vendor.first_name} ${vendor.last_name}`}
					</Text>
					<Rating rating={vendor.rating.rating} />
				</View>
			</View>
		);
	}
}
