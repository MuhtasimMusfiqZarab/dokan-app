/** @format */

import React, { Component } from 'react';
import {
	FlatList,
	Image,
	Platform,
	RefreshControl,
	Animated,
	View,
} from 'react-native';
import { PostLayout, Spinkit, WdVendorListToolBar } from '@components';
import { Constants } from '@common';
import { connect } from 'react-redux';
import styles from './styles';

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

		this.state = {
			isFooterFetching: false,
		};

		this.page = props.page ? props.page : 0;
		this.limit = Constants.pagingLimit;
		this.isVendorList = props.type === undefined;
		this.key = 1;
	}

	componentDidMount() {
		this.fetchData();
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.layoutVendorScreen !== this.props.layoutVendorScreen ||
			nextProps.list !== this.props.list ||
			nextState.isFooterFetching !== this.state.isFooterFetching
		);
	}

	UNSAFE_componentWillReceiveProps(nexprops) {
		nexprops.layoutVendorScreen !== this.props.layoutVendorScreen
			? (this.key = this.key + 1)
			: 1;
	}

	fetchData = (reload = false) => {
		if (reload) {
			this.page = 1;
			this.props.clearVendors();
		}

		this.props.fetchAllVendors(this.page, 10);
	};

	handleLoadMore = () => {
		console.log(`finish: ${this.props.finish}`);
		if (!this.props.finish) {
			this.setState({
				isFooterFetching: true,
			});
			this.page += 1;
			this.fetchData();
		} else {
			this.setState({
				isFooterFetching: false,
			});
		}
	};

	onRowClickHandle = item => {
		this.props.fetchVendorProducts(item.id);
		this.props.onViewVendorScreen(item);
	};

	renderItem = ({ item, index }) => {
		if (item == null) return <View />;

		return (
			<PostLayout
				post={item}
				type={'Vendor'}
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
		const { list, isFetching, layoutVendorScreen } = this.props;
		console.log(`isFetching: ${isFetching}`);
		const renderFooter = () => (this.state.isFooterFetching ? <Spinkit /> : '');

		return (
			<View style={styles.listView}>
				{this.props.showToolBar && <WdVendorListToolBar />}
				<AnimatedFlatList
					key={this.key}
					contentContainerStyle={styles.flatlist}
					numColumns={layoutVendorScreen == 2 ? 2 : 1}
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
					onEndReachedThreshold={0}
					// onEndReached={
					// 	(distance) => distance.distanceFromEnd > 100 && this.handleLoadMore()
					// }
					onEndReached={this.handleLoadMore}
					scrollEventThrottle={1}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
						{ useNativeDriver: Platform.OS !== 'android' }
					)}
				/>
			</View>
		);
	}
}

const mapStateToProps = ({ vendors }) => {
	const list = vendors.vendorList;
	const isFetching = vendors.isFetching;
	const layoutVendorScreen = vendors.layoutVendorScreen;
	const finish = vendors.finish;

	return { list, isFetching, finish, layoutVendorScreen };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { dispatch } = dispatchProps;
	const { actions: VendorActions } = require('@redux/VendorRedux');

	return {
		...ownProps,
		...stateProps,
		fetchAllVendors: (page, per_page) => {
			VendorActions.fetchVendors(dispatch, page, per_page);
		},
		clearVendors: () => {
			VendorActions.clearVendors(dispatch);
		},
		fetchVendorProducts: vendorID => {
			VendorActions.fetchVendorProducts(dispatch, vendorID);
		},
	};
};

export default connect(
	mapStateToProps,
	null,
	mergeProps
)(Vendors);
