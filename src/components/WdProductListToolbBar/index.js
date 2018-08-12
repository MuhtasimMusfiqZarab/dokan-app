/**
 * Created by weDevs 07/08/2018
*/

import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { Icon, IconIO } from "@app/Omni";
import { Icons, Constants } from "@common";
import { actions } from "@redux/ProductRedux";
import { connect } from "react-redux";
import styles from "./styles";

class WdProductListToolBar extends Component {
    state = {
        currentLayout : this.props.layoutProductScreen
    }

    layoutChangeHandler = () => {
        if (this.state.currentLayout == Constants.Layout.twoColumn) {
            this.props.switchLayoutProductPage(
                Constants.Layout.card,
                Icons.MaterialCommunityIcons.GridMode
            )
            this.setState({
                ...this.state,
                currentLayout: Constants.Layout.card
            })
            
        } else {
            this.props.switchLayoutProductPage(
                Constants.Layout.twoColumn,
                Icons.MaterialCommunityIcons.Categories
            )
            this.setState({
                ...this.state,
                currentLayout: Constants.Layout.twoColumn
            })
          
        }
    }

    render() {
        return (
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
                    <TouchableOpacity onPress={() => this.layoutChangeHandler()}>
                        <Icon
                            style={styles.toolbarIcon}
                            name={this.props.layoutChangeIcon}
                            size={18}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = ({ products }) => (
    {
        layoutChangeIcon: products.layoutChangeIcon,
        layoutProductScreen: products.layoutProductScreen
    }
);
const switchLayoutProductPage = actions.switchLayoutProductPage;
export default connect(mapStateToProps, {switchLayoutProductPage})(WdProductListToolBar);