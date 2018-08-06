/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Languages, Tools } from "@common";
import styles from "./styles";

export default class UserProfileHeader extends PureComponent {
  //   constructor(props) {
  //     super(props)
  //   }
  static propTypes = {
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    user: PropTypes.object,
  };

  loginHandle = () => {
    if (this.props.user.name === Languages.Guest) {
      this.props.onLogin();
    } else {
      this.props.onLogout();
    }
  };

  render() {
    const { user } = this.props;
    const avatar = Tools.getAvatar(user);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={avatar} style={styles.avatar} />
          <View style={styles.textContainer}>
            <Text style={styles.fullName}>{user.name}</Text>
            <Text style={styles.address}>{user ? user.address : ""}</Text>

            <TouchableOpacity onPress={this.loginHandle}>
              <Text style={styles.loginText}>
                {user.name === Languages.Guest
                  ? Languages.Login
                  : Languages.Logout}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
