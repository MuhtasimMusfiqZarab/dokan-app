import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  I18nManager,
  TouchableOpacity,
  Platform,
  Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { Config, Constants, Color } from '@common'
import Rating from '../Rating'
import { NavigationActions } from 'react-navigation';

const navigateAction = NavigationActions.navigate({
  routeName: 'VendorProfileScreen',
});

const WdFeaturedVendor = (props) => (
    <View style={styles.container}>

      {/* <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.tagHeader}>Featured Vendor</Text>
        </View>
        <TouchableOpacity onPress={() => alert('View All')} style={styles.headerRight}>
          <Text style={styles.headerRightText}>Show All</Text>
          <Icon
            style={styles.icon}
            color={Color.wdLightGray}
            size={20}
            name={I18nManager.isRTL ? 'chevron-small-left' : 'chevron-small-right'}
          />
        </TouchableOpacity>
      </View> */}

      {
        Config.featuredVendor.map((item, index) => {
          return(
            <TouchableOpacity
              key={`fd-${index}`}
              style={styles.vendorDetails}
              onPress={ () => props.navigation.dispatch(navigateAction) } >
              <View style={styles.vendorImage}>
                <Text style={{fontSize: 24, color: item.color}}>
                  {item.text}
                </Text>
              </View>
              <View style={styles.vendorInfo}>
                <Text style={{fontSize: 18, marginLeft: 5, color: "#000"}}>
                  {item.name}
                </Text>
                <Rating rating={item.rating} />
              </View>
            </TouchableOpacity>
          )
        })
      }

    </View>
)

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