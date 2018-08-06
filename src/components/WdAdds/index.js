import React from 'react'
import {
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions
} from 'react-native'
import { Images } from '@common'
import { LinearGradient } from '@expo';

const WdAdds = () => (
    <View style={styles.adsContainer}>
        <View style={styles.featuredAdContainer}>
            <Image source={Images.FeaturedAd} style={{width: 70, height: 52}} />
        </View>

        <View style={styles.otherAdContainer}>
            <View style={styles.otherAd}>
                <Image source={Images.ad1} style={{width: 35, height: 26}} />
            </View>
            <View style={styles.otherAd}>
                <Image source={Images.ad2} style={{width: 35, height: 26}} />
            </View>
        </View>

    </View>
)

export default WdAdds

const styles = StyleSheet.create({
    adsContainer: {
        flexDirection: 'row',
        padding: 15
    },
    featuredAdContainer: {
        flex:2,
        backgroundColor:'#fff',
        height:250,
        alignItems:'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginRight: 5,
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowOffset: {width: 1, height: 1}
    },
    otherAdContainer: {
        flex:1,
        height:150,
        alignItems:'center',
    },
    otherAd: {
        width: '100%',
        height: 120,
        backgroundColor:'#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        shadowOpacity: 0.1,
        shadowOffset: {width: 1, height: 1},
        marginBottom: 10
    }
})