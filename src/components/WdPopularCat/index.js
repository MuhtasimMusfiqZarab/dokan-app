import React from 'react'
import {
  Text,
  Image,
  View,
  StyleSheet,
  Platform
} from 'react-native'
import { Config } from '@common'
import { ButtonIndex } from '@components'
import { NavigationActions } from 'react-navigation';

const navigateAction = NavigationActions.navigate({
  routeName: 'CategoriesScreen',
});

const WdPopularCat = (props) => (
  <View style={styles.popCatWrapper}>
    <View style={styles.popCatContainer}>
      <View style={{width: '100%', padding:5, marginBottom: 10}}>
        <Text style={{color: '#79828F', fontSize: 18}}>Popular Categories</Text>
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
              }>
                <Image source={category.icon} style={{width: 35, height: 29}} />
                <Text style={{color: '#808894', marginTop: 5}}>{category.Name}</Text>
            </View>
          )
        })
      }

      <View style={styles.btnContainer}>
        <ButtonIndex
          onPress={() => props.navigation.dispatch(navigateAction)}
          type="text"
          text="View all Categories"
          textColor="#79828F"
          containerColor="#fff"
          containerStyle={
            {
              width: '70%',
              ...Platform.select({
                ios: {
                  shadowColor: '#000',
                  shadowOpacity: 0.1,
                  shadowOffset: {width: 1, height: 1},
                },
                android: {
                  elevation: 3
                }
              }),
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
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 1, height: 1},
      },
      android: {
        elevation: 3
      }
    }),
  },
  popCat: {
    margin: 3,
    borderRadius: 3,
    width: '31%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnContainer: {
    width: '100%',
    paddingTop: 10,
    justifyContent:'center',
    alignItems: 'center',
    marginBottom: 10
  }
})