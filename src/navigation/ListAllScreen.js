/** @format */

import React, { Component } from 'react';
import { Images, Styles, Color } from '@common';
import { ProductList, VendorList } from '@components';
import { Back, CartWishListIcons } from './IconNav';
import MenuFilter from '@components/WdFilterMenu/MenuFilter';

export default class ListAllScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		// headerTitle: navigation.state.params.config.name === "featuredVendor" ?
		//   "Store List" : "Product List",
		headerTitle: navigation.state.params.title,
		headerLeft: Back(navigation, Images.icons.arrowBack),
		headerRight: CartWishListIcons(navigation),

		headerTintColor: Color.headerTintColor,
		headerStyle: Styles.Common.toolbar,
		headerLeftContainerStyle: Styles.Common.toolbarLeft,
		headerRightContainerStyle: Styles.Common.toolbarRight,
		headerTitleStyle: Styles.Common.headerTitleStyle,
	});

	render() {
		const { state, navigate } = this.props.navigation;
		const params = state.params;

		if (params.config.name === 'featuredVendor') {
			return (
				<VendorList
					config={params.config}
					page={1}
					navigation={this.props.navigation}
					onViewVendorScreen={item => navigate('VendorProfileScreen', item)}
					showToolBar={false}
					showSortingModal={true}
					vendorListType={params.config.vendorListType}
				/>
			);
		} else {
			return (
				<MenuFilter
					goToScreen={this.goToScreen}
					routes={
						<ProductList
							headerImage={params.config.image}
							config={params.config}
							page={1}
							navigation={this.props.navigation}
							index={params.index}
							onViewProductScreen={item => navigate('DetailScreen', item)}
							onViewVendorScreen={item => navigate('VendorProfileScreen', item)}
							showToolBar={true}
						/>
					}
				/>
			);
		}
	}
}
