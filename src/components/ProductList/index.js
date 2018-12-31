/** @format */

import React, { Component, PureComponent } from "react";
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

class ProductList extends PureComponent {
	state = {
		scrollY: new Animated.Value(0),
	};

	constructor(props) {
		super(props);

		this.page = props.page ? props.page : 0;
		this.limit = Constants.pagingLimit;
		this.isProductList = props.type === undefined;

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
			this.props.fetchAllProducts();
		}

		if (
			!this.props.vendorID &&
			this.props.config.name &&
			this.props.config.name === "newArrival"
		) {
			this.props.fetchNewArrivals();
		}

		this.page === 0 && this.fetchData();
	}

	shouldComponentUpdate(nextProps) {
		return(
			nextProps.layoutProductScreen !== this.props.layoutProductScreen ||
			nextProps.list !== this.props.list
		)
	}

	fetchData = (reload = false) => {
		if (this.props.vendorID)
			return;
		const { config,
			index,
			fetchProductsByCollections,
		} = this.props;

		if (reload) {
			this.page = 1;
		}

		fetchProductsByCollections(config.category, config.tag, this.page, index, config.name);
	};

	handleLoadMore = () => {
		if (!this.props.finish) {
			this.page += 1;
			this.fetchData();
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
				layout={
					this.props.vendorID ? 3 : this.props.layoutProductScreen
				}
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
		const { list, config, isFetching, navigation } = this.props;
		const renderFooter = () => isFetching && <Spinkit />;
		const showModalSorting = 
			config ? config.name === "allProducts" ? true : false : false
		
		return (
			<View style={styles.listView}>
				{this.props.showToolBar && <WdProductListToolBar showSorting={showModalSorting} />}
				<AnimatedFlatList
					contentContainerStyle={styles.flatlist}
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
					onEndReachedThreshold={100}
					onEndReached={(distance) =>
						distance.distanceFromEnd > 100 && this.handleLoadMore()
					}
					scrollEventThrottle={1}
					removeClippedSubviews={true}
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
		const finish = products.finish;
		const layoutProductScreen = products.layoutProductScreen;

		return { list, isFetching, finish, layoutProductScreen }
	} else if (ownProp.config.name === "newArrival") {
		const list = products.list;
		const isFetching = products.isFetching;
		const finish = products.finish;
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
		fetchAllProducts: () => {
			ProductActions.fetchAllProducts(dispatch);
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
		fetchNewArrivals: () => {
			ProductActions.fetchNewArrivals(dispatch);
		}
	};
};

export default connect(
	mapStateToProps,
	null,
	mergeProps
)(ProductList);