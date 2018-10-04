/**
 * @format
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
  FlatList,
  RefreshControl,
  Dimensions,
} from 'react-native'
import { HorizonLayouts } from '@common'
import { connect } from 'react-redux'
import { makeGetCollections } from '@selectors/LayoutSelector'
import HList from './HList'
import {
  WdSearchBox,
  WdNewArrival, 
  WdAdds,
  WdPopularCat,
  WdFeaturedVendor
} from "@components";


class HorizonList extends PureComponent {
  static propTypes = {
    fetchAllProductsLayout: PropTypes.func.isRequired,
    fetchProductsByCollections: PropTypes.func,
    list: PropTypes.array,
    onShowAll: PropTypes.func,
    onViewProductScreen: PropTypes.func,
    collections: PropTypes.array,
    setSelectedCategory: PropTypes.func,
    isFetching: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    this._fetchAllPost()
  }

  /**
   * Fetch all products based on layouts
   */
  _fetchAllPost = () => {
    this.props.fetchAllProductsLayout()
  }

  _fetchPost = ({ config, index, page }) => {
    const { fetchProductsByCollections } = this.props
    fetchProductsByCollections(config.category, config.tag, page, index)
  }

  _renderItem = ({ item, index }) => {
    const {
      list,
      onShowAll,
      onViewProductScreen,
      collections,
      setSelectedCategory,
      fetchProductsByCollections,
    } = this.props
    return (
      <HList
        horizontal
        onViewProductScreen={onViewProductScreen}
        onShowAll={onShowAll}
        key={`taglist-${index}`}
        config={item}
        index={index}
        collection={collections[index]}
        list={list}
        fetchPost={this._fetchPost}
        fetchProductsByCollections={fetchProductsByCollections}
        setSelectedCategory={setSelectedCategory}
      />
    )
  }

  beforeList = () => (
    <WdSearchBox />
  )

  afterList = () => (
    <View>
      <WdNewArrival />
      <WdAdds />
      <WdPopularCat />
      <WdFeaturedVendor />
    </View>
    
  )

  render() {
    const { isFetching } = this.props
    return (
      <FlatList
        data={HorizonLayouts}
        // keyExtractor={(item, index) => `h_${item.layout}` || `h_${index}`}
        keyExtractor={(item, index) => `h_${index}`}
        renderItem={this._renderItem}
        scrollEventThrottle={1}
        refreshing={isFetching}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={this._fetchAllPost}
          />
        }
        ListHeaderComponent={this.beforeList}
        ListFooterComponent={this.afterList}
      />
    
    )
  }
}

const makeMapStateToProps = () => {
  const getCollections = makeGetCollections()
  const mapStateToProps = (state, props) => {
    return {
      collections: getCollections(state, props),
      // collections: state.layouts.layout,
      isFetching: state.layouts.isFetching,
      list: state.categories.list,
    }
  }
  return mapStateToProps
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps
  const { actions: LayoutActions } = require('@redux/LayoutRedux')
  const { actions: CategoryActions } = require('@redux/CategoryRedux')
  return {
    ...ownProps,
    ...stateProps,
    setSelectedCategory: (category) =>
      dispatch(CategoryActions.setSelectedCategory(category)),

    fetchProductsByCollections: (categoryId, tagId, page = 1, index) => {
      LayoutActions.fetchProductsLayout(
        dispatch,
        categoryId,
        tagId,
        page,
        index
      )
    },
    fetchAllProductsLayout: () => {
      LayoutActions.fetchAllProductsLayout(dispatch)
    },
  }
}

export default connect(makeMapStateToProps, null, mergeProps)(HorizonList)