/** @format */

import React, { Component, PureComponent } from "react";
import {
  FlatList,
  Image,
  Platform,
  RefreshControl,
  Animated,
  View,
  TouchableOpacity,
  Text
} from "react-native";
import {
  PostLayout,
  AnimatedHeader,
  Spinkit,
  WdProductListToolBar,
  WdModalSorting,
} from "@components";
import { Constants, Languages } from "@common";
import { connect } from "react-redux";
import styles from "./styles";

// const HEADER_MIN_HEIGHT = 40;
// const HEADER_SCROLL_DISTANCE =
//   Constants.Window.headerHeight - HEADER_MIN_HEIGHT;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class ProductList extends Component {
  state = {
    scrollY: new Animated.Value(0),
  };

  constructor(props) {
    super(props);

    this.page = props.page ? props.page : 0;
    this.limit = Constants.pagingLimit;
    this.isProductList = props.type === undefined;
  }

  componentWillMount() {
    // if (this.props.config.name === "featuredProducts") {
    //   this.props.navigation.setParams({ title: "Product List" });
    // } else if (this.props.config.name === "bestSellingProducts") {
    //   this.props.navigation.setParams({ title: "Product List" });
    // } else if (this.props.config.name === "bestSellingProducts") {
    //   this.props.navigation.setParams({ title: "Product List" });
    // } else {
    //   this.props.navigation.setParams({ title: "Product List" });
    // }
    
    this.props.navigation.setParams({ title: "Product List" });
  }

  componentDidMount() {
    this.page === 0 && this.fetchData();
  }

  shouldComponentUpdate(nextProps) {
    return(
      nextProps.layoutProductScreen !== this.props.layoutProductScreen ||
      nextProps.list !== this.props.list
    )
  }

  fetchData = (reload = false) => {
    if (reload) {
      this.page = 1;
    }
    const { config, index, fetchProductsByCollections } = this.props;
    fetchProductsByCollections(config.category, config.tag, this.page, index);
  };

  handleLoadMore = () => {
    if (!this.props.finish) {
      this.page += 1;
      this.fetchData();
    }
  };

  onRowClickHandle = (item) => {
    if (this.isProductList) {
      this.props.onViewProductScreen({ product: item });
    } else {
      this.props.onViewNewsScreen({ post: item });
    }
  };

  renderItem = ({ item, index }) => {
    if (item == null) return <View />;

    return (
      <PostLayout
        post={item}
        type={this.props.type}
        key={`key-${index}`}
        onViewPost={() => this.onRowClickHandle(item, this.props.type)}
        layout={
          this.props.vendorID ? 3 : this.props.layoutProductScreen
        }
      />
    );
  };

  headerComponent = () => {
    const { headerImage } = this.props;

    return (
      <View style={styles.headerView}>
        {headerImage && (
          <Image style={styles.bannerImage} source={headerImage} />
        )}
      </View>
    );
  };

  render() {
    const { list, config, isFetching, navigation } = this.props;
    
    const renderFooter = () => isFetching && <Spinkit />;
    return (
      <View style={styles.listView}>
        {/* <AnimatedHeader
          scrollY={this.state.scrollY}
          hideIcon
          label={Languages[config.name]}
          navigation={navigation}
        /> */}
        {this.props.showToolBar && <WdProductListToolBar />}
        <AnimatedFlatList
          contentContainerStyle={styles.flatlist}
          data={list}
          keyExtractor={(item, index) => `${item.id} || ${index}`}
          renderItem={this.renderItem}
          ListHeaderComponent={this.headerComponent}
          ListFooterComponent={renderFooter()}
          refreshing={isFetching}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={() => this.fetchData(true)}
            />
          }
          onEndReachedThreshold={100}
          onEndReached={(distance) =>
            distance.distanceFromEnd > 100 && this.handleLoadMore()
          }
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: Platform.OS !== "android" }
          )}
        />
        {this.props.showSortingModal && <WdModalSorting />}
      </View>
    );
  }
}

const mapStateToProps = ({ layouts, products, vendors }, ownProp) => {
  if (ownProp.vendorID) {
    const list = vendors.vendorProducts;
    const isFetching = vendors.isFetching;
    const finish = true;

    return { list, isFetching, finish };
  } else {
    const index = ownProp.index;
    const list = layouts.layout[index].list;
    const isFetching = layouts.layout[index].isFetching;
    const finish = layouts.layout[index].finish;
    const layoutProductScreen = products.layoutProductScreen;

    return { list, isFetching, finish, layoutProductScreen };
  }
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions: LayoutActions } = require("@redux/LayoutRedux");
  const { actions: VendorActions } = require("@redux/VendorRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchProductsByCollections: (category_id, tag_id, page, index) => {
      LayoutActions.fetchProductsLayoutTagId(
        dispatch,
        category_id,
        tag_id,
        page,
        index
      );
    },
    fetchVendorProducts: (vendorID) => {
      VendorActions.fetchVendorProducts( dispatch, vendorID );
    }
  };
};

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(ProductList);
