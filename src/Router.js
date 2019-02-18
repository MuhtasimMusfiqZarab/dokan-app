/**
 * @format
 */

import React from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, SafeAreaView } from 'react-native';
import WooWorker from '@services/WooCommerce/WooWorker';
import { Config, Device, Styles } from '@common';
import { MyToast, MyNetInfo } from '@containers';
import { ModalReview, Spinner } from '@components';
import Navigation from '@navigation';
import { connect } from 'react-redux';
import MenuSide from '@components/LeftMenu/MenuOverlay';
// import MenuSide from "@components/LeftMenu/MenuScale";
// import MenuSide from '@components/LeftMenu/MenuSmall';
// import MenuSide from '@components/LeftMenu/MenuWide';
import { toast, closeDrawer } from './Omni';
import DokanWorker from '@services/Dokan/DokanWorker';

class Router extends React.PureComponent {
	static propTypes = {
		introStatus: PropTypes.bool,
		language: PropTypes.any,
	};

	state = {
		isAppConfigured: false,
	};

	async componentDidMount() {
		const wooApiVersion = await DokanWorker.getWooCommerceApiVersion();
		const settings = await DokanWorker.getAppSettings();
		const modules = await DokanWorker.getPluginModuleStatus();

		// Set globalSettings and Dokan Moudules' status
		Config.appSettings = settings;
		Config.dokanModules = modules;
		Config.appSettings.tagLine = 'Build Your Dream Multi Vendor Market Place';

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
	}

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

		if (this.state.isAppConfigured) {
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
		} else {
			return <Spinner mode="overlay" color="#000" backgroundColor="#fff" />;
		}
	}
}

const mapStateToProps = ({ user, language }) => ({
	introStatus: user.finishIntro,
	language,
});
export default connect(mapStateToProps)(Router);
