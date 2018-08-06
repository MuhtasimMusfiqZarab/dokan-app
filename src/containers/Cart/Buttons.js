/** @format */

import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Button } from "@components";
import { Languages, Images } from "@common";
import * as Animatable from "react-native-animatable";
import styles from "./styles";

const Buttons = ({ isAbsolute, onPrevious, isLoading, nextText, onNext }) => {
  return (
    <View style={[styles.bottomView, isAbsolute && styles.floatView]}>
      <Button
        text={Languages.Back}
        icon={Images.icons.backs}
        color="#999"
        style={styles.btnBack}
        textStyle={styles.btnBackText}
        onPress={onPrevious}
      />
      {isLoading ? (
        <View style={styles.btnBuy}>
          <Animatable.Text
            style={styles.btnBuyText}
            animation="pulse"
            iterationCount="infinite">
            {Languages.Loading}
          </Animatable.Text>
        </View>
      ) : (
        <Button
          text={nextText || Languages.NextStep}
          style={styles.btnBuy}
          textStyle={styles.btnBuyText}
          onPress={onNext}
        />
      )}
    </View>
  );
};

Buttons.propTypes = {
  isAbsolute: PropTypes.bool,
  onPrevious: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  nextText: PropTypes.any,
  onNext: PropTypes.func.isRequired,
};

export default Buttons;
