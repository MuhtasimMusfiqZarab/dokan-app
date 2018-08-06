import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  I18nManager,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { Config, Constants } from '@common'
import Rating from '../Rating'

const WdFeaturedVendor = () => (
    <View style={styles.container}>

        <View style={styles.header}>
            <View style={styles.headerLeft}>
                <Text style={styles.tagHeader}>Featured Vendor</Text>
            </View>
            <TouchableOpacity onPress={() => alert('View All')} style={styles.headerRight}>
                <Text style={styles.headerRightText}>Show All</Text>
                <Icon
                    style={styles.icon}
                    color="#666"
                    size={20}
                    name={I18nManager.isRTL ? 'chevron-small-left' : 'chevron-small-right'}
                />
            </TouchableOpacity>
        </View>

        {
            Config.faeturedVendor.map((item, index) => {
                return(
                    <View key={`fd-${index}`} style={styles.vendorDetails}>
                        <View style={styles.vendorImage}>
                            <Text style={{fontSize: 24, color: item.color}}>
                                {item.text}
                            </Text>
                        </View>
                        <View style={styles.vendorInfo}>
                            <Text style={{fontSize: 20, marginLeft: 5}}>
                                {item.name}
                            </Text>
                            <Rating rating={item.rating} />
                        </View>
                    </View>
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
        alignItems: 'center',
        justifyContent: 'center'
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
        color: '#666',
        fontFamily: Constants.fontFamily,
    },
    icon: {
        marginRight: 8,
        marginTop: 2,
        backgroundColor: 'transparent',
    },
    tagHeader: {
        fontSize: 16,
        color: '#666',
        letterSpacing: 2,
        fontFamily: Constants.fontHeader,
    },
    vendorDetails: {
        width: '100%',
        height: 95,
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 1}
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
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 1}
    }
})