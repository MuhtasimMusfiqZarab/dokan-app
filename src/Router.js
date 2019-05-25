/**
 * @format
 */

import React from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, SafeAreaView, NetInfo } from 'react-native';
import WooWorker from '@services/WooCommerce/WooWorker';
import { Config, Device, Styles } from '@common';
import { MyToast, MyNetInfo } from '@containers';
import { ModalReview, Spinner, NoConnection } from '@components';
import Navigation from '@navigation';
import { connect } from 'react-redux';
import MenuSide from '@components/LeftMenu/MenuOverlay';
// import MenuSide from "@components/LeftMenu/MenuScale";
// import MenuSide from '@components/LeftMenu/MenuSmall';
// import MenuSide from '@components/LeftMenu/MenuWide';
import { toast, closeDrawer } from './Omni';
import DokanWorker from '@services/Dokan/DokanWorker';

class Router extends React.Component {
	static propTypes = {
		introStatus: PropTypes.bool,
		language: PropTypes.any,
		netInfo: PropTypes.any,
	};

	state = {
		isAppConfigured: false,
		isConnected: true,
	};

	componentDidMount() {
		NetInfo.getConnectionInfo()
			.then(connectionInfo => {
				if (connectionInfo.type === 'none') {
					this.setState({
						isConnected: false,
					});
				} else {
					this.fetchAppSettings();
				}
			})
			.catch(e => console.log(e));
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextState.isConnected !== this.state.isAppConfigured ||
			nextState.isAppConfigured !== this.state.isConnected
		);
	}

	fetchAppSettings = async () => {
		const wooApiVersion = await DokanWorker.getWooCommerceApiVersion();
		const settings = await DokanWorker.getAppSettings();
		const modules = await DokanWorker.getPluginModuleStatus();

		// Set Global App Settings
		Config.appSettings = settings;
		// Set Dokan Moudules' status
		modules.map(
			module => (Config.dokanModules[module.title] = module.is_active)
		);

		console.log(Config.appSettings);
		console.log(Config.dokanModules);

		WooWorker.init({
			url: Config.WooCommerce.url,
			consumerKey: Config.WooCommerce.consumerKey,
			consumerSecret: Config.WooCommerce.consumerSecret,
			wp_api: true,
			version: wooApiVersion,
			queryStringAuth: true,
			language: this.props.language.lang,
		});

		this.setState({ isAppConfigured: true });
	};

	onRefreshHandler = () => {
		console.log('called');
		NetInfo.getConnectionInfo()
			.then(connectionInfo => {
				if (connectionInfo.type === 'none') {
					this.setState({ isConnected: false });
				} else {
					this.setState({ isConnected: true });
					this.fetchAppSettings();
				}
			})
			.catch(e => console.log(e));
	};

	goToScreen = (routeName, params) => {
		if (!this.navigator) {
			return toast('Cannot navigate');
		}
		this.navigator.dispatch({ type: 'Navigation/NAVIGATE', routeName, params });
		closeDrawer();
	};

	render() {
		// if (!this.props.introStatus) {
		// 	return <AppIntro />;
		// }

		const { isAppConfigured, isConnected } = this.state;

		if (isAppConfigured && isConnected) {
			return Device.isIphoneX ? (
				<SafeAreaView style={{ flex: 1 }}>
					<MenuSide
						goToScreen={this.goToScreen}
						routes={
							<View style={Styles.app}>
								<StatusBar
									hidden={Device.isIphoneX ? false : !Config.showStatusBar}
								/>
								<Navigation ref={comp => (this.navigator = comp)} />
								<MyToast />
								<ModalReview />
								<MyNetInfo />
							</View>
						}
					/>
				</SafeAreaView>
			) : (
				<MenuSide
					goToScreen={this.goToScreen}
					routes={
						<View style={Styles.app}>
							<StatusBar
								hidden={Device.isIphoneX ? false : !Config.showStatusBar}
							/>
							<Navigation ref={comp => (this.navigator = comp)} />
							<MyToast />
							<ModalReview />
							<MyNetInfo />
						</View>
					}
				/>
			);
		} else if (!isAppConfigured && isConnected) {
			return <Spinner mode="overlay" color="#000" backgroundColor="#fff" />;
		} else {
			return <NoConnection onPress={this.onRefreshHandler} />;
		}
	}
}

const mapStateToProps = ({ user, language }) => ({
	introStatus: user.finishIntro,
	language,
});
export default connect(mapStateToProps)(Router);
