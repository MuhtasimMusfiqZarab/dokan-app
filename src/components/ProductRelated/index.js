/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { Constants, Languages } from "@common";
import { PostLayout } from "@components";
import { connect } from "react-redux";
// import { warn } from '@app/Omni'
import styles from "./styles";

class ProductRelated extends PureComponent {
  static propTypes = {
    tags: PropTypes.any,
    fetchProductRelated: PropTypes.func,
    onViewProductScreen: PropTypes.func,
    productRelated: PropTypes.array,
  };

  componentWillMount() {
    const { tags } = this.props;
    this.props.fetchProductRelated(tags);
  }

  onRowClickHandle = (product) => this.props.onViewProductScreen({ product });

  render() {
    const { productRelated } = this.props;

    return (
      <View style={styles.wrap}>
        <View style={styles.head}>
          <Text style={styles.headTitle}>{Languages.ProductRelated}</Text>
        </View>
        <View style={styles.flatlist}>
          {productRelated.map((item, index) => (
            <PostLayout
              post={item}
              key={`key-${index}`}
              onViewPost={() => this.onRowClickHandle(item)}
              layout={Constants.Layout.threeColumn}
            />
          ))}
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ products }) => ({
  productRelated: products.productRelated,
});

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const ProductRedux = require("@redux/ProductRedux");

  return {
    ...ownProps,
    ...stateProps,
    fetchProductRelated: (product) => {
      ProductRedux.actions.fetchProductRelated(dispatch, product);
    },
  };
}

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(ProductRelated);
