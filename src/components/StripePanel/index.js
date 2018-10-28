import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, WebView, Text, TextInput, TouchableOpacity } from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import { connect } from "react-redux";
import { Languages, Images, Config, Constants } from "@common";
import { BlockTimer } from "@app/Omni";
import Modal from "react-native-modalbox";
import { StepIndicator } from "@components";
import base64 from "base-64";
import { isObject, cloneDeep } from "lodash";
import Tcomb from "tcomb-form-native";


const StripeForm = Tcomb.form.Form;
const customStyle = cloneDeep(Tcomb.form.Form.stylesheet);
const labelStyle = cloneDeep(Tcomb.form.Form.stylesheet);

// Customize Form Stylesheet
customStyle.textbox.normal = {
  ...customStyle.textbox.normal,
  height: 150,
  // marginBottom: 200,
  marginBottom: 20,
};
customStyle.controlLabel.normal = {
  ...customStyle.controlLabel.normal,
  fontSize: 15,
};
labelStyle.controlLabel.normal = {
  ...customStyle.controlLabel.normal,
  fontSize: 14,
  color: "#999",
};

export default class StripePanel extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
      stripeValue: {
        card_number: "",
        cvc: "",
        expiry: "",
      },
    };

		// this.initStripeFormValues();
	}

	initStripeFormValues = () => {
		this.Stripe = Tcomb.struct({
			card_number: Tcomb.String,
			cvc: Tcomb.String,
			expiry: Tcomb.Dates
		});

    this.options = {
      auto: "none",
      fields: {
        card_number: {
          label: "Credit Card",
          placeholder: "Type Credit Card Number",
          error: Languages.EmptyError,
          underlineColorAndroid: "transparent",
          stylesheet: labelStyle,
        },
        cvc: {
          label: "CVC",
          placeholder: "Type CVC",
          error: Languages.EmptyError,
          underlineColorAndroid: "transparent",
          stylesheet: labelStyle,
        },
        expiry: {
          label: "Expiry Date",
          placeholder: "Type Expiry Date",
          error: Languages.EmptyError,
          underlineColorAndroid: "transparent",
          stylesheet: labelStyle,
        },
      },
    };
	}

	onChange = (stripeValue) => this.setState({ stripeValue });

	render() {
		return (
			<StripeForm
				ref="stripeForm"
				type={this.Stripe}
				options={this.options}
				value={this.state.stripeValue}
				onChange={this.onChange}
			/>
			// <Text>Stripe Panel</Text>
		)
	}
}