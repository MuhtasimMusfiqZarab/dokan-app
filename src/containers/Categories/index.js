/** @format */

// @flow
/**
 * Created by InspireUI on 19/02/2017.
 */
import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Styles, Images, Config, Languages, Constants } from "@common";
import { Timer, toast, BlockTimer } from "@app/Omni";
import {
  Empty,
  LogoSpinner,
} from "@components";
import styles from "./styles";
import Icon from "@expo/vector-icons/FontAwesome";


class CategoriesScreen extends React.PureComponent {
  componentDidMount() {
    const { fetchCategories } = this.props;
    fetchCategories();
  }

  onRowClickHandle = (category) => {
    const { setSelectedCategory, onViewCategory } = this.props;
    BlockTimer.execute(() => {
      setSelectedCategory({
        ...category,
        mainCategory: category,
      });
      onViewCategory({ mainCategory: category });
    }, 500);
  };

  _renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.categoryContainer}
      onPress={() => this.onRowClickHandle(item)}>
      <Text style={{color: "#000"}}>{item.name}</Text>
    </TouchableOpacity>
  )

  render() {
    const { categories, selectedLayout } = this.props;

    if (categories.error) {
      return <Empty text={categories.error} />;
    }

    if (categories.isFetching) {
      return <LogoSpinner fullStretch />;
    }

    const mainCategories = categories.list.filter(
      (category) => category.parent === 0
    );
    return (
      <FlatList
        style={{flexDirection: "column"}}
        numColumns={2}
        contentContainerStyle={{alignItems: "center"}}
        data={mainCategories}
        keyExtractor={(item) => `${item.id}`}
        renderItem={this._renderItem}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    netInfo: state.netInfo,
    user: state.user,
    selectedLayout: state.categories.selectedLayout,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { netInfo } = stateProps;
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/CategoryRedux");

  return {
    ...ownProps,
    ...stateProps,
    fetchCategories: () => {
      if (!netInfo.isConnected) return toast(Languages.noConnection);
      actions.fetchCategories(dispatch);
    },
    setActiveLayout: (value) => dispatch(actions.setActiveLayout(value)),
    setSelectedCategory: (category) =>
      dispatch(actions.setSelectedCategory(category)),
  };
}

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(CategoriesScreen);
