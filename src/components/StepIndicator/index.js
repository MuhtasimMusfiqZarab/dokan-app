/** @format */

import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import styles from "./index_style.js";
import { Color } from "@common";
import { LinearGradient } from "@expo";
var widthScreen = Dimensions.get("window").width;

export default class StepIndicator extends Component {
  constructor(props) {
    super(props);
    const defaultStyles = {
      stepIndicatorSize: 30,
      borderPadding: 6,
      color: Color.stepActive,
    };

    this.customStyles = Object.assign(defaultStyles, props.customStyles);
    this.stepStrokeWidth = 50;
    this.imageMargin = this.customStyles.stepIndicatorSize / 2;

    let allIndicatorWidth =
      props.steps.length * this.customStyles.stepIndicatorSize +
      2 * props.steps.length * this.customStyles.borderPadding;
    this.marginContent =
      widthScreen -
      allIndicatorWidth -
      (props.steps.length - 1) * this.stepStrokeWidth;

    this.containerWidth = widthScreen;
    if (this.marginContent >= 50) {
      this.containerWidth = widthScreen - this.marginContent + 50;
      this.marginContent = 25;
    } else if (this.marginContent < 20) {
      (this.marginContent = 10),
        (this.stepStrokeWidth =
          (widthScreen - allIndicatorWidth - this.marginContent * 2) /
          (props.steps.length - 1));
    }

    if (Platform.OS == "ios") {
      this.labelWidth =
        this.marginContent * 2 +
        this.customStyles.stepIndicatorSize +
        2 * this.customStyles.borderPadding;
    } else {
      this.labelWidth = this.marginContent * 2;
    }
  }

  renderStepIndicator(index, item) {
    let isCurrent = index == this.props.currentIndex;

    let indicatorContainer = {
      width:
        this.customStyles.stepIndicatorSize +
        this.customStyles.borderPadding * 2,
      height:
        this.customStyles.stepIndicatorSize +
        this.customStyles.borderPadding * 2,
      justifyContent: "center",
      alignItems: "center",
      borderRadius:
        (this.customStyles.stepIndicatorSize +
          this.customStyles.borderPadding * 2) /
        2,
      backgroundColor:"#fff",
    };

    let indicatorContainerShadow = {
      shadowColor: "#000",
      shadowOpacity: 0.3,
      shadowRadius: 7,
    }

    let indicatorStyle = {
      backgroundColor:
        index < this.props.currentIndex ? this.customStyles.color : "#CED7DD",
      width: this.customStyles.stepIndicatorSize,
      height: this.customStyles.stepIndicatorSize,
      borderRadius: this.customStyles.stepIndicatorSize / 1,
    };

    let indicatorCurrent = {
      backgroundColor: "white",
      borderWidth: 1.5,
      borderColor: this.customStyles.color,
    };

    // let imageSize =
    //   isCurrent == false
    //     ? this.customStyles.stepIndicatorSize - this.imageMargin
    //     : this.customStyles.stepIndicatorSize - this.imageMargin - 3;
    let imageSize = 20;
    let imageStyle = {
      width: imageSize,
      height: imageSize,
      // position: "absolute",
      // top: this.imageMargin / 2,
      // left: this.imageMargin / 2,
      // tintColor: isCurrent !== false && "#fff"
    };

    return (
      <LinearGradient
        colors={
          this.props.currentIndex > index ||
          this.props.currentIndex == this.props.steps.length -1
          ?
            [item.gradientColorFrom, item.gradientColorTo] :
            ["#fff", "#fff"]
        }
        onPress={() =>
          index < this.props.currentIndex && this.props.onChangeTab(index)
        }
        style={
          [
            indicatorContainer,
            (index == 0 || index > 0) && indicatorContainerShadow 
          ]
        }
        key={"indicator-" + index}>
        {/* <View style={[indicatorStyle, isCurrent && indicatorCurrent]}> */}
          <Image resizeMode="contain" source={item.icon} style={imageStyle} />
        {/* </View> */}
      </LinearGradient>
    );
  }

  renderProgressBar(index, item) {
    console.log(index);
    let progressBarContainer = {
      height: this.customStyles.borderPadding * 2 + 2,
      width: this.stepStrokeWidth,
      justifyContent: "center",
      zIndex: 3,
    };

    let progressBarBorder = {
      height: this.customStyles.borderPadding * 2 + 2,
      width: this.stepStrokeWidth,
      position: "absolute",
      top: 0,
      // left: -1,
      left: 0,
      right: 0,
      // backgroundColor: "white",
      // borderTopWidth: 0.5,
      // borderBottomWidth: 0.5,
      // borderColor: "#CED7DD",
    };

    let progressBar = {
      // width: this.stepStrokeWidth + this.customStyles.borderPadding * 2 + 3,
      width: 40,
      height: 3,
      // backgroundColor: this.customStyles.color,
      backgroundColor: "#D8D8D8",
      position: "absolute",
      top: this.customStyles.borderPadding,
      left: this.customStyles.borderPadding,
    };

    if(this.props.currentIndex === 0) {
      return (
        <View style={progressBarContainer} key={"progress-" + index}>
          <View style={progressBarBorder}>
            {<View style={progressBar} />}
          </View>
        </View>
      )  
    } else {
      return (
        <View style={progressBarContainer} key={"progress-" + index}>
          <View style={progressBarBorder}>
            {
              index == this.props.currentIndex - 1 ?
                <LinearGradient
                  colors={
                    [
                      this.props.steps[index].gradientColorFrom,
                      this.props.steps[index].gradientColorTo
                    ]
                  }
                  style={progressBar}
                /> :
                <View style={progressBar} />
            }
          </View>
        </View>
      )
    }
  }

  render() {
    var content = [];
    var label = [];

    for (var i = 0; i < this.props.steps.length; i++) {
      let item = this.props.steps[i];
      content.push(
        this.renderStepIndicator(i, item)
      );
      label.push(
        <Text
          key={i}
          style={[
            styles.label,
            { width: this.labelWidth },
            i <= this.props.currentIndex && { color: Color.Text },
          ]}>
          {item.label}
        </Text>
      );
      if (i != this.props.steps.length - 1) {
        content.push(this.renderProgressBar(i, item));
      }
    }

    return (
      <View style={[styles.container, { width: this.containerWidth }]}>
        <View style={styles.indicatorContainer}>{content}</View>
        <View style={styles.labelContainer}>{label}</View>
      </View>
    );
  }
}

StepIndicator.defaultProps = {
  steps: [],
  currentIndex: 0,
};
