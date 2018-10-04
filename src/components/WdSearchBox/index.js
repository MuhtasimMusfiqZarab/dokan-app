import React from 'react'
import {
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Platform
} from 'react-native'
import { Icons } from '@common'
import { Icon } from '@app/Omni'

const WdSearchBox = () => (
  <TouchableWithoutFeedback onPress={() => alert('Search Screen')}>
    <View style={styles.searchArea}>
      <Text style={styles.searchText}>Search Product...</Text>
      <Icon
        style={styles.searchIcon}
        name={Icons.MaterialCommunityIcons.Mic}
        size={20}
      />
    </View>
  </TouchableWithoutFeedback>
)

const styles = StyleSheet.create({
  searchArea: {
    width: "90%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: "center",
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 3,
    marginTop: 20,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2}
      },
      android: {
        elevation: 3
      }
    }),
  },
  searchText: {
    paddingLeft: 10,
    color:'#9EA7A7'
  },
  searchIcon: {
    color: '#A0A9BD',
    padding: 10,
  }
})

export default WdSearchBox;