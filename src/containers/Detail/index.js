/** @format */

import React, { PureComponent, Component } from "react";
import PropTypes from "prop-types";
import {
	Text,
	TouchableOpacity,
	ScrollView,
	View,
	Animated,
	Image,
	Share,
	Dimensions,
} from "react-native";
import { connect } from "react-redux";
import {
	Timer,
	getProductImage,
	currencyFormatter,
} from "@app/Omni";
import {
	Button,
	Rating,
	WishListIcon
} from "@components";
import Swiper from "react-native-swiper";
import {
	Styles,
	Languages,
	Color,
	Constants,
	Events,
} from "@common";
import Modal from "react-native-modalbox";
import { find, filter } from "lodash";
import PopOver from "./PopOver";
import styles from "./ProductDetail_Style";

// weDevs
import striptags from 'striptags';
import ProductDetailsAccordion from "./ProductDetailsAccordion";
import EventEmitter from "@services/AppEventEmitter";

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
	};

	constructor(props) {
		super(props);

		this.state = {
			scrollY: new Animated.Value(0),
			tabIndex: 0,
			selectedAttribute: [],
			selectedColor: 0,
			selectVariation: null,
			selectedItems : [],
			activeSections: [],
			showPopover : false
		};

		this.productInfoHeight = PRODUCT_IMAGE_HEIGHT;
		this.inCartTotal = 0;
		this.isInWishList = false;
	}

	componentDidMount() {
		this.getCartTotal(this.props);
		this.getWishList(this.props);
		this.props.getProductVariations(this.props.product);
		this.props.getRelatedProducts(this.props.product.id);
		this.getProductAttribute(this.props.product);

		EventEmitter.addListener("popover.toggle", this.popoverEventHandler.bind(this));
	}

	componentWillReceiveProps(nextProps) {
		this.getCartTotal(nextProps, true);
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
		EventEmitter.removeListener("popover.toggle");
	}

	getProductAttribute = (product) => {
		this.productAttributes = product.attributes;
		const defaultAttribute = product.default_attributes;
		
		if (typeof this.productAttributes !== "undefined") {
			this.productAttributes.map((attribute) => {
				const selectedAttribute = defaultAttribute.find(
					(item) => item.name === attribute.name
				);
				attribute.selectedOption =
					typeof selectedAttribute !== "undefined"
						? selectedAttribute.option.toLowerCase()
						: "";
			});
		}
	};

	closePhoto = () => {
		this._modalPhoto.close();
	};

	openPhoto = () => {
		this._modalPhoto.open();
	};

	handleClickTab(tabIndex) {
		this.setState({ tabIndex });
		Timer.setTimeout(() => this.state.scrollY.setValue(0), 50);
	}

	getColor = (value) => {
		const color = value.toLowerCase();
		if (typeof Color.attributes[color] !== "undefined") {
			return Color.attributes[color];
		}
		return "#333";
	};

	share = () => {
		this.setState({
			showPopover: !this.state.showPopover
		})
		Share.share({
			message: this.props.product.description.replace(/(<([^>]+)>)/gi, ""),
			url: this.props.product.permalink,
			title: this.props.product.name,
		});
	};

	addToCart = (go = false) => {
		const { addCartItem, product, onViewCart } = this.props;

		if (this.inCartTotal < Constants.LimitAddToCart) {
			addCartItem(product, this.state.selectVariation);
		} else {
			alert(Languages.ProductLimitWaring);
		}
		if (go) onViewCart();
	};

	addToWishList = (isAddWishList) => {
		if (isAddWishList) {
			this.props.removeWishListItem(this.props.product);
		} else this.props.addWishListItem(this.props.product);
	};

	getCartTotal = (props, check = false) => {
		const { cartItems } = props;

		if (cartItems != null) {
			if (check === true && props.cartItems === this.props.cartItems) {
				return;
			}

			this.inCartTotal = cartItems.reduce((accumulator, currentValue) => {
				if (currentValue.product.id == this.props.product.id) {
					return accumulator + currentValue.quantity;
				}
				return 0;
			}, 0);

			const sum = cartItems.reduce(
				(accumulator, currentValue) => accumulator + currentValue.quantity,
				0
			);
			const params = this.props.navigation.state.params;
			params.cartTotal = sum;
			this.props.navigation.setParams(params);
		}
	};

	getWishList = (props, check = false) => {
		const { product, navigation, wishListItems } = props;

		if (props.hasOwnProperty("wishListItems")) {
			if (check == true && props.wishListItems == this.props.wishListItems) {
				return;
			}
			this.isInWishList =
				find(props.wishListItems, (item) => item.product.id == product.id) !=
				"undefined";

			const sum = wishListItems.length;
			const params = navigation.state.params;
			params.wistListTotal = sum;
			this.props.navigation.setParams(params);
		}
	};

	onSelectAttribute = (attributeName, option) => {
		const selectedAttribute = this.productAttributes.find(
			(item) => item.name === attributeName
		);
		selectedAttribute.selectedOption = option.toLowerCase();

		this.updateSelectedVariant(this.props.productVariations);
	};

	updateSelectedVariant = (productVariations) => {
		const selectedAttribute = filter(
			this.productAttributes,
			(item) => typeof item.selectedOption !== "undefined"
		);

		// if (productVariations) {
		productVariations &&
			productVariations.map((variant) => {
				let matchCount = 0;
				selectedAttribute.map((selectAttribute) => {
					const isMatch = find(
						variant.attributes,
						(item) =>
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
			showPopover: !this.state.showPopover
		})
	}

	/**
	 * render Image top
	 */
	_renderImages = () => {
		const imageScale = this.state.scrollY.interpolate({
			inputRange: [-300, 0, NAVI_HEIGHT, this.productInfoHeight / 2],
			outputRange: [2, 1, 1, 0.7],
			extrapolate: "clamp",
		});
		const { width } = Dimensions.get('window');
		const scrollX = new Animated.Value(0);
		let position = Animated.divide(scrollX, width);
		
		return (
			<View style={{ height: PRODUCT_IMAGE_HEIGHT, width: Constants.Window.width }}>
				<ScrollView
					style={{ height: PRODUCT_IMAGE_HEIGHT, width: Constants.Window.width }}
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					horizontal
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { x: scrollX } } }]
					)}
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
				<View
					style={{ flexDirection: "row", justifyContent: "center" }} >
					{
						this.props.product.images.map((_, i) => {
							let opacity = position.interpolate({
								inputRange: [i - 1, i, i + 1],
								outputRange: [0.3, 1, 0.3],
								extrapolate: 'clamp'
							});
							let bgColor = position.interpolate({
								inputRange: [0, 1],
								outputRange: ["#C8CCD5", "red"]
							})

							return (
								<Animated.View
									key={i}
									style={
										{
											opacity,
											height: 8,
											width: 8,
											backgroundColor: bgColor,
											margin: 4,
											borderRadius: 4
										}
									}
								/>
							);
						})
					}
				</View>
				
				<WishListIcon
					style={{
						top: PRODUCT_IMAGE_HEIGHT - 25,
						right: Constants.Window.width - 40
					}}
					width={25}
					height={25}
					product={this.props.product} />
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
		const { wishListItems, cartItems, product } = this.props;
		const isAddWishList =
			wishListItems.filter((item) => item.product.id === product.id).length > 0;
		const isAddToCart = !!(
			cartItems &&
			cartItems.filter((item) => item.product.id === product.id).length > 0
		);
		
		return (
			<View
			style={[
				styles.bottomView,
				Constants.RTL && { flexDirection: "row-reverse" },
			]}>
				<View style={styles.buttonContainer}>
					<Button
						type="image"
						source={require("@images/icons/icon-share.png")}
						imageStyle={styles.imageButton}
						buttonStyle={styles.buttonStyle}
						onPress={this.share}
					/>
					<Button
						type="image"
						isAddWishList={isAddWishList}
						source={require("@images/icons/icon-love.png")}
						imageStyle={styles.imageButton}
						buttonStyle={styles.buttonStyle}
						onPress={() => this.addToWishList(isAddWishList)}
					/>
					<Button
						type="image"
						isAddToCart={isAddToCart}
						source={require("@images/icons/icon-cart.png")}
						imageStyle={styles.imageButton}
						disabled={!this.props.product.in_stock}
						buttonStyle={styles.buttonStyle}
						onPress={() => this.props.product.in_stock && this.addToCart(true)}
					/>
				</View>

				<Button
					text={this.props.product.in_stock ? Languages.BUYNOW : Languages.OutOfStock}
					style={[styles.btnBuy, !this.props.product.in_stock && styles.outOfStock]}
					textStyle={styles.btnBuyText}
					disabled={!this.props.product.in_stock}
					onPress={() => {
						this.props.product.in_stock && this.addToCart(true);
					}}
				/>
			</View>
		)
	};

	//weDevs
	renderVendorInfo = () => {
		const vendorName = this.props.product.store? this.props.product.store.name : ""
		const vendorInitial = vendorName.charAt(0);
		if (vendorName) {
			return (
				<View style={styles.topVendorInfoContainer}>
					<View style={styles.topVendorNameInitials}>
						<Text style={{color: "white"}}>
							{vendorInitial}
						</Text>
					</View>
					<View style={{marginLeft: 15}}>
						<Text style={{color: Color.wdDeepGray}}>
							{vendorName}
						</Text>
					</View>
				</View>
			)
		} else {
			return (
				<View style={styles.topVendorInfoContainer}>
					<Text style={{ color: Color.wdDeepGray}}>Vendor Info Not found</Text>
				</View>
			)
		}
	};

	renderProductDetails = () => {
		const { product } = this.props;
		const { selectVariation } = this.state;

		const productDescription = striptags(product.short_description);
		const isOnSale = selectVariation
			? selectVariation.on_sale
			: product.on_sale;
		const productRegularPrice = currencyFormatter(
			selectVariation ? selectVariation.regular_price : product.regular_price
		);
		const productPrice = currencyFormatter(
			selectVariation ? selectVariation.price : product.price
		);

		return(
			<View style={styles.productDetailContainer}>
				<Text style={styles.productName}>{product.name}</Text>
				<Rating rating={Number(product.average_rating)} size={15} />
				<View style={styles.productMetaContainer}>
					<View style={styles.productPriceContainer}>
						{isOnSale && (
							<Text style={styles.sale_price}>
								{productRegularPrice}
							</Text>
						)}
						<Text style={styles.productPrice}>
							{productPrice}
						</Text>
					</View>
					<View style={styles.productBadgeContainer}>
						<View style={styles.productBadge}>
							<Text style={styles.productBadgeNumber}>86</Text>
							<Text style={styles.productBadgeText}>Order</Text>
						</View>
						<View style={styles.productBadge}>
							<Text style={styles.productBadgeNumber}>130</Text>
							<Text style={styles.productBadgeText}>Wishlist</Text>
						</View>
					</View>
				</View>
				<Text style={styles.productDescription}>
					{productDescription}
				</Text>
				<ProductDetailsAccordion
					product={this.props.product}
					relatedProducts={this.props.relatedProducts}
					onLogin={this.props.onLogin}
					navigation={this.props.navigation} />
			</View>
		)
	};

	render() {
		const { product } = this.props;

		return (
			<View style={styles.container}>
				{this.state.showPopover && <PopOver share={this.share} />}
				<Animated.ScrollView
					style={styles.listContainer}
					scrollEventThrottle={1}
					onScroll={(event) => {
						this.state.scrollY.setValue(event.nativeEvent.contentOffset.y);
					}}>
					<View
						style={[styles.productInfo]}
						onLayout={(event) =>
							(this.productInfoHeight = event.nativeEvent.layout.height)
						}>
						{this.renderVendorInfo()}
						{this._renderImages()}
					</View>

					{this.renderProductDetails()}
				</Animated.ScrollView>

				{this.renderButtons()}

				<Modal
					ref={(com) => (this._modalPhoto = com)}
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

const mapStateToProps = (state) => {
	return {
		cartItems: state.carts.cartItems,
		wishListItems: state.wishList.wishListItems,
		productVariations: state.products.productVariations,
		userData: state.user.user,
		relatedProducts: state.products.relatedProducts
	};
};

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { dispatch } = dispatchProps;
	const CartRedux = require("@redux/CartRedux");
	const WishListRedux = require("@redux/WishListRedux");
	const ProductRedux = require("@redux/ProductRedux");
	return {
		...ownProps,
		...stateProps,
		addCartItem: (product, variation) => {
			CartRedux.actions.addCartItem(dispatch, product, variation);
		},
		addWishListItem: (product) => {
			WishListRedux.actions.addWishListItem(dispatch, product);
		},
		removeWishListItem: (product) => {
			WishListRedux.actions.removeWishListItem(dispatch, product);
		},
		getProductVariations: (product) => {
			ProductRedux.actions.getProductVariations(dispatch, product);
		},
		getRelatedProducts: (productID) => {
			ProductRedux.actions.fetchRelatedProducts(dispatch, productID);
		}
	};
}

export default connect(
	mapStateToProps,
	undefined,
	mergeProps
)(Detail);
