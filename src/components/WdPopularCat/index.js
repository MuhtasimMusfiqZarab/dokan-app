import React from 'react'
import {
  Text,
  Image,
  View,
  StyleSheet,
} from 'react-native'
import Config from '../../common/wdConfig'
import Button from '../Button'

const WdPopularCat = () => (
    <View style={styles.popCatWrapper}>
        <View style={styles.popCatContainer}>
            <View style={{width: '100%', padding:5, marginBottom: 10}}>
                <Text style={{color: '#79828F', fontSize: 20}}>Popular Categories</Text>
            </View>
            {
                Config.popularCat.map((category, index) => {
                    return (
                        <View
                            key={`pcat-${index}`}
                            style={
                                [
                                    styles.popCat,
                                    {
                                        backgroundColor: category.colorRGB
                                    }
                                ]
                            }
                        >
                            <Image source={category.icon} style={{width: 35, height: 29}} />
                            <Text style={{color: '#808894', marginTop: 5}}>{category.Name}</Text>
                        </View>
                    )
                })
            }

            <View style={{width: '100%', paddingTop: 10, justifyContent:'center', alignItems: 'center', marginBottom: 10}}>
                <Button
                    type="text"
                    text="View all Categories"
                    textColor="#79828F"
                    containerColor="#fff"
                    containerStyle={
                        {
                            width: '70%',
                            shadowColor: 'black',
                            shadowOpacity: 0.1,
                            shadowOffset: {width: 1, height: 1},
                        }
                    }
                />
            </View>
        </View>
    </View>
)

export default WdPopularCat

const styles = StyleSheet.create({
    popCatWrapper: {
        padding: 15
    },
    popCatContainer: {
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        flexWrap: 'wrap',
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowOffset: {width: 1, height: 1},
        marginBottom: 10
    },
    popCat: {
        margin: 3,
        borderRadius: 3,
        width: '31%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    }
})