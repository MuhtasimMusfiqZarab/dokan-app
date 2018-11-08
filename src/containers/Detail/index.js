/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  View,
  Animated,
  Image,
  Share,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import { Timer, getProductImage, currencyFormatter, warn, CustomIcon } from "@app/Omni";
import {
  Button,
  WebView,
  ProductSize as ProductAttribute,
  ProductColor,
  ProductRelated,
  Rating,
  ImageCache,
  ReviewComment,
  Review
} from "@components";
import Swiper from "react-native-swiper";
import {
  Styles,
  Languages,
  Color,
  Config,
  Constants,
  Events,
  Icons
} from "@common";
import Modal from "react-native-modalbox";
import { find, filter } from "lodash";
import * as Animatable from "react-native-animatable";
import AttributesView from "./AttributesView";
import ReviewTab from "./ReviewTab.js";
import styles from "./ProductDetail_Style";

// weDevs
import striptags from 'striptags';
import Accordion from 'react-native-collapsible/Accordion';
import { LinearGradient } from '@expo';
import { Icon } from "@app/Omni";
// end weDevs

const PRODUCT_IMAGE_HEIGHT = 350;
const NAVI_HEIGHT = 64;

const BACON_IPSUM = 'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';


class Detail extends PureComponent {
  static propTypes = {
    product: PropTypes.any,
    getProductVariations: PropTypes.func,
    productVariations: PropTypes.any,
    onViewCart: PropTypes.func,
    addCartItem: PropTypes.func,
    removeWishListItem: PropTypes.func,
    addWishListItem: PropTypes.func,
    cartItems: PropTypes.any,
    navigation: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
      tabIndex: 0,
      selectedAttribute: [],
      selectedColor: 0,
      selectVariation: null,
      selectedItems : [],
      activeSection: [0]
    };

    this.productInfoHeight = PRODUCT_IMAGE_HEIGHT;
    this.inCartTotal = 0;
    this.isInWishList = false;

  }

  componentDidMount() {
    this.getCartTotal(this.props);
    this.getWishList(this.props);

    this.props.getProductVariations(this.props.product);
    this.getProductAttribute(this.props.product);
  }

  componentWillReceiveProps(nextProps) {
    this.getCartTotal(nextProps, true);
    this.getWishList(nextProps, true);

    // this important to update the variations from the product as the Life cycle is not run again !!!

    if (this.props.product.id != nextProps.product.id) {
      this.props.getProductVariations(nextProps.product);
      this.getProductAttribute(nextProps.product);
      this.forceUpdate();
    }

    if (this.props.productVariations !== nextProps.productVariations) {
      this.updateSelectedVariant(nextProps.productVariations);
    }
  }

  /**
   *  Accordion by weDevs
  */
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  accordionDescription = () => {
    const productDescription = striptags(this.props.product.description);
    return (
      <View>
        <ImageCache
          uri={this.props.product.images[0].src}
          style={
            {
              width: '100%',
              height: 200,
              borderRadius: 5,
              marginBottom: 20,
            }
          }
        />
        <Text style={styles.accordionDescriptionText}>
          {productDescription}
        </Text>
      </View>
    )
  }

  accordionShipping = () => {
    return (
      <View>
        <Text style={{color: "#19B491", fontSize: 12, marginBottom: 10}}>
          Ready to ship in 1 business day from Spain
        </Text>

        <Text
          style={
            {
              color: "#717A87",
              fontSize: 14,
              fontWeight: "bold",
              marginBottom: 10
            }
          }
        >
          Shipping Calculation
        </Text>

      </View>
    )
  }

  accordionCustomerReview = () => {
    return (
      <View style={{alignItems: "center"}}>
        {
          Config.dummyReview.map((item, index) => {
            return (
              <ReviewComment
                key={`review-${index}`}
                item={item} />
            )
          })
        }
        <Review />
      </View>
    )
  }

  ACCORDION_CONTENT = [
    {
      title: 'Description',
      content: this.accordionDescription(),
      fromColor: "#00C6FB",
      toColor: "#005BEA",
      icon: "text",
    },
    {
      title: 'Shipping',
      content: this.accordionShipping(),
      fromColor: "#C444FB",
      toColor: "#5B56D7",
      icon: "ship"
    },
    {
      title: 'Customer Review',
      content: this.accordionCustomerReview(),
      fromColor: "#FF9472",
      toColor: "#F2709C",
      icon: "chat"
    },
    {
      title: 'Vendor Info',
      // content: BACON_IPSUM,
      fromColor: "#7ED500",
      toColor: "#00BF8D",
      icon: "supermarket"
    },
    {
      title: 'Related Products',
      // content: BACON_IPSUM,
      fromColor: "#6EACFF",
      toColor: "#907CFF",
      icon: "box"
    },
  ];

  renderAccordionHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={
          [styles.accordionHeader,
            isActive ?
            styles.accordionHeaderActive :
            styles.accordionHeaderInActive
          ]
        }
        transition={["backgroundColor", "borderRadius"]}
      >
        <LinearGradient
          colors={[section.fromColor, section.toColor]}
          start={ {x: 0.0, y: 0.5} }
          end={ {x: 1.0, y: 0.5}}
          locations={[0.0, 1.0]}
          style={styles.accordionHeaderIcon}
        >
          <CustomIcon name={section.icon} size={20} color="#fff" />
        </LinearGradient>
        <Text style={styles.accordionHeaderText}>{section.title}</Text>
        <Text style={{position: 'absolute', right: 15}}>
          <Icon
            style={
              {
                color: "#BECDD0"
              }
            }
            name={
              isActive ?
              Icons.MaterialCommunityIcons.DownChevron :
              Icons.MaterialCommunityIcons.ForwardChevron
            }
            size={20}
          />
        </Text>
      </Animatable.View>
    );
  };

  renderAccordionContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={
          [styles.accordionContent,
            isActive ?
            styles.accordionHeaderActive :
            styles.accordionContentInActive
          ]
        }
        // transition="backgroundColor"
      >
        {section.content}
      </Animatable.View>
    );
  };
  /************** End accordion by wedevs **********/

  getProductAttribute = (product) => {
    this.productAttributes = product.attributes;
    const defaultAttribute = product.default_attributes;
    // console.log(product);
    if (typeof this.productAttributes !== "undefined") {
      this.productAttributes.map((attribute) => {
        const selectedAttribute = defaultAttribute.find(
          (item) => item.name === attribute.name
        );
        attribute.selectedOption =
          typeof selectedAttribute !== "undefined"
            ? selectedAttribute.option.toLowerCase()
            : "";
      });
    }
  };

  closePhoto = () => {
    this._modalPhoto.close();
  };

  openPhoto = () => {
    this._modalPhoto.open();
  };

  handleClickTab(tabIndex) {
    this.setState({ tabIndex });
    Timer.setTimeout(() => this.state.scrollY.setValue(0), 50);
  }

  getColor = (value) => {
    const color = value.toLowerCase();
    if (typeof Color.attributes[color] !== "undefined") {
      return Color.attributes[color];
    }
    return "#333";
  };

  share = () => {
    Share.share({
      message: this.props.product.description.replace(/(<([^>]+)>)/gi, ""),
      url: this.props.product.permalink,
      title: this.props.product.name,
    });
  };

  addToCart = (go = false) => {
    const { addCartItem, product, onViewCart } = this.props;

    if (this.inCartTotal < Constants.LimitAddToCart) {
      addCartItem(product, this.state.selectVariation);
    } else {
      alert(Languages.ProductLimitWaring);
    }
    if (go) onViewCart();
  };

  addToWishList = (isAddWishList) => {
    if (isAddWishList) {
      this.props.removeWishListItem(this.props.product);
    } else this.props.addWishListItem(this.props.product);
  };

  getCartTotal = (props, check = false) => {
    const { cartItems } = props;

    if (cartItems != null) {
      if (check === true && props.cartItems === this.props.cartItems) {
        return;
      }

      this.inCartTotal = cartItems.reduce((accumulator, currentValue) => {
        if (currentValue.product.id == this.props.product.id) {
          return accumulator + currentValue.quantity;
        }
        return 0;
      }, 0);

      const sum = cartItems.reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantity,
        0
      );
      const params = this.props.navigation.state.params;
      params.cartTotal = sum;
      this.props.navigation.setParams(params);
    }
  };

  getWishList = (props, check = false) => {
    const { product, navigation, wishListItems } = props;

    if (props.hasOwnProperty("wishListItems")) {
      if (check == true && props.wishListItems == this.props.wishListItems) {
        return;
      }
      this.isInWishList =
        find(props.wishListItems, (item) => item.product.id == product.id) !=
        "undefined";

      const sum = wishListItems.length;
      const params = navigation.state.params;
      params.wistListTotal = sum;
      this.props.navigation.setParams(params);
    }
  };

  onSelectAttribute = (attributeName, option) => {
    const selectedAttribute = this.productAttributes.find(
      (item) => item.name === attributeName
    );
    selectedAttribute.selectedOption = option.toLowerCase();

    this.updateSelectedVariant(this.props.productVariations);
  };

  updateSelectedVariant = (productVariations) => {
    const selectedAttribute = filter(
      this.productAttributes,
      (item) => typeof item.selectedOption !== "undefined"
    );

    // if (productVariations) {
    productVariations &&
      productVariations.map((variant) => {
        let matchCount = 0;
        selectedAttribute.map((selectAttribute) => {
          const isMatch = find(
            variant.attributes,
            (item) =>
              item.name === selectAttribute.name &&
              item.option.toLowerCase() ===
                selectAttribute.selectedOption.toLowerCase()
          );
          if (isMatch !== undefined) {
            matchCount += 1;
          }
        });
        if (matchCount === selectedAttribute.length) {
          this.setState({ selectVariation: variant });
        }
      });
    // }
    this.forceUpdate();
  };

  /**
   * render Image top
   */
  _renderImages = () => {
    const imageScale = this.state.scrollY.interpolate({
      inputRange: [-300, 0, NAVI_HEIGHT, this.productInfoHeight / 2],
      outputRange: [2, 1, 1, 0.7],
      extrapolate: "clamp",
    });
    const { width } = Dimensions.get('window');
    const scrollX = new Animated.Value(0);
    let position = Animated.divide(scrollX, width);
    return (
      <View style={{ height: PRODUCT_IMAGE_HEIGHT, width: Constants.Window.width }}>
        <ScrollView
          // style={{ height: PRODUCT_IMAGE_HEIGHT, width: Constants.Window.width }}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          horizontal
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }]
          )}
          scrollEventThrottle={16}
        >
          {this.props.product.images.map((image, index) => (
            <TouchableOpacity
              activeOpacity={0.9}
              key={index}
              onPress={this.openPhoto.bind(this)}>
              <Animated.Image
                source={{ uri: getProductImage(image.src, Styles.width) }}
                style={[
                  styles.imageProduct,
                  { transform: [{ scale: imageScale }] },
                ]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View
          style={{ flexDirection: "row", justifyContent: "center" }}
          >
          {this.props.product.images.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp'
            });
            let bgColor = position.interpolate({
              inputRange: [0, 1],
              outputRange: ["#C8CCD5", "red"]
            })

            return (
              <Animated.View
                key={i}
                style={
                  {
                    opacity,
                    height: 8,
                    width: 8,
                    backgroundColor: bgColor,
                    margin: 4,
                    borderRadius: 4
                  }
                }
              />
            );
          })}
        </View>
      </View>
    );
  };

  /**
   * Render tabview detail
   */
  _renderTabView = () => {
    return (
      <View style={styles.tabView}>
        <View
          style={[
            styles.tabButton,
            Constants.RTL && { flexDirection: "row-reverse" },
          ]}>
          <View style={styles.tabItem}>
            <Button
              type="tab"
              textStyle={styles.textTab}
              text={Languages.AdditionalInformation}
              onPress={() => this.handleClickTab(0)}
              selected={this.state.tabIndex == 0}
            />
          </View>
          <View style={styles.tabItem}>
            <Button
              type="tab"
              textStyle={styles.textTab}
              text={Languages.ProductFeatures}
              onPress={() => this.handleClickTab(1)}
              selected={this.state.tabIndex == 1}
            />
          </View>
          <View style={styles.tabItem}>
            <Button
              type="tab"
              textStyle={styles.textTab}
              text={Languages.ProductReviews}
              onPress={() => this.handleClickTab(2)}
              selected={this.state.tabIndex == 2}
            />
          </View>
        </View>
        {this.state.tabIndex === 0 && (
          <View style={styles.description}>
            <WebView html={`<p>${this.props.product.description}</p>`} />
          </View>
        )}
        {this.state.tabIndex === 1 && (
          <AttributesView attributes={this.props.product.attributes} />
        )}
        {this.state.tabIndex === 2 && (
          <ReviewTab product={this.props.product} />
        )}
      </View>
    );
  };

  _writeReview = () => {
    const { product, userData, onLogin } = this.props;
    if (userData) {
      Events.openModalReview(product);
    } else {
      onLogin();
    }
  };

  render() {
    const { selectVariation } = this.state;
    const {
      wishListItems,
      onViewProductScreen,
      product,
      cartItems,
    } = this.props;

    const isAddToCart = !!(
      cartItems &&
      cartItems.filter((item) => item.product.id === product.id).length > 0
    );
    const isAddWishList =
      wishListItems.filter((item) => item.product.id === product.id).length > 0;
    const productPrice = currencyFormatter(
      selectVariation ? selectVariation.price : product.price
    );
    const productRegularPrice = currencyFormatter(
      selectVariation ? selectVariation.regular_price : product.regular_price
    );
    const isOnSale = selectVariation
      ? selectVariation.on_sale
      : product.on_sale;

    // warn(product.description);
    // console.log(product.description);

    const renderButtons = () => (
      <View
        style={[
          styles.bottomView,
          Constants.RTL && { flexDirection: "row-reverse" },
        ]}>
        <View style={styles.buttonContainer}>
          <Button
            type="image"
            source={require("@images/icons/icon-share.png")}
            imageStyle={styles.imageButton}
            buttonStyle={styles.buttonStyle}
            onPress={this.share}
          />
          <Button
            type="image"
            isAddWishList={isAddWishList}
            source={require("@images/icons/icon-love.png")}
            imageStyle={styles.imageButton}
            buttonStyle={styles.buttonStyle}
            onPress={() => this.addToWishList(isAddWishList)}
          />
          <Button
            type="image"
            isAddToCart={isAddToCart}
            source={require("@images/icons/icon-cart.png")}
            imageStyle={styles.imageButton}
            disabled={!product.in_stock}
            buttonStyle={styles.buttonStyle}
            onPress={() => product.in_stock && this.addToCart(true)}
          />
        </View>

        <Button
          text={product.in_stock ? Languages.BUYNOW : Languages.OutOfStock}
          style={[styles.btnBuy, !product.in_stock && styles.outOfStock]}
          textStyle={styles.btnBuyText}
          disabled={!product.in_stock}
          onPress={() => {
            product.in_stock && this.addToCart(true);
          }}
        />
      </View>
    );

    const renderRating = () => {
      return (
        <View style={styles.price_wrapper}>
          <Rating rating={Number(product.average_rating)} size={19} />
          <Text style={[styles.textRating, { color: Color.blackTextDisable }]}>
            {`(${product.rating_count})`}
          </Text>
          <TouchableOpacity onPress={this._writeReview}>
            <Text
              style={[styles.textRating, { color: Color.blackTextDisable }]}>
              {Languages.writeReview}
            </Text>
          </TouchableOpacity>
        </View>
      );
    };

    const renderTitle = () => (
      <View style={{ justifyContent: "center", marginTop: 6, marginBottom: 8 }}>
        <Text style={styles.productName}>{product.name}</Text>
        <Rating rating={Number(product.average_rating)} size={19} />
        <Text style={[styles.textRating, { color: Color.blackTextDisable }]}>
          {`(${product.rating_count})`}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 2,
            marginBottom: 4,
          }}>
          <Animatable.Text animation="fadeInDown" style={styles.productPrice}>
            {productPrice}
          </Animatable.Text>
          {isOnSale && (
            <Animatable.Text animation="fadeInDown" style={styles.sale_price}>
              {productRegularPrice}
            </Animatable.Text>
          )}
        </View>
        <Text>
          <WebView html={`<p>${this.props.product.description}</p>`} />
        </Text>
      </View>
    );

    const renderAttributes = () => {
      return (
        <View>
          {typeof this.productAttributes !== "undefined" &&
            this.productAttributes.map((attribute, attrIndex) => (
              <View
                key={`attr${attrIndex}`}
                style={[
                  styles.productSizeContainer,
                  Constants.RTL && { flexDirection: "row-reverse" },
                ]}>
                {
                  attribute.name !== Constants.productAttributeColor &&
                  attribute.options.map((option, index) => (
                    <ProductAttribute
                      key={index}
                      text={option}
                      style={styles.productSize}
                      onPress={() =>
                        this.onSelectAttribute(attribute.name, option)
                      }
                      selected={
                        attribute.selectedOption.toLowerCase() ===
                        option.toLowerCase()
                      }
                    />
                  ))
                }
              </View>
            ))
          }
        </View>
      );
    };

    const renderProductColor = () => {
      if (typeof this.productAttributes === "undefined") {
        return;
      }

      const productColor = this.productAttributes.find(
        (item) => item.name === Constants.productAttributeColor
      );
      if (productColor) {
        const translateY = this.state.scrollY.interpolate({
          inputRange: [0, PRODUCT_IMAGE_HEIGHT / 2, PRODUCT_IMAGE_HEIGHT],
          outputRange: [0, -PRODUCT_IMAGE_HEIGHT / 3, -PRODUCT_IMAGE_HEIGHT],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={[
              styles.productColorContainer,
              { transform: [{ translateY }] },
            ]}>
            {productColor.options.map((option, index) => (
              <ProductColor
                key={index}
                color={this.getColor(option)}
                onPress={() =>
                  this.onSelectAttribute(
                    Constants.productAttributeColor,
                    option
                  )
                }
                selected={
                  productColor.selectedOption.toLowerCase() ===
                  option.toLowerCase()
                }
              />
            ))}
          </Animated.View>
        );
      }
    };

    const renderProductRelated = () => (
      <ProductRelated
        onViewProductScreen={onViewProductScreen}
        tags={product.related_ids}
      />
    );

    //weDevs
    const renderVendorInfo = () => {
      const vendorName = this.props.product.store? this.props.product.store.name : ""
      const vendorInitial = vendorName.charAt(0);
      if (vendorName) {
        return (
          <View style={styles.topVendorInfoContainer}>
            <View style={styles.topVendorNameInitials}>
              <Text style={{color: "white"}}>
                {vendorInitial}
              </Text>
            </View>
            <View style={{marginLeft: 15}}>
              <Text>
                {vendorName}
              </Text>
            </View>
          </View>
        )
      } else {
        return (
          <View style={styles.topVendorInfoContainer}>
            <Text style={{alignSelf: "center"}}>Vendor Info Not found</Text>
          </View>
        )
      }
    };

    const renderProductDetails = () => {
      const productDescription = striptags(this.props.product.short_description);
      debugger;
      return(
        <View style={styles.productDetailContainer}>

          <Text style={styles.productName}>{product.name}</Text>
          <Rating rating={Number(product.average_rating)} size={15} />

          <View style={styles.productMetaContainer}>

            <View style={styles.productPriceContainer}>
              {isOnSale && (
                <Text style={styles.sale_price}>
                  {productRegularPrice}
                </Text>
              )}
              <Text style={styles.productPrice}>
                {productPrice}
              </Text>
            </View>

            <View style={styles.productBadgeContainer}>
              <View style={styles.productBadge}>
                <Text style={styles.productBadgeNumber}>86</Text>
                <Text style={styles.productBadgeText}>Order</Text>
              </View>
              <View style={styles.productBadge}>
                <Text style={styles.productBadgeNumber}>130</Text>
                <Text style={styles.productBadgeText}>Wishlist</Text>
              </View>
            </View>

          </View>

          <Text style={styles.productDescription}>
            {productDescription}
          </Text>

          <Accordion
            activeSections={this.state.activeSection}
            sections={this.ACCORDION_CONTENT}
            touchableComponent={TouchableWithoutFeedback}
            renderHeader={this.renderAccordionHeader}
            renderContent={this.renderAccordionContent}
            duration={400}
            onChange={this.setSection}
          />

        </View>
      )
    
    };

    return (
      <View style={styles.container}>
        <Animated.ScrollView
          style={styles.listContainer}
          scrollEventThrottle={1}
          onScroll={(event) => {
            this.state.scrollY.setValue(event.nativeEvent.contentOffset.y);
          }}
        >
          <View
            style={[styles.productInfo]}
            onLayout={(event) =>
              (this.productInfoHeight = event.nativeEvent.layout.height)
            }
          >
            {renderVendorInfo()}
            {this._renderImages()}
            {renderAttributes()}
          </View>

          {renderProductDetails()}

          {/* {this._renderTabView()} */}
        </Animated.ScrollView>
        {renderProductColor()}

        {/* {Config.showAdmobAds && <AdMob />} */}
        {renderButtons()}

        <Modal
          ref={(com) => (this._modalPhoto = com)}
          swipeToClose={false}
          animationDuration={200}
          style={styles.modalBoxWrap}
        >
          <Swiper
            height={Constants.Window.height}
            activeDotStyle={styles.dotActive}
            removeClippedSubviews={false}
            dotStyle={styles.dot}
            paginationStyle={{ zIndex: 9999, bottom: -15 }}>
            {product.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: getProductImage(image.src, Styles.width) }}
                style={styles.imageProductFull}
              />
            ))}
          </Swiper>

          <TouchableOpacity
            style={styles.iconZoom}
            onPress={this.closePhoto.bind(this)}>
            <Text style={styles.textClose}>{Languages.close}</Text>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.carts.cartItems,
    wishListItems: state.wishList.wishListItems,
    productVariations: state.products.productVariations,
    userData: state.user.user,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const CartRedux = require("@redux/CartRedux");
  const WishListRedux = require("@redux/WishListRedux");
  const ProductRedux = require("@redux/ProductRedux");
  return {
    ...ownProps,
    ...stateProps,
    addCartItem: (product, variation) => {
      CartRedux.actions.addCartItem(dispatch, product, variation);
    },
    addWishListItem: (product) => {
      WishListRedux.actions.addWishListItem(dispatch, product);
    },
    removeWishListItem: (product) => {
      WishListRedux.actions.removeWishListItem(dispatch, product);
    },
    getProductVariations: (product) => {
      ProductRedux.actions.getProductVariations(dispatch, product);
    },
  };
}

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(Detail);
