/** @format */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, View, Platform } from 'react-native';
import TimeAgo from 'react-native-timeago';
import { WishListIcon, ImageCache, ProductPrice, Rating } from '@components';
import { Constants } from '@common';
import css from './style';

export default class ColumnLayout extends PureComponent {
	static propTypes = {
		post: PropTypes.object,
		title: PropTypes.string,
		type: PropTypes.string,
		imageURL: PropTypes.string,
		date: PropTypes.any,
		viewPost: PropTypes.func,
	};

	render() {
		const { imageURL, post, type, title, date, viewPost } = this.props;
		return (
			<TouchableOpacity
				activeOpacity={0.9}
				style={css.panelTwo}
				onPress={viewPost}>
				<View style={css.imagePanelTwo}>
					<ImageCache
						uri={imageURL}
						style={type === 'Vendor' ? css.imageTwoVendor : css.imageTwoProduct}
						resizemode="cover"
					/>
				</View>

				<Text style={css.nameTwo}>{title}</Text>
				{typeof type !== 'undefined' && type !== 'Vendor' && (
					<Text style={[css.timeTwo, { alignSelf: 'center' }]}>
						<TimeAgo time={date} />
					</Text>
				)}

				<View>
					{typeof type === 'undefined' && (
						<ProductPrice
							product={post}
							style={css.priceRatingTwo}
							fontsize={14}
							hideDisCount
						/>
					)}
					{typeof type === 'undefined' && (
						<Rating rating={post.average_rating} style={css.priceRatingTwo} />
					)}

					{type === 'Vendor' && (
						<Rating rating={post.rating.rating} style={css.priceRatingTwo} />
					)}
				</View>

				{typeof type === 'undefined' && (
					<WishListIcon
						product={post}
						style={[
							Constants.RTL ? { left: 20 } : { right: 25 },
							{
								...Platform.select({
									android: {
										elevation: 5,
									},
								}),
							},
						]}
					/>
				)}
			</TouchableOpacity>
		);
	}
}
