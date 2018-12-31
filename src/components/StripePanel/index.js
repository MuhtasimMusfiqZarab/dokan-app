import React, { PureComponent } from "react";
import {
	View,
	ScrollView,
	Button
} from "react-native";
import moment from 'moment';
import { Languages } from "@common";
import { toast, addSpinner, removeSpinner } from "@app/Omni";
import { cloneDeep } from "lodash";
import Tcomb from "tcomb-form-native";
import StripeAPI from "@services/StripeAPI";
import WooWorker from "@services/WooCommerce/WooWorker";

const StripeForm = Tcomb.form.Form;
const customStyle = cloneDeep(Tcomb.form.Form.stylesheet);
const labelStyle = cloneDeep(Tcomb.form.Form.stylesheet);

formatDate = (format, date) => {
	return moment(date).format(format);
}

const myFormatFunction = format => date => formatDate(format, date)
const myFormat1 = 'l'

// Customize Form Stylesheet
customStyle.textbox.normal = {
	...customStyle.textbox.normal,
	height: 150,
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

		this.initStripeFormValues();
	}

	initStripeFormValues = () => {
		this.Stripe = Tcomb.struct({
			card_number: Tcomb.Number,
			cvc: Tcomb.Number,
			expiry: Tcomb.Date
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
					mode: 'date',
					label: "Expiry Date",
					placeholder: "Type Expiry Date",
					error: Languages.EmptyError,
					underlineColorAndroid: "transparent",
					stylesheet: labelStyle,
					config: {
						format: myFormatFunction(myFormat1)
					}
				},
			},
		};
	}

	submitHandler = async () => {
		const creditCardValue = this._stripeForm.getValue();

		if (creditCardValue) {
			addSpinner();

			let expiryDate = creditCardValue.expiry;
			let expiryMonth = moment(expiryDate).month();
			let expiryYear = moment(expiryDate).year();

			const cardToken = await StripeAPI.createCardToken(
				creditCardValue.card_number,
				expiryMonth,
				expiryYear,
				creditCardValue.cvc
			);

			if (cardToken.code) {
				toast(cardToken.message);
				removeSpinner();
			} else {
				const createOrderResponse = await WooWorker.createNewOrder(
					this.props.order,
					(response) => {
						return response;
					},
					(error) => {
						return error;
					}
				)
				
				const orderID = createOrderResponse.id;
				const amount = parseFloat(createOrderResponse.total).toFixed(2);
				const currency = createOrderResponse.currency;

				const paymentResponse = await StripeAPI.processPayment (
					cardToken,
					amount,
					currency
				)

				if (paymentResponse.paid) {
					const status = "completed";
					
					WooWorker.setOrderStatus(
						orderID,
						status,
						() => {
							this.props.closeStripeModal();
							this.props.emptyCart();
							this.props.onNext();
							
							removeSpinner();
						}
					)
				} else {
					toast("Payment could not be processed!");
					removeSpinner();
				}
			}
		}
	}

	render() {
		return (
			<View style={{ width: "100%"}}>
				
				<ScrollView
					contentContainerStyle={
						{
							padding: 25
						}
					}
				>
					<StripeForm
						ref={c => this._stripeForm = c}
						type={this.Stripe}
						options={this.options}
						value={this.state.stripeValue}
						onChange={this.onChange}
					/>
					<Button title="Submit" onPress={ this.submitHandler } />
				</ScrollView>
			</View>
		)
	}
}