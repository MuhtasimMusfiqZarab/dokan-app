import React, {PureComponent} from "react";
import { View, ListView, FlatList } from "react-native";
import { NavigationActions } from "react-navigation";
import { Config } from "@common"
import { ProductItem } from "@components";

export default class AccordionRelatedProducts extends PureComponent {

	_onRelatedClickHandle = (product) => {
		const navigateAction = NavigationActions.navigate({
			routeName: "DetailScreen",
			params: {
				product: product
			},
			key: `DetailScreen-step-${product.id}`,
		});
		this.props.navigation.dispatch(navigateAction);
	};

	_renderRelatedProducts = (data) => {
		return (
			<ProductItem
				small
				product={data.item}
				onPress={() => this._onRelatedClickHandle(data.item)}
			/>
		);
	}

	render() {
		
		return (
			<FlatList
				data={this.props.relatedProducts}
				keyExtractor={(item, index) => `r_${index}`}
				renderItem={this._renderRelatedProducts}
				contentContainerStyle={{flex: 1, overflow: "hidden"}}
				removeClippedSubviews={true}
				legacyImplementation={true}
			/>
		)
	
		// const dataSource = new ListView.DataSource({
		// 	rowHasChanged: (r1, r2) => r1 !== r2,
		// });

		// return (
		// 	<ListView
		// 		dataSource={dataSource.cloneWithRows(this.props.relatedProducts)}
		// 		renderRow={this._renderRelatedProducts}
		// 	/>
		// )
	}
}