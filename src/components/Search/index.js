/** @format */

import React, { PureComponent } from "react";
import {
	Text,
	TextInput,
	ListView,
	View,
	TouchableOpacity,
	Image,
	I18nManager,
	Keyboard
} from "react-native";
import { connect } from "react-redux";
import { Icon, IconIO } from "@app/Omni";
import { Config } from "@common"

import { Color, Constants, Icons, Languages } from "@common";
import { Button, FlatButton, Spinkit, ProductItem , WdPopularCat} from "@components";
import { BlockTimer, warn } from "@app/Omni";
import styles from "./styles";

class Search extends PureComponent {
	constructor(props) {
		super(props);
		this.page = 1;
		this.limit = Constants.pagingLimit;
		this.state = {
			text: "",
			isSubmit: false,
			loading: false,
			focus: true,
			tabIndex: 0,
		};
	}

	renderSearchBar = () => {
		const closeButton = () => {
			return (
				<TouchableOpacity
					onPress={this.onBack}
					style={{ width: 50, justifyContent: "center", alignItems: "center" }}>
					<Icon name={Icons.MaterialCommunityIcons.Back} size={25} color="#000" />
				</TouchableOpacity>
			);
		};

		const searchButton = () => {
			return (
				<TouchableOpacity
					onPress={this.startNewSearch}
					style={{ width: 50, justifyContent: "center", alignItems: "center" }}>
					<IconIO name={Icons.Ionicons.Search} size={24} color="#000" />
				</TouchableOpacity>
			);
		};

		const styleTextInput = {
			flex: 1,
			fontSize: 16,
			paddingLeft: 20,
			fontFamily: Constants.fontFamily,
			color: Color.blackTextPrimary,
		};
		const searchInput = (
			<TextInput
				ref="textInput"
				autoFocus={this.state.focus}
				placeholder={Languages.SearchPlaceHolder}
				placeholderTextColor={Color.blackTextSecondary}
				style={[
					styleTextInput,
					I18nManager.isRTL ? { marginRight: 120 } : { marginLeft: 10 },
				]}
				value={this.state.text}
				onChangeText={(text) => this.setState({ text })}
				underlineColorAndroid="transparent"
				onSubmitEditing={this.startNewSearch}
			/>
		);

		return (
			<View
				style={{
					height: 50,
					flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
					// marginBottom: 10,
					// marginTop: 20,
					borderBottomWidth: 0.5,
					borderColor: Color.DirtyBackground,
					backgroundColor: "#fff"
				}}>
				{closeButton()}
				{searchInput}
				{searchButton()}
			</View>
		);
	};

	onBack = () => {
		this.setState({ text: "" });
		Keyboard.dismiss();
		this.props.onBack(null);
	};

	startNewSearch = async () => {
		const { list } = this.props;

		this.setState({ loading: true, isSubmit: true });
		await this.props.fetchProductsByName(
			this.state.text,
			this.limit,
			this.page
		);
		if (typeof list !== "undefined") {
			this.setState({ loading: false });
		}
	};

	onRowClickHandle = (product) => {
		BlockTimer.execute(() => {
			this.props.onViewProductScreen({ product });
		}, 500);
	};

	renderItem = (item) => {
		return (
			<ProductItem
				small
				product={item}
				onPress={() => this.onRowClickHandle(item)}
			/>
		);
	};

	nextPosts = () => {
		this.page += 1;
		this.props.fetchProductsByName(this.state.text, this.limit, this.page);
	};

	renderResultList = () => {
		const { list, isFetching } = this.props;
		console.log(list);
		const { isSubmit } = this.state;
		const dataSource = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2,
		});

		return list.length > 0 ? (
			<ListView
				contentContainerStyle={styles.flatlist}
				dataSource={dataSource.cloneWithRows(list)}
				renderRow={this.renderItem}
				renderFooter={() => {
					return list.length > 20 ? (
						<View style={styles.more}>
							<FlatButton
								name="arrow-down"
								text={isFetching ? "LOADING..." : "MORE"}
								load={this.nextPosts}
							/>
						</View>
					) : null;
				}}
			/>
		) : (
			isSubmit &&
				!isFetching && (
					<Text style={{ textAlign: "center", color: "red" }}>{Languages.NoResultError}</Text>
				)
		);

	};

	// handleClickTab(tabIndex) {
	//   this.setState({ tabIndex });
	// }

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: "#F8F8FA" }}>
				{this.renderSearchBar()}

			{/* <View style={styles.tabView}>
				<View
					style={[
						styles.tabButton,
						Constants.RTL && { flexDirection: "row-reverse" },
					]}>
					<View style={styles.tabItem}>
						<Button
							type="tab"
							from="search"
							textStyle={styles.textTab}
							text={"Product"}
							onPress={() => this.handleClickTab(0)}
							selected={this.state.tabIndex == 0}
						/>
					</View>
					<View style={styles.tabItem}>
						<Button
							type="tab"
							textStyle={styles.textTab}
							text={"Vendor"}
							onPress={() => this.handleClickTab(1)}
							selected={this.state.tabIndex == 1}
						/>
					</View>
					<View style={styles.tabItem}>
						<Button
							type="tab"
							textStyle={styles.textTab}
							text={"Recent View"}
							onPress={() => this.handleClickTab(2)}
							selected={this.state.tabIndex == 2}
						/>
					</View>
				</View>
				{this.state.tabIndex === 0 && (
					<View style={styles.popCatContainer}>
						<View style={{width: '100%', padding:5, marginBottom: 10}}>
							<Text style={{color: '#79828F', fontSize: 16}}>Popular Categories</Text>
						</View>
						{
							Config.popularCat.map((category, index) => {
								return (
									<View
										key={`pcat-${index}`}
										style={
											[
												styles.popCat,
												{
													backgroundColor: category.colorRGB
												}
											]
										}
									>
										<Image source={category.icon} style={{width: 35, height: 29}} />
										<Text style={{color: '#808894', marginTop: 5}}>{category.Name}</Text>
									</View>
								)
							})
						}
					</View>
				)}
				{this.state.tabIndex === 1 && (
					<View style={styles.description}>
						<Text>2nd Tab</Text>
					</View>
				)}
				{this.state.tabIndex === 2 && (
					<View style={styles.description}>
						<Text>3rd Tab</Text>
					</View>
				)}
			</View> */}
				
				{/* Search Result */}
				<View style={{ flex: 1 }}>
					{this.props.isFetching ? <Spinkit /> : this.renderResultList()}
				</View>
				
			</View>
		);
	}
}

const mapStateToProps = ({ products }) => ({
	list: products.productsByName,
	isFetching: products.isFetching,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { dispatch } = dispatchProps;
	const { actions } = require("@redux/ProductRedux");
	return {
		...ownProps,
		...stateProps,
		fetchProductsByName: (name, per_page, page) => {
			if (name.length > 0) {
				actions.fetchProductsByName(dispatch, name, per_page, page);
			}
		},
	};
};
module.exports = connect(
	mapStateToProps,
	null,
	mergeProps
)(Search);