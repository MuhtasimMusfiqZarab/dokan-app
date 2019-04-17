/** @format */

'use strict';
import React, { PureComponent } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import Placeholder from 'rn-placeholder';
import style from './styles';
import { Images, Styles } from '@common';
import { ImageCache } from '@components';
import { getProductImage } from '@app/Omni';
import WooWorker from '../../services/WooCommerce/WooWorker';

class AppBanner extends PureComponent {
	componentDidMount() {
		this.props.fetchBanners();
	}

	handlePress = async banner => {
		const bannerClickable = banner.is_clickable;
		const bannerType = banner.type;
		const typeID = banner.type_id;
		const { setSelectedCategory, onViewCategory } = this.props;

		const category = await WooWorker.getSingleCategory(typeID);

		if (bannerClickable) {
			if (bannerType === 'product_cat') {
				setSelectedCategory({
					...category,
					mainCategory: category,
				});
				onViewCategory({ mainCategory: category });
			} else {
				const { config, onShowAll, index } = this.props;
				console.log(this.props);
				config.tag = typeID;

				onShowAll(config, index);
			}
		}
	};

	renderDot = () => {
		return (
			<View
				style={{
					backgroundColor: '#C8CCD5',
					width: 8,
					height: 8,
					borderRadius: 4,
					marginLeft: 3,
					marginRight: 3,
					marginTop: 3,
					marginBottom: 3,
				}}
			/>
		);
	};

	renderActiveDot = () => {
		return (
			<View
				style={{
					backgroundColor: '#FFF',
					width: 8,
					height: 8,
					borderRadius: 4,
					marginLeft: 3,
					marginRight: 3,
					marginTop: 3,
					marginBottom: 3,
				}}
			/>
		);
	};

	render() {
		return (
			<View style={style.container}>
				<Placeholder.ImageContent
					width="100%"
					lineNumber={5}
					textSize={14}
					lineSpacing={10}
					color="#C8CCD5"
					lastLineWidth="30%"
					firstLineWidth="10%"
					animate="fade"
					onReady={this.props.finish}>
					<Swiper
						dot={
							<View
								style={{
									backgroundColor: '#C8CCD5',
									width: 8,
									height: 8,
									borderRadius: 4,
									marginLeft: 3,
									marginRight: 3,
									marginTop: 3,
									marginBottom: 3,
								}}
							/>
						}
						activeDot={
							<View
								style={{
									backgroundColor: '#FFF',
									width: 8,
									height: 8,
									borderRadius: 4,
									marginLeft: 3,
									marginRight: 3,
									marginTop: 3,
									marginBottom: 3,
								}}
							/>
						}>
						{this.props.bannerItems.map((banner, index) => {
							const imageURI =
								typeof banner.image != 'undefined'
									? getProductImage(banner.image, Styles.width)
									: Images.PlaceHolderURL;

							return (
								<TouchableOpacity
									activeOpacity={0.9}
									style={style.imageBannerPanel}
									key={index}
									onPress={() => this.handlePress(banner)}>
									<ImageCache
										uri={imageURI}
										style={style.imageBanner}
										// resizeMode="contain"
									/>
								</TouchableOpacity>
							);
						})}
					</Swiper>
				</Placeholder.ImageContent>
			</View>
		);
	}
}

const mapStateToProps = ({ banners, categories }) => ({
	bannerItems: banners.bannerItems,
	finish: banners.finish,
	singleCategory: categories.singleCategory,
});

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { dispatch } = dispatchProps;
	const BannerRedux = require('@redux/BannerRedux');

	return {
		...ownProps,
		...stateProps,
		fetchBanners: () => BannerRedux.actions.fetchAppBanners(dispatch),
	};
}

export default connect(
	mapStateToProps,
	undefined,
	mergeProps
)(AppBanner);
