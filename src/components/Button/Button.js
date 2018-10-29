/** @format */

import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  TouchableHighlight,
  Text,
  Platform,
  Dimensions,
  ActivityIndicator,
  I18nManager,
} from "react-native";
import { Color } from "@common";
import { LinearGradient } from "@expo";

const Button = (props) => {
  if (props.type === "border") {
    return <BorderButton {...props} />;
  } else if (props.type === "image") {
    return <ImageButton {...props} />;
  } else if (props.type === "text") {
    return <TextButton {...props} />;
  } else if (props.type === "tab") {
    return <TabButton {...props} />;
  } else if (props.type === "gradientBtn") {
    return <GradientButton {...props} />;
  }
  return <StandardButton {...props} />;
};

Button.propTypes = {
  type: PropTypes.string,
};

const TextButton = (props) => (
  <TouchableHighlight
    disabled={props.disabled || props.isLoading}
    onPress={() => props.onPress()}
    style={[
      styles.button,
      props.style,
      props.inactive && { backgroundColor: "#C6D8E4" },
    ]}
    activeOpacity={0.9}
    underlayColor="#ccc">
    <View style={styles.buttonView}>
      {props.icon && (
        <Image
          source={props.icon}
          defaultSource={props.defaultSource}
          style={[
            styles.imageIcon,
            { tintColor: props.color },
            I18nManager.isRTL && {
              transform: [{ rotate: "180deg" }],
            },
          ]}
        />
      )}
      <Text {...props} style={[styles.text, props.textStyle]}>
        {props.text}
      </Text>
      {props.isLoading && (
        <ActivityIndicator style={styles.loading} color="#FFF" />
      )}
    </View>
  </TouchableHighlight>
);

const BorderButton = (props) => (
  <TouchableHighlight
    disabled={props.disabled || props.isLoading}
    onPress={() => props.onPress()}
    style={[
      styles.button,
      props.style,
      props.inactive && { backgroundColor: "#C6D8E4" },
    ]}
    activeOpacity={0.9}
    underlayColor="#ccc">
    <View style={styles.buttonView}>
      {props.icon && (
        <Image
          source={props.icon}
          defaultSource={props.defaultSource}
          style={[
            styles.imageIcon,
            { tintColor: props.color },
            I18nManager.isRTL && {
              transform: [{ rotate: "180deg" }],
            },
          ]}
        />
      )}
      <Text {...props} style={[styles.text, props.textStyle]}>
        {props.text}
      </Text>
      {props.isLoading && (
        <ActivityIndicator style={styles.loading} color="#FFF" />
      )}
    </View>
  </TouchableHighlight>
);

const StandardButton = (props) => (
  <TouchableHighlight
    disabled={props.disabled || props.isLoading}
    onPress={() => props.onPress()}
    style={[
      styles.button,
      props.style,
      props.inactive && { backgroundColor: "#C6D8E4" },
    ]}
    activeOpacity={0.9}
    underlayColor="#ccc">
    <View style={styles.buttonView}>
      {props.icon && (
        <Image
          source={props.icon}
          defaultSource={props.defaultSource}
          style={[
            styles.imageIcon,
            { tintColor: props.color },
            I18nManager.isRTL && {
              transform: [{ rotate: "180deg" }],
            },
          ]}
        />
      )}
      <Text {...props} style={[styles.text, props.textStyle]}>
        {props.text}
      </Text>
      {props.isLoading && (
        <ActivityIndicator style={styles.loading} color="#FFF" />
      )}
    </View>
  </TouchableHighlight>
);

const ImageButton = (props) => {
    return (
      <TouchableHighlight
        disabled={props.disabled}
        onPress={() => props.onPress()}
        activeOpacity={0.8}
        underlayColor="#eeeeee"
        style={props.buttonStyle}>
        <Image
          {...props}
          defaultSource={props.defaultSource}
          style={[
            props.imageStyle,
            props.isAddWishList && { tintColor: Color.heartActiveWishList },
            props.isAddToCart && { tintColor: Color.TabActive },
          ]}
          resizeMode="contain"
        />
      </TouchableHighlight>
    )
};

const TabButton = (props) => (
  <TouchableOpacity
    onPress={() => props.onPress()}
    activeOpacity={0}
    selected={props.selected}>
    <View
      style={[
        styles.tabButton,
        props.buttonStyle,
        props.selected && styles.tabActive,
      ]}>
      <Text
        style={[
          styles.tabButtonText,
          props.textStyle,
          props.selected && styles.tabActiveText,
        ]}>
        {props.text}
      </Text>
    </View>
  </TouchableOpacity>
);

const GradientButton = (props) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={
      {
        width:
          props.size === "sm" ? Dimensions.get("window").width / 3.5: "auto",
      }
    }>
    <LinearGradient
      style={
        [
          styles.gradientButton,
          {
            width:
              props.size === "sm" ? Dimensions.get("window").width / 3.5: "auto",
            alignSelf: props.alignSelf ? props.aligSelf : "center",
            marginTop: props.marginTop ? props.marginTop : 0
          }
        ]
      }
      start={ {x: 0.0, y: 0.5} }
      end={ {x: 1.0, y: 0.5}}
      locations={[0.0, 1.0]}
      colors={["#FF9472", "#F2709C"]}>
      <Text style={styles.gradientButtonText}>
        {props.text}
      </Text>
    </LinearGradient>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  tabActiveText: {
    color: "#000"
  },
  tabActive: {
    marginTop: 1,
    borderBottomWidth: 2,
    borderBottomColor: "#000"
  },
  button: {
    backgroundColor: "#0B4A7D",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  imageIcon: {
    resizeMode: "contain",
    width: 20,
    marginRight: 8,
  },
  text: {
    color: "white",
    fontSize: 17,
    marginTop: 3,
  },
  borderButton: {
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "white",
  },
  tabButton: {
    height: 50,
    justifyContent: "center",
  },
  tabButtonText: {
    marginLeft: 10,
    marginRight: 10,
    textAlign: "center",
    fontSize: 12,
  },
  loading: {
    marginLeft: 5,
  },
  gradientButton: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2}
      },
      android: {
        elevation: 3
      }
    })
  },
  gradientButtonText: {
    fontSize: 16,
    color: "#fff"
  }
});

export default Button;
