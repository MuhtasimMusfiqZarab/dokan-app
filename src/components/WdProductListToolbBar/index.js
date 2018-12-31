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

	render() {
		const { showSorting } = this.props;
		
		return (
			<View style={styles.toolbarContainer}>
				<TouchableOpacity style={styles.toolbarLeft} onPress={toggleFilterDrawer}>
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
					<TouchableOpacity onPress={() => this.layoutChangeHandler()}>
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
const switchLayoutProductPage = actions.switchLayoutProductPage;
export default connect(mapStateToProps, {switchLayoutProductPage})(WdProductListToolBar);