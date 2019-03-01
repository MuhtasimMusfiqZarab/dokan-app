/** @format */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	Text,
	TouchableOpacity,
	ScrollView,
	View,
	Animated,
	Image,
	Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import Share from 'react-native-share';
import { Timer, getProductImage } from '@app/Omni';
import { Button, WishListIcon, Spinner } from '@components';
import Swiper from 'react-native-swiper';
import { Styles, Languages, Color, Constants, Events } from '@common';
import Modal from 'react-native-modalbox';
import { find, filter } from 'lodash';
import PopOver from './PopOver';
import styles from './ProductDetail_Style';
import VendorSummary from './VendorSummary';
import ProductDetails from './ProductDetails';
import EventEmitter from '@services/AppEventEmitter';
import DokanWorker from '@services/Dokan/DokanWorker';

const PRODUCT_IMAGE_HEIGHT = 350;
const NAVI_HEIGHT = 64;

class Detail extends PureComponent {
	static propTypes = {
		product: PropTypes.any,
		getProductVariations: PropTypes.func,
		productVariations: PropTypes.any,
		onViewCart: PropTypes.func,
		addCartItem: PropTypes.func,
		removeWishListItem: PropTypes.func,
		addWishListItem: PropTypes.func,
		cartItems: PropTypes.any,
		navigation: PropTypes.object,
		getRelatedProducts: PropTypes.func,
		onLogin: PropTypes.func,
		userData: PropTypes.any,
		wishListItems: PropTypes.any,
		relatedProducts: PropTypes.any,
		onViewVendorProfileScreen: PropTypes.any,
		fetchVendorProducts: PropTypes.any,
		bearerToken: PropTypes.string,
	};

	constructor(props) {
		super(props);

		this.state = {
			scrollY: new Animated.Value(0),
			tabIndex: 0,
			selectedAttribute: [],
			selectedColor: 0,
			selectVariation: null,
			selectedItems: [],
			activeSections: [],
			showPopover: false,
			isSpinner: false,
		};

		this.productInfoHeight = PRODUCT_IMAGE_HEIGHT;
		this.inCartTotal = 0;
		this.isInWishList = false;
		this.buyNowBtnStyle = [styles.btnBuy];
		this.disableAddCartBtn = false;
		this.disableBuyNowBtn = false;

		// set Buy Now btn color
		if (this.props.product.stock_status) {
			if (this.props.product.stock_status === 'outofstock') {
				this.buyNowBtnStyle = [...this.buyNowBtnStyle, styles.outOfStock];
				this.disableAddCartBtn = true;
				this.disableBuyNowBtn = true;
			}
		} else {
			if (!this.props.product.in_stock) {
				this.buyNowBtnStyle = [...this.buyNowBtnStyle, styles.outOfStock];
				this.disableAddCartBtn = true;
				this.disableBuyNowBtn = true;
			}
		}
	}

	componentDidMount() {
		// this.getCartTotal(this.props);
		this.getWishList(this.props);
		this.props.getProductVariations(this.props.product);
		this.props.getRelatedProducts(this.props.product.id);
		this.getProductAttribute(this.props.product);

		EventEmitter.addListener(
			'popover.toggle',
			this.popoverEventHandler.bind(this)
		);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		// this.getCartTotal(nextProps, true);
		this.getWishList(nextProps, true);
		// this important to update the variations from the product as the Life cycle is not run again !!!
		if (this.props.product.id != nextProps.product.id) {
			this.props.getProductVariations(nextProps.product);
			this.getProductAttribute(nextProps.product);
			this.forceUpdate();
		}

		if (this.props.productVariations !== nextProps.productVariations) {
			this.updateSelectedVariant(nextProps.productVariations);
		}
	}

	componentWillUnmount() {
		EventEmitter.removeListener('popover.toggle');
	}

	getProductAttribute = product => {
		this.productAttributes = product.attributes;
		const defaultAttribute = product.default_attributes;

		if (typeof this.productAttributes !== 'undefined') {
			this.productAttributes.map(attribute => {
				const selectedAttribute = defaultAttribute.find(
					item => item.name === attribute.name
				);
				attribute.selectedOption =
					typeof selectedAttribute !== 'undefined'
						? selectedAttribute.option.toLowerCase()
						: '';
			});
		}
	};

	closePhoto = () => {
		this._modalPhoto.close();
	};

	openPhoto = () => {
		if (this.state.showPopover) {
			this.setState({
				showPopover: !this.state.showPopover,
			});
		}
		this._modalPhoto.open();
	};

	handleClickTab(tabIndex) {
		this.setState({ tabIndex });
		Timer.setTimeout(() => this.state.scrollY.setValue(0), 50);
	}

	getColor = value => {
		const color = value.toLowerCase();
		if (typeof Color.attributes[color] !== 'undefined') {
			return Color.attributes[color];
		}
		return '#333';
	};

	share = () => {
		this.setState({
			showPopover: !this.state.showPopover,
		});
		Share.open({
			// message: this.props.product.description.replace(/(<([^>]+)>)/gi, ""),
			url: this.props.product.permalink,
			title: this.props.product.name,
		});
	};

	addToCart = async (go = false) => {
		const {
			addCartItem,
			product,
			onViewCart,
			userData,
			bearerToken,
			onLogin,
		} = this.props;

		if (userData) {
			if (this.inCartTotal < Constants.LimitAddToCart) {
				addCartItem(product, this.state.selectVariation, bearerToken);
			} else {
				alert(Languages.ProductLimitWaring);
			}
			if (go) onViewCart();
		} else {
			onLogin();
		}
	};

	addToWishList = isAddWishList => {
		if (isAddWishList) {
			this.props.removeWishListItem(this.props.product);
		} else this.props.addWishListItem(this.props.product);
	};

	getWishList = (props, check = false) => {
		const { product, navigation, wishListItems } = props;

		if (props.hasOwnProperty('wishListItems')) {
			if (check == true && props.wishListItems == this.props.wishListItems) {
				return;
			}
			this.isInWishList =
				find(props.wishListItems, item => item.product.id == product.id) !=
				'undefined';

			const sum = wishListItems.length;
			const params = navigation.state.params;
			params.wistListTotal = sum;
			this.props.navigation.setParams(params);
		}
	};

	onSelectAttribute = (attributeName, option) => {
		const selectedAttribute = this.productAttributes.find(
			item => item.name === attributeName
		);
		selectedAttribute.selectedOption = option.toLowerCase();

		this.updateSelectedVariant(this.props.productVariations);
	};

	updateSelectedVariant = productVariations => {
		const selectedAttribute = filter(
			this.productAttributes,
			item => typeof item.selectedOption !== 'undefined'
		);

		// if (productVariations) {
		productVariations &&
			productVariations.map(variant => {
				let matchCount = 0;
				selectedAttribute.map(selectAttribute => {
					const isMatch = find(
						variant.attributes,
						item =>
							item.name === selectAttribute.name &&
							item.option.toLowerCase() ===
								selectAttribute.selectedOption.toLowerCase()
					);
					if (isMatch !== undefined) {
						matchCount += 1;
					}
				});
				if (matchCount === selectedAttribute.length) {
					this.setState({ selectVariation: variant });
				}
			});
		// }
		this.forceUpdate();
	};

	popoverEventHandler = () => {
		this.setState({
			showPopover: !this.state.showPopover,
		});
	};

	/**
	 * render Image top
	 */
	_renderImages = () => {
		const imageScale = this.state.scrollY.interpolate({
			inputRange: [-300, 0, NAVI_HEIGHT, this.productInfoHeight / 2],
			outputRange: [2, 1, 1, 0.7],
			extrapolate: 'clamp',
		});
		const { width } = Dimensions.get('window');
		const scrollX = new Animated.Value(0);
		let position = Animated.divide(scrollX, width);

		return (
			<View
				style={{ height: PRODUCT_IMAGE_HEIGHT, width: Constants.Window.width }}>
				<ScrollView
					style={{
						height: PRODUCT_IMAGE_HEIGHT,
						width: Constants.Window.width,
					}}
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					horizontal
					onScroll={Animated.event([
						{ nativeEvent: { contentOffset: { x: scrollX } } },
					])}
					scrollEventThrottle={16}>
					{this.props.product.images.map((image, index) => (
						<TouchableOpacity
							activeOpacity={0.9}
							key={index}
							onPress={this.openPhoto.bind(this)}>
							<Animated.Image
								source={{ uri: getProductImage(image.src, Styles.width) }}
								style={[
									styles.imageProduct,
									{ transform: [{ scale: imageScale }] },
								]}
								resizeMode="contain"
							/>
						</TouchableOpacity>
					))}
				</ScrollView>
				<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
					{this.props.product.images.map((_, i) => {
						let opacity = position.interpolate({
							inputRange: [i - 1, i, i + 1],
							outputRange: [0.3, 1, 0.3],
							extrapolate: 'clamp',
						});
						let bgColor = position.interpolate({
							inputRange: [0, 1],
							outputRange: ['#C8CCD5', 'red'],
						});

						return (
							<Animated.View
								key={i}
								style={{
									opacity,
									height: 8,
									width: 8,
									backgroundColor: bgColor,
									margin: 4,
									borderRadius: 4,
								}}
							/>
						);
					})}
				</View>

				<WishListIcon
					style={{
						top: PRODUCT_IMAGE_HEIGHT - 30,
						right: Constants.Window.width - 40,
					}}
					width={25}
					height={25}
					iconSize={22}
					product={this.props.product}
				/>
			</View>
		);
	};

	_writeReview = () => {
		const { product, userData, onLogin } = this.props;
		if (userData) {
			Events.openModalReview(product);
		} else {
			onLogin();
		}
	};

	renderButtons = () => {
		const { cartItems, product } = this.props;

		// const isAddWishList =
		// 	wishListItems.filter(item => item.product.id === product.id).length > 0;
		// const isAddToCart = !!(
		// 	cartItems &&
		// 	cartItems.filter(item => item.product.id === product.id).length > 0
		// );

		return (
			<View
				style={[
					styles.bottomView,
					Constants.RTL && { flexDirection: 'row-reverse' },
				]}>
				<Button
					type="text"
					text="ADD CART"
					icon="cart"
					iconStyle={{ marginRight: 5, color: '#D2DBE0' }}
					// isAddToCart={isAddToCart}
					textStyle={styles.butnCartText}
					// disabled={!this.props.product.in_stock || this.props.product.stock_status === "outofstock"}
					disabled={this.disableAddCartBtn}
					style={styles.buttonContainer}
					onPress={() => {
						if (this.props.product.stock_status) {
							if (this.props.product.stock_status == 'instock') {
								this.addToCart();
							}
						} else {
							if (this.props.product.in_stock) {
								this.addToCart();
							}
						}
					}}
				/>
				<Button
					text={
						this.props.product.in_stock ||
						this.props.product.stock_status === 'instock'
							? Languages.BUYNOW
							: Languages.OutOfStock
					}
					style={this.buyNowBtnStyle}
					textStyle={styles.btnBuyText}
					// disabled={!this.props.product.in_stock || this.props.product.stock_status === "outofstock"}
					disabled={this.disableBuyNowBtn}
					onPress={() => {
						if (this.props.product.stock_status) {
							if (this.props.product.stock_status == 'instock') {
								this.addToCart(true);
							}
						} else {
							if (this.props.product.in_stock) {
								this.addToCart(true);
							}
						}
					}}
				/>
			</View>
		);
	};

	onTapParentView = () => {
		if (this.state.showPopover) {
			this.setState({ showPopover: false });
		}
	};

	viewVendorFromProductDetail = async vendorID => {
		this.setState({ isSpinner: true });
		const vendor = await DokanWorker.getSingleVendor(vendorID);
		console.log(vendor);
		this.props.fetchVendorProducts(vendorID);
		this.setState({ isSpinner: false });
		this.props.onViewVendorProfileScreen(vendor);
	};

	render() {
		const { product, relatedProducts, onLogin, navigation } = this.props;
		console.log(product);
		return (
			<View
				style={styles.container}
				onStartShouldSetResponder={() => true}
				onResponderRelease={() => this.onTapParentView()}>
				{this.state.showPopover && (
					<PopOver share={this.share} openPhoto={this.openPhoto.bind(this)} />
				)}
				<Animated.ScrollView
					style={styles.listContainer}
					scrollEventThrottle={1}
					onScroll={event => {
						this.state.scrollY.setValue(event.nativeEvent.contentOffset.y);
					}}>
					<View
						style={[styles.productInfo]}
						onLayout={event =>
							(this.productInfoHeight = event.nativeEvent.layout.height)
						}>
						<VendorSummary
							store={
								this.props.product.store
									? this.props.product.store
									: this.props.product.vendor
							}
							viewVendorFromProductDetail={this.viewVendorFromProductDetail}
						/>
						{this._renderImages()}
					</View>
					<ProductDetails
						product={product}
						relatedProducts={relatedProducts}
						onLogin={onLogin}
						navigation={navigation}
						selectVariation={this.state.selectVariation}
					/>
				</Animated.ScrollView>

				{this.renderButtons()}

				{this.state.isSpinner ? (
					<Spinner mode="overlay" color="#000" backgroundColor="#fff" />
				) : null}

				<Modal
					ref={com => (this._modalPhoto = com)}
					swipeToClose={false}
					animationDuration={200}
					style={styles.modalBoxWrap}>
					<Swiper
						height={Constants.Window.height}
						activeDotStyle={styles.dotActive}
						removeClippedSubviews={false}
						dotStyle={styles.dot}
						paginationStyle={{ zIndex: 9999, bottom: -15 }}>
						{product.images.map((image, index) => (
							<Image
								key={index}
								source={{ uri: getProductImage(image.src, Styles.width) }}
								style={styles.imageProductFull}
							/>
						))}
					</Swiper>

					<TouchableOpacity
						style={styles.iconZoom}
						onPress={this.closePhoto.bind(this)}>
						<Text style={styles.textClose}>{Languages.close}</Text>
					</TouchableOpacity>
				</Modal>
			</View>
		);
	}
}

const mapStateToProps = state => {
	return {
		cartItems: state.carts.cartItems,
		wishListItems: state.wishList.wishListItems,
		productVariations: state.products.productVariations,
		userData: state.user.user,
		bearerToken: state.user.token,
		relatedProducts: state.products.relatedProducts,
	};
};

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { dispatch } = dispatchProps;
	const CartRedux = require('@redux/CartRedux');
	const WishListRedux = require('@redux/WishListRedux');
	const ProductRedux = require('@redux/ProductRedux');
	const VendorRedux = require('@redux/VendorRedux');

	return {
		...ownProps,
		...stateProps,
		addCartItem: (product, variation, token) => {
			CartRedux.actions.addCartItem(dispatch, product, variation, token);
		},
		addWishListItem: product => {
			WishListRedux.actions.addWishListItem(dispatch, product);
		},
		removeWishListItem: product => {
			WishListRedux.actions.removeWishListItem(dispatch, product);
		},
		getProductVariations: product => {
			ProductRedux.actions.getProductVariations(dispatch, product);
		},
		getRelatedProducts: productID => {
			ProductRedux.actions.fetchRelatedProducts(dispatch, productID);
		},
		fetchVendorProducts: vendorID => {
			VendorRedux.actions.fetchVendorProducts(dispatch, vendorID);
		},
	};
}

export default connect(
	mapStateToProps,
	undefined,
	mergeProps
)(Detail);
