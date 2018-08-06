/** @format */

import React, { PureComponent } from "react";
import {
  Text,
  TextInput,
  ListView,
  View,
  TouchableOpacity,
  I18nManager,
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";

import { Color, Constants, Icons, Languages } from "@common";
import { FlatButton, Spinkit, ProductItem } from "@components";
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
    };
  }

  renderSearchBar = () => {
    // const closeButton = () => {
    //   return (
    //     <TouchableOpacity
    //       onPress={this.onBack}
    //       style={{ width: 50, justifyContent: "center", alignItems: "center" }}>
    //       <Icon name={Icons.Ionicons.Close} size={30} />
    //     </TouchableOpacity>
    //   );
    // };

    const searchButton = () => {
      return (
        <TouchableOpacity
          onPress={this.startNewSearch}
          style={{ width: 50, justifyContent: "center", alignItems: "center" }}>
          <Icon name={Icons.Ionicons.Search} size={24} />
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
          marginBottom: 10,
          marginTop: 20,
          borderBottomWidth: 1,
          borderColor: Color.DirtyBackground,
        }}>
        {searchInput}
        {searchButton()}
      </View>
    );
  };

  onBack = () => {
    this.setState({ text: "" });
    Keyboard.dismiss();
    this.props.onBack();
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
    const { isSubmit } = this.state;
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    return list !== "" ? (
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
          <Text style={{ textAlign: "center" }}>{Languages.NoResultError}</Text>
        )
    );
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        {this.renderSearchBar()}
        <View style={{ flex: 1 }}>
          {this.props.isFetching ? <Spinkit /> : this.renderResultList()}
        </View>
      </View>
      // <InstantSearch />
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
