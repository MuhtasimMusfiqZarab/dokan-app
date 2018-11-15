/** @format */

// @flow
/**
 * Created by weDevs
 */
import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Styles, Images, Config, Languages, Constants, Color } from "@common";
import {
	Timer,
	toast,
	BlockTimer,
	CustomIcon,
	hexToRgb } from "@app/Omni";
import {
	Empty,
	LogoSpinner,
} from "@components";
import styles from "./styles";
import Icon from "@expo/vector-icons/FontAwesome";


class CategoriesScreen extends React.PureComponent {
	componentDidMount() {
		const { fetchCategories } = this.props;
		fetchCategories();
	}

	onRowClickHandle = (category) => {
		const { setSelectedCategory, onViewCategory } = this.props;
		BlockTimer.execute(() => {
			setSelectedCategory({
				...category,
				mainCategory: category,
			});
			onViewCategory({ mainCategory: category });
		}, 500);
	};

	_renderItem = ({item}) => {
		let iconName = item.icon ? item.icon.replace("icon-", "") : "";
		let rgbColorCode = item.icon_color ? hexToRgb(item.icon_color) : "";

		const renderCategoryIcon = () => {
			if (iconName) {
				return (
					<CustomIcon
						name={iconName}
						size={40}
						color={item.icon_color} />
				);
			} else {
				return ( <View /> );
			}
		}

		return (
			<TouchableOpacity
				style={
					[
						styles.categoryContainer,
						{
							backgroundColor: rgbColorCode ?
								`rgba(${rgbColorCode}, 0.1)` :
								"rgba(255, 255, 255, 0.5)"
						}
					]
				}
				onPress={() => this.onRowClickHandle(item)}>
				{renderCategoryIcon()}
				<Text style={{color: Color.wdgray3, marginTop: 15}}>{item.name}</Text>
			</TouchableOpacity>
		)
	}

	render() {
		const { categories, selectedLayout } = this.props;

		if (categories.error) {
			return <Empty text={categories.error} />;
		}

		if (categories.isFetching) {
			return <LogoSpinner fullStretch />;
		}

		const mainCategories = categories.list.filter(
			(category) => category.parent === 0
		);
		
		return (
			<FlatList
				style={{flexDirection: "column"}}
				numColumns={2}
				contentContainerStyle={{alignItems: "center"}}
				data={mainCategories}
				keyExtractor={(item) => `${item.id}`}
				renderItem={this._renderItem}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		categories: state.categories,
		netInfo: state.netInfo,
		user: state.user,
		selectedLayout: state.categories.selectedLayout,
	};
};

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { netInfo } = stateProps;
	const { dispatch } = dispatchProps;
	const { actions } = require("@redux/CategoryRedux");

	return {
		...ownProps,
		...stateProps,
		fetchCategories: () => {
			if (!netInfo.isConnected) return toast(Languages.noConnection);
			actions.fetchCategories(dispatch);
		},
		setActiveLayout: (value) => dispatch(actions.setActiveLayout(value)),
		setSelectedCategory: (category) =>
			dispatch(actions.setSelectedCategory(category)),
	};
}

export default connect(
	mapStateToProps,
	undefined,
	mergeProps
)(CategoriesScreen);
