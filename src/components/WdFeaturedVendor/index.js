import React from "react"
import {
  Text,
  View,
  Image,
  StyleSheet,
  I18nManager,
  TouchableOpacity,
  Platform,
  Dimensions
} from "react-native"
import Icon from 'react-native-vector-icons/Entypo'
import { Config, Constants, Color } from "@common";
import { ImageCache, Rating } from "@components";

const onViewVendorScreen = (props, item) => {
  props.fetchVendorProducts(item.id);
  props.onViewVendorProfileScreen(item);
}

const WdFeaturedVendor = (props) => {
  return (
    <View style={styles.container}>
      {
        props.featuredVendorList.map((item, index) => {
          return(
            <TouchableOpacity
              key={`fd-${index}`}
              style={styles.vendorDetails}
              onPress={ () => onViewVendorScreen(props, item) } >
              <View style={styles.vendorImage}>
                <ImageCache
                  uri={item.gravatar}
                  style={{width: 60, height: 60, borderRadius: 30}}/>
              </View>
              <View style={styles.vendorInfo}>
                <Text style={{fontSize: 18, marginLeft: 5, color: "#000"}}>
                  {item.store_name}
                </Text>
                <Rating rating={item.rating.rating} />
              </View>
            </TouchableOpacity>
          )
        })
      }
    </View>
  )
}

export default WdFeaturedVendor

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    width: Dimensions.get('window').width,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
    // marginTop: 18,
  },
  headerLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    // marginLeft: 15,
  },
  headerRight: {
    flex: 1 / 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 0,
    flexDirection: 'row',
  },
  headerRightText: {
    fontSize: 11,
    marginRight: 0,
    marginTop: 0,
    color: Color.wdLightGray,
    fontFamily: Constants.fontFamily,
  },
  icon: {
    marginRight: 8,
    marginTop: 2,
    backgroundColor: 'transparent',
  },
  tagHeader: {
    fontSize: 16,
    color: Color.wdDeepGray,
    letterSpacing: 2,
    fontFamily: Constants.fontFamilyLato,
    fontWeight: "bold"
  },
  vendorDetails: {
    width: "100%",
    height: 95,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 1},
      },
      android: {
        elevation: 3
      }
    }),
  },
  vendorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 1},
      },
      android: {
        elevation: 3
      }
    }),
  }
})