/** @format */

import React, { PureComponent } from 'react';
import {
	Animated,
	ScrollView,
	View,
	ListView,
	TouchableOpacity,
	Text,
} from 'react-native';
import { connect } from 'react-redux';
import { Button, ProductItem } from '@components';
import { SwipeRow } from 'react-native-swipe-list-view';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Constants, Config, Languages } from '@common';
import WishListEmpty from './Empty';
import styles from './styles';

class WishList extends PureComponent {
	constructor(props) {
		super(props);

		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2,
		});
		this.state = {
			dataSource: ds.cloneWithRows(props.wishListItems),
			scrollY: new Animated.Value(0),
		};
	}

	componentDidMount() {
		// console.log("wishListItems WishList Screen: ",this.props.wishListItems);
	}

	onNext = () => {
		this.setState({ currentIndex: this.state.currentIndex + 1 });
	};

	renderHiddenRow(rowData) {
		return (
			<TouchableOpacity
				style={styles.hiddenRow}
				onPress={() => {
					this.props.removeWishListItem(rowData.product, rowData.variation);
				}}>
				<View style={{ marginRight: 23 }}>
					<FontAwesome name="trash" size={30} color="white" />
				</View>
			</TouchableOpacity>
		);
	}

	moveAllToCart = async () => {
		if (this.props.wishListItems.length === 0) alert(Languages.EmptyAddToCart);
		else {
			if (this.props.token === null) {
				this.props.onMustLogin();
			} else {
				this.props.emptyCart();
				this.props.addCartItemsBatch(
					this.props.wishListItems,
					this.props.token
				);
				this.cleanAll();
				this.props.navigation.navigate('CartScreen');
			}
		}
	};

	cleanAll = () => {
		const self = this;
		this.props.wishListItems.forEach(currentValue => {
			self.props.removeWishListItem(
				currentValue.product,
				currentValue.variation
			);
		});
	};

	render() {
		const { wishListItems, onViewProduct } = this.props;
		// const titleTransformY = this.state.scrollY.interpolate({
		// 	inputRange: [0, 50],
		// 	outputRange: [0, -43],
		// 	extrapolate: 'clamp',
		// });

		if (wishListItems.length == 0) {
			return <WishListEmpty onViewHome={this.props.onViewHome} />;
		}
		return (
			<View style={styles.container}>
				{/* <AnimatedHeader
					scrollY={this.state.scrollY}
					label={Languages.WishList}
				/> */}

				{/* <Animated.Text
					style={[
						styles.value,
						{ transform: [{ translateY: titleTransformY }] },
					]}>
					{wishListItems.length}{" "}
					{wishListItems.length > 1 ? Languages.Items : Languages.Item}
				</Animated.Text> */}
				<Text style={styles.value}>
					{wishListItems.length}{' '}
					{wishListItems.length > 1 ? Languages.Items : Languages.Item}
				</Text>

				<ScrollView
					style={styles.scrollView}
					scrollEventThrottle={1}
					onScroll={Animated.event([
						{ nativeEvent: { contentOffset: { y: this.state.scrollY } } },
					])}>
					<View style={styles.list}>
						{wishListItems &&
							wishListItems.map((item, index) => (
								<SwipeRow
									key={`wishlist${index}`}
									disableRightSwipe
									leftOpenValue={75}
									rightOpenValue={-75}>
									{this.renderHiddenRow(item, index)}
									<ProductItem
										key={index}
										product={item.product}
										onPress={() => onViewProduct({ product: item.product })}
										variation={item.product.variation}
									/>
								</SwipeRow>
							))}
					</View>
				</ScrollView>

				<View style={styles.bottomView}>
					<Button
						text={Languages.CleanAll}
						// style={[styles.button, { backgroundColor: "#ff1744" }]}
						style={styles.btnClean}
						textStyle={styles.btnCleanText}
						onPress={this.cleanAll}
					/>
					<Button
						text={Languages.MoveAllToCart}
						style={styles.btnCart}
						textStyle={styles.btnCartText}
						onPress={this.moveAllToCart}
					/>
				</View>
			</View>
		);
	}
}

const mapStateToProps = state => {
	return {
		wishListItems: state.wishList.wishListItems,
		cartItems: state.carts.cartItems,
		token: state.user.token,
	};
};

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { dispatch } = dispatchProps;
	const CartRedux = require('./../../redux/CartRedux');
	const WishListRedux = require('./../../redux/WishListRedux');
	return {
		...ownProps,
		...stateProps,
		addCartItem: (productID, variationID, token) => {
			CartRedux.actions.addCartItem(dispatch, productID, variationID, token);
		},
		addCartItemsBatch: (items, token) => {
			CartRedux.actions.addCartItemsBatch(dispatch, items, token);
		},
		deleteCart: token => {
			CartRedux.actions.deleteCart(dispatch, token);
		},
		emptyCart: () => {
			CartRedux.actions.emptyCart(dispatch);
		},
		removeWishListItem: (product, variation) => {
			WishListRedux.actions.removeWishListItem(dispatch, product, variation);
		},
	};
}

export default connect(
	mapStateToProps,
	undefined,
	mergeProps
)(WishList);
