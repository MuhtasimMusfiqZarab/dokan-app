/**
 * Created by weDevs on 27/09/2018.
 *
 * @format
 */

import React, { PureComponent } from "react";
import { View, Text, Image, StyleSheet } from 'react-native';
import { Back, HeaderRight } from "./IconNav";
import { LinearGradient } from "@expo";

import { Images, Config, Constants, Color, Styles, Languages } from "@common";
import { WishList } from "@containers";

export default class AboutUsScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: "About Us",
    headerLeft: Back(navigation),
    headerRight: HeaderRight(navigation),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.toolbar,
    headerTitleStyle: Styles.Common.headerTitleStyle,

  });

  render() {
    const { navigate } = this.props.navigation;
    // const rootNavigation = this.props.screenProps.rootNavigation;

    return (
      <View style={{flex: 1, alignItems: "center"}}>
        <View style={styles.slimTabContainer}>

          <View style={styles.slimTabCotainer}>
            <LinearGradient
              style={styles.slimTabCircle}
              colors={["#F9769D", "#BB6DF7"]}>
              <Image
                source={Images.IcVision}
                style={{width: 25, height: 25}}
                resizeMode="contain" />
            </LinearGradient>
            <View style={styles.vendorInfo}>
              <Text style={{fontSize: 18, marginLeft: 5}}>
                Vision
              </Text>
              <Text
                style={{color:"#818995", marginLeft: 5, marginTop: 10}}>
                Short Description
              </Text>
            </View>
          </View>

          <View style={styles.slimTabCotainer}>
            <LinearGradient
              style={styles.slimTabCircle}
              colors={["#32D1DC", "#6F9BF5"]}>
              <Image
                source={Images.IcLicense}
                style={{width: 25, height: 25}}
                resizeMode="contain" />
            </LinearGradient>
            <View style={styles.vendorInfo}>
              <Text style={{fontSize: 18, marginLeft: 5}}>
                License
              </Text>
              <Text
                style={{color:"#818995", marginLeft: 5, marginTop: 10}}>
                Short Description
              </Text>
            </View>
          </View>

          <View style={styles.slimTabCotainer}>
            <LinearGradient
              style={styles.slimTabCircle}
              colors={["#FAD961", "#F76B1C"]}>
              <Image
                source={Images.IcPrivacy}
                style={{width: 25, height: 25}}
                resizeMode="contain" />
            </LinearGradient>
            <View style={styles.vendorInfo}>
              <Text style={{fontSize: 18, marginLeft: 5}}>
                Privacy Policy
              </Text>
              <Text
                style={{color:"#818995", marginLeft: 5, marginTop: 10}}>
                Short Description
              </Text>
            </View>
          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slimTabContainer: {
    width: "90%",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15
  },
  
  slimTabCotainer: {
    width: '100%',
    height: 95,
    borderRadius: 3,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    // shadowColor: '#000',
    // shadowOpacity: 0.2,
    // shadowOffset: {width: 0, height: 1}
  },
  slimTabCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  }
})