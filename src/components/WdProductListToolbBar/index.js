/**
 * Created by weDevs 07/08/2018
*/

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Icon, IconIO } from "@app/Omni";
import { Icons } from "@common";
import { connect } from "react-redux";

const WdProductListToolBar = () => (
    <View style={styles.toolbarContainer}>
        <TouchableOpacity style={styles.toolbarLeft}>
            <IconIO
                style={styles.toolbarIcon}
                name={Icons.Ionicons.Sort}
                size={18}
            />
            <Text style={{color: '#818995', marginLeft: 10}}>Filter</Text>
        </TouchableOpacity>
        <View style={styles.toolbarRight}>
            <TouchableOpacity style={{flexDirection: 'row'}}>
                <Text style={{color: '#818995', marginRight: 10}}>Default Sorting</Text>
                <IconIO
                    style={styles.toolbarIcon}
                    name={Icons.Ionicons.Down}
                    size={18}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon
                    style={styles.toolbarIcon}
                    name={Icons.MaterialCommunityIcons.Categories}
                    size={18}
                />
            </TouchableOpacity>
        </View>
    </View>
)

export default WdProductListToolBar;

const styles = StyleSheet.create({
    toolbarContainer: {
        height: 50,
        padding: 15,
        flexDirection: 'row',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 1}
    },
    toolbarLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    toolbarRight: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    toolbarIcon: {
        color: '#A0A9BD',
    }
})

