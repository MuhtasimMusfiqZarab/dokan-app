/**
 * Created by weDevs 07/08/2018
*/

import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button
} from "react-native";
import Modal from 'react-native-modalbox';
import { Icon, IconIO, toggleFilterDrawer } from "@app/Omni";
import { Icons, Constants, Config } from "@common";
import { actions } from "@redux/ProductRedux";
import { connect } from "react-redux";
import styles from "./styles";

class WdProductListToolBar extends Component {
    state = {
      currentLayout : this.props.layoutProductScreen,
      //Modal
      isOpen: false,
      isDisabled: true,
      swipeToClose: false,
      sliderValue: 0.3
    }

    onClose = () => {
      console.log('Modal just closed');
    }
    onOpen = () => {
      console.log('Modal just opened');
    }
    onClosingState = (state) => {
      console.log('the open/close of the swipeToClose just changed');
    }

    layoutChangeHandler = () => {
      if (this.state.currentLayout == Constants.Layout.twoColumn) {
        this.props.switchLayoutProductPage(
          Constants.Layout.simple,
          Icons.MaterialCommunityIcons.GridMode
        )
        this.setState({
          ...this.state,
          currentLayout: Constants.Layout.simple
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
          <TouchableOpacity style={styles.toolbarLeft} onPress={toggleFilterDrawer}>
            <IconIO
              style={styles.toolbarIcon}
              name={Icons.Ionicons.Sort}
              size={18}
            />
            <Text style={{color: '#818995', marginLeft: 10}}>Filter</Text>
          </TouchableOpacity>
          <View style={styles.toolbarRight}>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              // onPress={Events.openModalLayout}
              onPress={() => this.refs.modal.open()}>
                <Text style={{color: '#818995', marginRight: 10}}>
                  Default Sorting
                </Text>
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

          <Modal
            style={[styles.modal]}
            ref={"modal"}
            swipeToClose={this.state.swipeToClose}
            onClosed={this.onClose}
            onOpened={this.onOpen}
            onClosingState={this.onClosingState}
            coverScreen
            backdrop={false}>
            <View style={styles.modalClose}>
              <TouchableOpacity onPress={ () => this.refs.modal.close() }>
                <IconIO name={Icons.Ionicons.Close} size={26} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalContent}>
              {
                Config.sortingTexts.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={styles.sortingTextContainer}
                      key={`${index}`}>
                      <Text style={styles.sortingText}>{item}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </Modal>
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