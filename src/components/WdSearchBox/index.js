import React from 'react'
import {
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#F6F2F2',
        borderWidth: 1,
        margin: 10,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2}
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