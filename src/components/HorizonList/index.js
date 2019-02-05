/**
 * @format
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl } from 'react-native';
import { HorizonLayouts } from '@common';
import { connect } from 'react-redux';
import { makeGetCollections } from '@selectors/LayoutSelector';
import HList from './HList';
import { WdSearchBox } from '@components';

class HorizonList extends PureComponent {
	static propTypes = {
		fetchFeaturedVendors: PropTypes.func,
		fetchAllCategories: PropTypes.func,
		fetchVendorProducts: PropTypes.func,
		onViewVendorProfileScreen: PropTypes.func,
		onViewCategory: PropTypes.func,
		fetchAllVendors: PropTypes.func,
		vendorList: PropTypes.array,
		featuredVendorList: PropTypes.array,
		categoriesList: PropTypes.array,
		fetchAllProductsLayout: PropTypes.func.isRequired,
		fetchProductsByCollections: PropTypes.func,
		list: PropTypes.array,
		onShowAll: PropTypes.func,
		onViewProductScreen: PropTypes.func,
		collections: PropTypes.array,
		setSelectedCategory: PropTypes.func,
		isFetching: PropTypes.bool.isRequired,
		navigation: PropTypes.object,
	};

	componentDidMount() {
		this._fetchAllPost();
	}

	/**
	 * Fetch all products based on layouts
	 */
	_fetchAllPost = () => {
		this.props.fetchAllProductsLayout();
		this.props.fetchFeaturedVendors();
		this.props.fetchAllCategories();
	};

	_fetchPost = ({ config, index, page }) => {
		const { fetchProductsByCollections } = this.props;
		fetchProductsByCollections(
			config.category,
			config.tag,
			page,
			index,
			config.name
		);
	};

	_fetchVendorProducts = vendorID => {
		this.props.fetchVendorProducts(vendorID);
	};

	_renderItem = ({ item, index }) => {
		const {
			list,
			onShowAll,
			onViewProductScreen,
			onViewVendorProfileScreen,
			onViewCategory,
			collections,
			setSelectedCategory,
			fetchProductsByCollections,
			vendorList,
			featuredVendorList,
			fetchAllVendors,
			categoriesList,
		} = this.props;

		return (
			<HList
				horizontal
				onViewCategory={onViewCategory}
				onViewProductScreen={onViewProductScreen}
				onViewVendorProfileScreen={onViewVendorProfileScreen}
				onShowAll={onShowAll}
				key={`taglist-${index}`}
				config={item}
				index={index}
				collection={collections[index]}
				list={list}
				vendorList={vendorList}
				featuredVendorList={featuredVendorList}
				fetchPost={this._fetchPost}
				fetchProductsByCollections={fetchProductsByCollections}
				fetchAllVendors={fetchAllVendors}
				categoriesList={categoriesList}
				fetchVendorProducts={this._fetchVendorProducts}
				setSelectedCategory={setSelectedCategory}
				navigation={this.props.navigation}
			/>
		);
	};

	beforeList = () => <WdSearchBox navigation={this.props.navigation} />;

	render() {
		const { isFetching } = this.props;
		return (
			<FlatList
				data={HorizonLayouts}
				keyExtractor={(item, index) => `h_${index}`}
				renderItem={this._renderItem}
				scrollEventThrottle={1}
				refreshing={isFetching}
				refreshControl={
					<RefreshControl
						refreshing={isFetching}
						onRefresh={this._fetchAllPost}
					/>
				}
				ListHeaderComponent={this.beforeList}
			/>
		);
	}
}

const makeMapStateToProps = () => {
	const getCollections = makeGetCollections();
	const mapStateToProps = (state, props) => {
		return {
			collections: getCollections(state, props),
			// collections: state.layouts.layout,
			isFetching: state.layouts.isFetching,
			list: state.categories.list,
			vendorList: state.vendors.vendorList,
			featuredVendorList: state.vendors.featuredVendorList,
			categoriesList: state.categories.list,
		};
	};

	return mapStateToProps;
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { dispatch } = dispatchProps;
	const { actions: LayoutActions } = require('@redux/LayoutRedux');
	const { actions: CategoryActions } = require('@redux/CategoryRedux');
	const { actions: VendorActions } = require('@redux/VendorRedux');

	return {
		...ownProps,
		...stateProps,
		setSelectedCategory: category =>
			dispatch(CategoryActions.setSelectedCategory(category)),

		fetchProductsByCollections: (categoryId, tagId, page = 1, index, name) => {
			LayoutActions.fetchProductsLayout(
				dispatch,
				categoryId,
				tagId,
				page,
				index,
				name
			);
		},
		fetchAllProductsLayout: () => {
			LayoutActions.fetchAllProductsLayout(dispatch);
		},
		fetchAllCategories: () => {
			CategoryActions.fetchCategories(dispatch);
		},
		fetchAllVendors: () => {
			VendorActions.fetchVendors(dispatch);
		},
		fetchFeaturedVendors: () => {
			VendorActions.fetchFeaturedVendors(dispatch);
		},
		fetchVendorProducts: vendorID => {
			VendorActions.fetchVendorProducts(dispatch, vendorID);
		},
	};
};

export default connect(
	makeMapStateToProps,
	null,
	mergeProps
)(HorizonList);
