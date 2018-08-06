/** @format */

// @flow
/**
 * Created by InspireUI on 19/02/2017.
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { connect } from "react-redux";
import { Constants } from "@common";
import { HorizonList, ModalLayout, PostList } from "@components";
import styles from "./styles";

class Home extends PureComponent {
  static propTypes = {
    fetchAllCountries: PropTypes.func.isRequired,
    layoutHome: PropTypes.any,
    onViewProductScreen: PropTypes.func,
    onShowAll: PropTypes.func,
  };

  componentDidMount() {
    const { countries, fetchAllCountries } = this.props;
    if (!countries || (countries && countries.length === 0)) {
      fetchAllCountries();
    }
  }

  render() {
    const { layoutHome, onViewProductScreen, onShowAll } = this.props;
    const isHorizontal = layoutHome === Constants.Layout.horizon;
    return (
      <View style={styles.container}>
        {isHorizontal && (
          <HorizonList
            onShowAll={onShowAll}
            onViewProductScreen={onViewProductScreen}
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
  const CountryRedux = require("@redux/CountryRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchAllCountries: () => CountryRedux.actions.fetchAllCountries(dispatch),
  };
}

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(Home);
