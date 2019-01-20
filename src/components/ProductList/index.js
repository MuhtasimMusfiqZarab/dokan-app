/** @format */

import React, { Component } from "react";
import {
	FlatList,
	Image,
	Platform,
	RefreshControl,
	Animated,
	View,
	TouchableOpacity,
	Text
} from "react-native";
import {
	PostLayout,
	AnimatedHeader,
	Spinkit,
	WdProductListToolBar,
	WdModalSorting,
} from "@components";
import { Constants, Languages } from "@common";
import { connect } from "react-redux";
import styles from "./styles";

// const HEADER_MIN_HEIGHT = 40;
// const HEADER_SCROLL_DISTANCE =
//   Constants.Window.headerHeight - HEADER_MIN_HEIGHT;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class ProductList extends Component {
	state = {
		scrollY: new Animated.Value(0),
		isFooterFetching: false
	};

	constructor(props) {
		super(props);

		this.page = props.page ? props.page : 0;
		this.limit = Constants.pagingLimit;
		this.isProductList = props.type === undefined;
		this.key=1;

		if(!this.props.vendorID) {
			if (this.props.config.name === "featuredProducts") {
				this.props.navigation.setParams({ title: "Featured Products" });
			} else if (this.props.config.name === "bestSellingProducts") {
				this.props.navigation.setParams({ title: "Best Selling Producst" });
			} else if (this.props.config.name === "topRatedProducts") {
				this.props.navigation.setParams({ title: "Top Rated Products" });
			} else {
				this.props.navigation.setParams({ title: "Product List" });
			}	
		}

		// this.props.navigation.setParams({ title: "Product List" });
	}

	componentDidMount() {
		if (
			!this.props.vendorID &&
			this.props.config.name &&
			this.props.config.name === "allProducts"
		) {
			this.props.fetchAllProducts(20, this.page);
		}

		if (
			!this.props.vendorID &&
			this.props.config.name &&
			this.props.config.name === "newArrival"
		) {
			this.props.fetchNewArrivals(this.page);
		}

		this.page === 0 && this.fetchData();
	}

	componentWillReceiveProps(nexprops) {
		nexprops.layoutProductScreen !== this.props.layoutProductScreen ?
			this.key = this.key + 1 : 1;
	}

	shouldComponentUpdate(nextProps, nextState) {
		return(
			nextProps.layoutProductScreen !== this.props.layoutProductScreen ||
			nextProps.list !== this.props.list ||
			nextState.isFooterFetching !== this.state.isFooterFetching
		)
	}

	fetchData = (reload = false) => {
		if (this.props.vendorID)
			return;

		const {
			config,
			index,
			message,
			fetchAllProducts,
			fetchProductsByCollections,
			sortByRating,
			sortByDate,
			sortByPriceDesc,
			sortByPriceAsc
		} = this.props;

		if (reload) {
			this.page = 1;
		}

		if(config.name === "allProducts") {
			if(message) {
				if(message === "sortRating") {
					sortByRating(10, this.page, "desc", "rating")
				} else if(message === "sortByDate") {
					sortByDate(10, this.page, "desc", "rating");
				} else if (message === "sortPriceDesc") {
					sortByPriceDesc(10, this.page, "desc", "price");
				} else if (message === "sortPriceAsc") {
					sortByPriceAsc(10, this.page, "asc", "price");
				} else {
					return false;
				}
			} else {
				fetchAllProducts(20, this.page);
			}
		} else if(config.name === "newArrival") {
			this.props.fetchNewArrivals(this.page);
		} else {
			fetchProductsByCollections(config.category, config.tag, this.page, index, config.name);
		}
	};

	handleLoadMore = () => {
		console.log(this.props.finish);
		if (!this.props.finish) {
			this.setState({
				isFooterFetching: true
			})
			this.page += 1;
			this.fetchData();
		} else {
			this.setState({
				isFooterFetching: false
			})
			this.page = 1;
		}
	};

	onRowClickHandle = (item) => {
		if (this.isProductList) {
			this.props.onViewProductScreen({ product: item });
		} else {
			this.props.onViewNewsScreen({ post: item });
		}
	};

	renderItem = ({ item, index }) => {
		if (item == null) return <View />;

		return (
			<PostLayout
				post={item}
				type={this.props.type}
				key={`key-${index}`}
				onViewPost={() => this.onRowClickHandle(item, this.props.type)}
				onViewVendor={this.props.onViewVendorScreen}
				layout={
					this.props.vendorID ? 3 : this.props.layoutProductScreen
				}
				isVendorProduct={this.props.vendorID ? true : false}
			/>
		);
	};

	headerComponent = () => {
		const { headerImage } = this.props;

		return (
			<View style={styles.headerView}>
				{headerImage && (
					<Image style={styles.bannerImage} source={headerImage} />
				)}
			</View>
		);
	};

	render() {
		const { list, config, isFetching, layoutProductScreen, navigation } = this.props;
		const renderFooter = () => this.state.isFooterFetching ? <Spinkit /> : "";
		const showModalSorting = 
			config ? config.name === "allProducts" ? true : false : false;
console.log(this.props);

		return (
			<View style={styles.listView}>
				{this.props.showToolBar && <WdProductListToolBar showSorting={showModalSorting} />}
				<AnimatedFlatList
					key={this.key}
					contentContainerStyle={styles.flatlist}
					numColumns={layoutProductScreen == 2 ? 2 : 1}
					data={list}
					keyExtractor={(item, index) => `${item.id} || ${index}`}
					renderItem={this.renderItem}
					ListHeaderComponent={this.headerComponent}
					ListFooterComponent={renderFooter()}
					refreshing={isFetching}
					refreshControl={
						<RefreshControl
							refreshing={isFetching}
							onRefresh={() => this.fetchData(true)}
						/>
					}
					onEndReachedThreshold={0.5}
					onEndReached={this.handleLoadMore}
					scrollEventThrottle={1}
				/>
				{this.props.showSortingModal && <WdModalSorting />}
			</View>
		);
	}
}

const mapStateToProps = ({ layouts, products, vendors }, ownProp) => {
	if (ownProp.vendorID) {
		const list = vendors.vendorProducts;
		const isFetching = vendors.isFetching;
		const finish = true;

		return { list, isFetching, finish };
	} else if (ownProp.config.name === "allProducts") {
		const list = products.listAll;
		const isFetching = products.isFetching;
		const finish = products.productFinish;
		const message = products.message
		const layoutProductScreen = products.layoutProductScreen;
console.log(list);
		return { list, isFetching, finish, layoutProductScreen, message }
	} else if (ownProp.config.name === "newArrival") {
		const list = products.list;
		const isFetching = products.isFetching;
		const finish = products.productFinish;
		const layoutProductScreen = products.layoutProductScreen;

		return { list, isFetching, finish, layoutProductScreen }
	} else {
		const index = ownProp.index;
		const list = layouts.layout[index].list;
		const isFetching = layouts.layout[index].isFetching;
		const finish = layouts.layout[index].finish;
		const layoutProductScreen = products.layoutProductScreen;

		return { list, isFetching, finish, layoutProductScreen };
	}
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { dispatch } = dispatchProps;
	const { actions: LayoutActions } = require("@redux/LayoutRedux");
	const { actions: ProductActions } = require("@redux/ProductRedux");

	return {
		...ownProps,
		...stateProps,
		fetchAllProducts: (per_page, page) => {
			ProductActions.fetchAllProducts(dispatch, per_page, page);
		},
		fetchProductsByCollections: (category_id, tag_id, page, index, name) => {
			LayoutActions.fetchProductsLayout(
				dispatch,
				category_id,
				tag_id,
				page,
				index,
				name
			);
		},
		fetchNewArrivals: (page) => {
			ProductActions.fetchNewArrivals(dispatch, page);
		},
		sortByRating: (per_page, page, order, order_by) => {
			return (
				ProductActions.sortByRating(dispatch, per_page, page, order, order_by)
			)
		},
		sortByDate: (per_page, page, order, order_by) => {
			return (
				ProductActions.sortByDate(dispatch, per_page, page, order, order_by)
			)
		},
		sortByPriceDesc: (per_page, page, order, order_by) => {
			return (
				ProductActions.sortByPriceDesc(dispatch, per_page, page, order, order_by)
			)
		},
		sortByPriceAsc: (per_page, page, order, order_by) => {
			return (
				ProductActions.sortByPriceAsc(dispatch, per_page, page, order, order_by)
			)
		}
	};
};

export default connect(
	mapStateToProps,
	null,
	mergeProps
)(ProductList);