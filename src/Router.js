/**
 * Created by InspireUI on 19/02/2017.
 *
 * @format
 */

import React from "react";
import PropTypes from "prop-types";
import { View, StatusBar } from "react-native";
import { WooWorker } from "api-ecommerce";
import { Config, Device, Styles } from "@common";
import { MyToast, MyNetInfo } from "@containers";
import { AppIntro, ModalReview } from "@components";
import Navigation from "@navigation";
import { connect } from "react-redux";

import MenuSide from "@components/LeftMenu/MenuOverlay";
// import MenuSide from "@components/LeftMenu/MenuScale";
// import MenuSide from '@components/LeftMenu/MenuSmall';
// import MenuSide from '@components/LeftMenu/MenuWide';

import { toast, closeDrawer } from "./Omni";

class Router extends React.PureComponent {
  static propTypes = {
    introStatus: PropTypes.bool,
  };

  componentWillMount() {
    // init wooworker
    WooWorker.init({
      url: Config.WooCommerce.url,
      consumerKey: Config.WooCommerce.consumerKey,
      consumerSecret: Config.WooCommerce.consumerSecret,
      wp_api: true,
      version: "wc/v2",
      queryStringAuth: true,
      language: this.props.language.lang,
    });
  }

  goToScreen = (routeName, params) => {
    if (!this.navigator) {
      return toast("Cannot navigate");
    }
    this.navigator.dispatch({ type: "Navigation/NAVIGATE", routeName, params });
    closeDrawer();
  };

  render() {
    if (!this.props.introStatus) {
      return <AppIntro />;
    }

    return (
      <MenuSide
        goToScreen={this.goToScreen}
        routes={
          <View style={Styles.app}>
            <StatusBar
              hidden={Device.isIphoneX ? false : !Config.showStatusBar}
            />
            <Navigation ref={(comp) => (this.navigator = comp)} />
            <MyToast />
            <ModalReview />
            <MyNetInfo />
          </View>
        }
      />
    );
  }
}

const mapStateToProps = ({ user, language }) => ({
  introStatus: user.finishIntro,
  language,
});
export default connect(mapStateToProps)(Router);
