/** @format */

import React, { PureComponent } from 'react';
import {
	Text,
	TextInput,
	ListView,
	View,
	TouchableOpacity,
	Platform,
	I18nManager,
	Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import { Device, Color, Constants, Icons, Languages } from '@common';
import { FlatButton, Spinkit, ProductItem } from '@components';
import { BlockTimer, Icon, IconIO } from '@app/Omni';
import styles from './styles';
import { Searchbar } from 'react-native-paper';
import { withNavigationFocus } from 'react-navigation';

export default class Search extends PureComponent {
	constructor(props) {
		super(props);
		this.page = 1;
		this.limit = Constants.pagingLimit;
		this.state = {
			text: '',
			isSubmit: false,
			loading: false,
			focus: true,
			tabIndex: 0,
		};
	}

	onBack = () => {
		this.setState({ text: '' });
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

		if (typeof list !== 'undefined') {
			this.setState({ loading: false });
		}
	};

	onRowClickHandle = product => {
		BlockTimer.execute(() => {
			this.props.onViewProductScreen({ product });
		}, 500);
	};

	renderItem = item => {
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
								text={isFetching ? 'LOADING...' : 'MORE'}
								load={this.nextPosts}
							/>
						</View>
					) : null;
				}}
			/>
		) : (
			isSubmit && !isFetching && (
				<Text style={{ textAlign: 'center', color: 'red' }}>
					{Languages.NoResultError}
				</Text>
			)
		);
	};

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#F8F8FA' }}>
				<Searchbar
					autoFocus={this.props.isFocused}
					icon="arrow-back"
					placeholder="Search Product"
					onChangeText={query => {
						this.setState({ text: query });
					}}
					value={this.state.text}
					onSubmitEditing={() => this.startNewSearch()}
					onIconPress={() => this.onBack()}
				/>
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
	const { actions } = require('@redux/ProductRedux');
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
)(withNavigationFocus(Search));
