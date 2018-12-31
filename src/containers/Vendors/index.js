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
	WdVendorListToolBar,
	WdModalSorting,
	} from "@components";
	import { Constants, Languages } from "@common";
	import { connect } from "react-redux";
	import styles from "./styles";

	// const HEADER_MIN_HEIGHT = 40;
	// const HEADER_SCROLL_DISTANCE =
	//   Constants.Window.headerHeight - HEADER_MIN_HEIGHT;
	const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

	class Vendors extends Component {
	state = {
		scrollY: new Animated.Value(0),
	};

	constructor(props) {
		super(props);

		this.page = props.page ? props.page : 0;
		this.limit = Constants.pagingLimit;
		this.isVendorList = props.type === undefined;
	}

	componentDidMount() {
		this.page === 0 && this.fetchData();
	}

	shouldComponentUpdate(nextProps) {
		return(
			nextProps.layoutVendorScreen !== this.props.layoutVendorScreen ||
			nextProps.list !== this.props.list
		)
	}

	fetchData = (reload = false) => {
		if (reload) {
			this.page = 1;
		}
		this.props.fetchAllVendors();
	};

	handleLoadMore = () => {
		if (!this.props.finish) {
			this.page += 1;
			this.fetchData();
		}
	};

	onRowClickHandle = (item) => {
		this.props.fetchVendorProducts(item.id);
		this.props.onViewVendorScreen(item);
	};

	renderItem = ({ item, index }) => {
		if (item == null) return <View />;

		return (
			<PostLayout
				post={item}
				type={"Vendor"}
				key={`key-${index}`}
				onViewPost={() => this.onRowClickHandle(item, this.props.type)}
				layout={this.props.layoutVendorScreen}
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
		return (
			<View style={styles.listView}>
				{this.props.showToolBar && <WdVendorListToolBar />}
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
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
						{ useNativeDriver: Platform.OS !== "android" }
					)}
				/>
			</View>
		);
	}
	}

	const mapStateToProps = ({ vendors }, ownProp) => {
	const list = vendors.vendorList;
	const isFetching = vendors.isFetching;
	const layoutVendorScreen = vendors.layoutVendorScreen;
	const finish = true;

	return { list, isFetching, finish, layoutVendorScreen };
	};

	const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { dispatch } = dispatchProps;
	const { actions: VendorActions } = require("@redux/VendorRedux");
	return {
		...ownProps,
		...stateProps,
		fetchAllVendors: () => {
			VendorActions.fetchVendors(dispatch);
		},
		fetchVendorProducts: (vendorID) => {
			VendorActions.fetchVendorProducts( dispatch, vendorID );
		}
	};
	};

	export default connect(
	mapStateToProps,
	null,
	mergeProps
	)(Vendors);
