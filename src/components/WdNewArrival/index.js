import React from 'react'
import {
  Text,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native'
import {Images} from '@common'
import {LinearGradient} from '@expo';

const WdNewArrival = () => (
    <LinearGradient
        colors={['#907CFF', '#6EACFF']}
        start={ {x: 0.0, y: 0.5} }
        end={ {x: 1.0, y: 0.5}}
        locations={[0.0, 1.0]}
        style={styles.gradientArea}
    >
        <Text style={ styles.text}> New Arrivals </Text>
        <Image source={Images.NewArrival} style={styles.newArrivalImg} />
    </LinearGradient>
)

export default WdNewArrival

const styles = StyleSheet.create({
    gradientArea: {
        width: Dimensions.get('window').width,
        height: 250,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        backgroundColor: 'transparent',
        fontSize: 22,
        color: '#fff',
    },
    newArrivalImg: {
        width: 175,
        height: 144
    }
})