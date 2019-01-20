/**
 * @format
 * Created by weDevs 07/08/2018
*/

import React, { Component } from "react";
import {
	View,
	Text,
	TouchableOpacity,
} from "react-native";
import { Icon, IconIO, toggleFilterDrawer } from "@app/Omni";
import { DokanModal } from "@components";
import { Icons, Constants, Config } from "@common";
import { actions } from "@redux/ProductRedux";
import { connect } from "react-redux";
import styles from "./styles";

class WdProductListToolBar extends Component {
	state = {
		currentLayout : this.props.layoutProductScreen,
		//Modal
		isOpen: false,
		isDisabled: true,
		swipeToClose: false,
		sliderValue: 0.3
	}

	onClose = () => {
		console.log('Modal just closed');
	}
	onOpen = () => {
		console.log('Modal just opened');
	}
	onClosingState = (state) => {
		console.log('the open/close of the swipeToClose just changed');
	}

	layoutChangeHandler = () => {
		if (this.state.currentLayout == Constants.Layout.twoColumn) {
			this.props.switchLayoutProductPage(
				Constants.Layout.simple,
				Icons.MaterialCommunityIcons.GridMode
			)
			this.setState({
				...this.state,
				currentLayout: Constants.Layout.simple
			})
				
		} else {
			this.props.switchLayoutProductPage(
				Constants.Layout.twoColumn,
				Icons.MaterialCommunityIcons.Categories
			)
			this.setState({
				...this.state,
				currentLayout: Constants.Layout.twoColumn
			})
		}
	}
	productSortingHandler = (item) => {
		this.props.clearProducts();
		this.dokanModal.closeModal();

		if (item === "Sort by average rating") {
			this.props.sortByRating(10, 1, "desc", "rating");
		} else if (item === "Sort by newness") {
			this.props.sortByDate(10, 1, "desc", "date");
		} else if (item === "Sort by price high to low") {
			this.props.sortByPriceDesc(10, 1, "desc", "price");
		} else if (item === "Sort by price low to high") {
			this.props.sortByPriceAsc(10, 1, "asc", "price");
		} else {
			return false;
		}
	}

	render() {
		const { showSorting } = this.props;
		
		return (
			<View style={styles.toolbarContainer}>
				<TouchableOpacity style={styles.toolbarLeft} onPress={() => false}>
					{/* <IconIO
						style={styles.toolbarIcon}
						name={Icons.Ionicons.Sort}
						size={18}
					/>
					<Text style={{color: '#818995', marginLeft: 10}}>Filter</Text> */}
				</TouchableOpacity>
				<View
					style={[styles.toolbarRight, !showSorting && {justifyContent: "flex-end"}]}>
					{
						showSorting && (
							<TouchableOpacity
								style={{flexDirection: 'row'}}
								onPress={() => this.dokanModal.openModal()}>
									<Text style={{color: '#818995', marginRight: 10}}>
										Default Sorting
									</Text>
									<IconIO
										style={styles.toolbarIcon}
										name={Icons.Ionicons.Down}
										size={18}
									/>
							</TouchableOpacity>
						)
					}
					<TouchableOpacity style={{width: 20}} onPress={() => this.layoutChangeHandler()}>
						<Icon
							style={styles.toolbarIcon}
							name={this.props.layoutChangeIcon}
							size={18}
						/>
					</TouchableOpacity>
				</View>

				<DokanModal
					ref={(dm) => (this.dokanModal = dm)}
					customStyle={
						{
							width: "70%",
							height: 250
						}
					}
					>
						{
							Config.sortingTexts.map((item, index) => {
								return (
									<TouchableOpacity
										onPress={() => this.productSortingHandler(item)}
										style={styles.sortingTextContainer}
										key={`${index}`}>
										<Text style={styles.sortingText}>{item}</Text>
									</TouchableOpacity>
								)
							})
						}
				</DokanModal>
			</View>
		)
	}
}

const mapStateToProps = ({ products }) => (
	{
		layoutChangeIcon: products.layoutChangeIcon,
		layoutProductScreen: products.layoutProductScreen
	}
);
function mergeProps(stateProps, dispatchProps, ownProps) {
	const { netInfo } = stateProps;
	const { dispatch } = dispatchProps;
	const { actions } = require("@redux/ProductRedux");
	
	return {
		...ownProps,
		...stateProps,
		clearProducts: () => dispatch(actions.clearProducts()),
		switchLayoutProductPage: (layout, layoutChangeIcon) =>
			dispatch(actions.switchLayoutProductPage(layout, layoutChangeIcon)),
		sortByRating: (per_page, page, order, order_by) => {
			return (
				actions.sortByRating(dispatch, per_page, page, order, order_by)
			)
		},
		sortByDate: (per_page, page, order, order_by) => {
			return (
				actions.sortByDate(dispatch, per_page, page, order, order_by)
			)
		},
		sortByPriceDesc: (per_page, page, order, order_by) => {
			return (
				actions.sortByPriceDesc(dispatch, per_page, page, order, order_by)
			)
		},
		sortByPriceAsc: (per_page, page, order, order_by) => {
			return (
				actions.sortByPriceAsc(dispatch, per_page, page, order, order_by)
			)
		}
	};
}

export default connect(mapStateToProps, undefined, mergeProps)(WdProductListToolBar);