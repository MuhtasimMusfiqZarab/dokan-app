/** @format */

import React, { Component, PureComponent } from "react";
import {
  View,
  ScrollView,
  Text,
  Switch,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import {
  VendorProfileHeader,
  Button,
  ProductList,
  Review
} from "@components";
import { Languages, Color, Tools, Constants } from "@common";
import { getNotification } from "@app/Omni";

import styles from "./styles";

class VendorProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      tabIndex: 0,
    };
  }

  // shouldComponentUpdate (nextProps) {
  //   return nextProps.vendor.id !== this.props.vendor.id
  // }

  handleClickTab = (tabIndex) => {
		this.setState({ tabIndex });
  }

  render() {
    const { vendor, navigation } = this.props;

    return (
      <View style={styles.container}>
        {/* <View
          style={{
            width: "100%",
            height: 50,
            backgroundColor: "blue",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1
          }}
        >
          <Text style={{color: "white"}}>Transparent Header</Text>
        </View> */}

        <ScrollView ref="scrollView">
          <VendorProfileHeader vendor={vendor} />

          <View style={styles.tabView}>
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
                  text={"Review"}
                  onPress={() => this.handleClickTab(1)}
                  selected={this.state.tabIndex == 1}
                />
              </View>
              <View style={styles.tabItem}>
                <Button
                  type="tab"
                  textStyle={styles.textTab}
                  text={"Contact"}
                  onPress={() => this.handleClickTab(2)}
                  selected={this.state.tabIndex == 2}
                />
              </View>
            </View>

            {this.state.tabIndex === 0 && (
            <View style={styles.tabContent}>
              <ProductList
                page={1}
                navigation={navigation}
                onViewProductScreen={(item) => this.props.navigation("DetailScreen", item)}
                vendorProducts={true}
                vendorID={vendor.id}
              />
            </View>
            )}
            {this.state.tabIndex === 1 && (
              <View style={styles.tabContent}>
                <Review />
              </View>
            )}
            {this.state.tabIndex === 2 && (
              <View style={styles.tabContent}>
                <Text>3rd Tab</Text>
              </View>
            )}
			    </View>

        </ScrollView>
      </View>
    );
  }
}

// const mapStateToProps = ({ user, language, currency, wishList }) => ({
//   userProfile: user,
//   language,
//   currency,
//   wishListTotal: wishList.wishListItems.length,
// });

// function mergeProps(stateProps, dispatchProps, ownProps) {
//   const { dispatch } = dispatchProps;
//   const { actions } = require("@redux/CurrencyRedux");
//   return {
//     ...ownProps,
//     ...stateProps,
//     changeCurrency: (currnecy) => actions.changeCurrency(dispatch, currnecy),
//   };
// }

// export default connect(
//   mapStateToProps,
//   null,
//   mergeProps
// )(VendorProfile);

export default VendorProfile;
