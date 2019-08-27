/**
 * @format
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Constants, Config } from '@common';
import { HorizonList, ModalLayout, PostList } from '@components';
import styles from './styles';
import { request } from '@app/Omni';
import WooWorker from '@services/WooCommerce/WooWorker';
import CurrencyWorker from '@services/CurrencyWorker';

class Home extends PureComponent {
	static propTypes = {
		fetchAllCountries: PropTypes.func.isRequired,
		layoutHome: PropTypes.any,
		onViewProductScreen: PropTypes.func,
		onShowAll: PropTypes.func,
		countries: PropTypes.any,
		setCurrency: PropTypes.func,
		onViewVendorProfileScreen: PropTypes.func,
		onViewCategory: PropTypes.func,
		navigation: PropTypes.any,
	};

	componentDidMount() {
		const { countries, fetchAllCountries } = this.props;
		if (!countries || (countries && countries.length === 0)) {
			fetchAllCountries();
		}
		// this.getAuthToken();
		this.setDefaultCurrency();
	}

	getAuthToken = async () => {
		const isSecured = Config.WooCommerce.url.startsWith('https');
		const secure = isSecured ? '' : '&insecure=cool';
		const cookieLifeTime = 120960000000;
		const _url = `${Config.WooCommerce.url}/api/user/generate_auth_cookie/?second=${cookieLifeTime}&username=admin&password=admin${secure}`;
		const response = await request(_url);
		console.log(response);
	};

	setDefaultCurrency = async () => {
		const response = await WooWorker.getDefaultCurrency();
		const currency = CurrencyWorker.find(
			currency => currency.code == response.value
		);

		this.props.setCurrency(currency);
	};

	render() {
		const {
			layoutHome,
			onViewProductScreen,
			onViewVendorProfileScreen,
			onViewCategory,
			onShowAll,
			navigation,
		} = this.props;
		const isHorizontal = layoutHome === Constants.Layout.horizon;

		return (
			<View style={styles.container}>
				{isHorizontal && (
					<HorizonList
						onShowAll={onShowAll}
						onViewProductScreen={onViewProductScreen}
						onViewVendorProfileScreen={onViewVendorProfileScreen}
						onViewCategory={onViewCategory}
						navigation={navigation}
					/>
				)}
				{!isHorizontal && (
					<PostList onViewProductScreen={onViewProductScreen} />
				)}
				<ModalLayout />
			</View>
		);
	}
}

const mapStateToProps = ({ user, products }) => ({
	user,
	layoutHome: products.layoutHome,
});

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { dispatch } = dispatchProps;
	const CountryRedux = require('@redux/CountryRedux');
	const CurrencyRedux = require('@redux/CurrencyRedux');
	return {
		...ownProps,
		...stateProps,
		fetchAllCountries: () => CountryRedux.actions.fetchAllCountries(dispatch),
		setCurrency: currency =>
			CurrencyRedux.actions.changeCurrency(dispatch, currency),
	};
}

export default connect(
	mapStateToProps,
	undefined,
	mergeProps
)(Home);
