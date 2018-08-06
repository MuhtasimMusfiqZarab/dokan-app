/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  I18nManager,
} from "react-native";
import { Constants, Images, Languages } from "@common";
import Icon from "react-native-vector-icons/Entypo";
import { HorizonLayout } from "@components";
import { find } from "lodash";
import styles from "./styles";

class HorizonList extends PureComponent {
  static propTypes = {
    config: PropTypes.object,
    index: PropTypes.number,
    fetchPost: PropTypes.func,
    onShowAll: PropTypes.func,
    list: PropTypes.array,
    fetchProductsByCollections: PropTypes.func,
    setSelectedCategory: PropTypes.func,
    onViewProductScreen: PropTypes.func,
    collection: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.page = 1;
    this.limit = Constants.pagingLimit;
    this.defaultList = [
      { id: 1, name: Languages.loading, images: [Images.PlaceHolder] },
      { id: 2, name: Languages.loading, images: [Images.PlaceHolder] },
      { id: 3, name: Languages.loading, images: [Images.PlaceHolder] },
    ];
  }

  /**
   * handle load more
   */
  _nextPosts = () => {
    const { config, index, fetchPost, collection } = this.props;
    this.page += 1;
    if (!collection.finish) {
      fetchPost({
        config,
        index,
        page: this.page,
      });
    }
  };

  _viewAll = () => {
    const {
      config,
      onShowAll,
      index,
      list,
      fetchProductsByCollections,
      setSelectedCategory,
    } = this.props;
    const selectedCategory = find(
      list,
      (category) => category.id === config.category
    );
    setSelectedCategory(selectedCategory);
    fetchProductsByCollections(config.category, config.tag, this.page, index);
    onShowAll(config, index);
  };

  onViewProductScreen = (product, type) => {
    this.props.onViewProductScreen({ product, type });
  };

  renderItem = ({ item, index }) => {
    const { layout } = this.props.config;

    if (item === null) return <View key="post_" />;
    return (
      <HorizonLayout
        product={item}
        key={`post-${index}`}
        onViewPost={() => this.onViewProductScreen(item, index)}
        layout={layout}
      />
    );
  };

  render() {
    const { collection, config } = this.props;
    const list =
      typeof collection.list !== "undefined" && collection.list.length !== 0
        ? collection.list
        : this.defaultList;
    const isPaging = !!config.paging;

    const renderHeader = () => (
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.tagHeader}>{Languages[config.name]}</Text>
        </View>
        <TouchableOpacity onPress={this._viewAll} style={styles.headerRight}>
          <Text style={styles.headerRightText}>{Languages.seeAll}</Text>
          <Icon
            style={styles.icon}
            color="#666"
            size={20}
            name={
              I18nManager.isRTL ? "chevron-small-left" : "chevron-small-right"
            }
          />
        </TouchableOpacity>
      </View>
    );

    return (
      <View
        style={[
          styles.flatWrap,
          config.color && { backgroundColor: config.color },
        ]}>
        {config.name && renderHeader()}
        <FlatList
          contentContainerStyle={styles.flatlist}
          data={list}
          keyExtractor={(item) => `post__${item.id}`}
          renderItem={this.renderItem}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled={isPaging}
          onEndReached={false && this._nextPosts}
        />
      </View>
    );
  }
}

export default HorizonList;
