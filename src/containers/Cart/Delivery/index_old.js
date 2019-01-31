/** @format */

import React, { PureComponent } from 'react';
import { Text, View, AsyncStorage, ScrollView } from 'react-native';
import css from '@cart/styles';
import { ShippingMethod } from '@components';
import { Config, Validator, Languages } from '@common';
import { connect } from 'react-redux';
import Buttons from '@cart/Buttons';
import { toast } from '@app/Omni';
import { Tcomb } from 'tcomb-form-native';
import { cloneDeep } from 'lodash';
import styles from './styles';

const Form = Tcomb.form.Form;

const customStyle = cloneDeep(Tcomb.form.Form.stylesheet);
const labelStyle = cloneDeep(Tcomb.form.Form.stylesheet);

// Customize Form Stylesheet
customStyle.textbox.normal = {
	...customStyle.textbox.normal,
	height: 150,
	marginBottom: 200,
};
customStyle.controlLabel.normal = {
	...customStyle.controlLabel.normal,
	fontSize: 15,
};
labelStyle.controlLabel.normal = {
	...customStyle.controlLabel.normal,
	fontSize: 14,
	color: '#999',
};

class Delivery extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			value: {
				first_name: '',
				last_name: '',
				address_1: '',
				state: '',
				postcode: '',
				country: '',
				email: '',
				phone: '',
				note: '',
			},
		};

		this.initFormValues();
	}

	componentDidMount() {
		const { getShippingMethod } = this.props;

		this.fetchCustomer(this.props);
		getShippingMethod();
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.user != this.props.user) {
			this.fetchCustomer(nextProps);
		}
	}

	onChange = value => this.setState({ value });

	onPress = () => this.form.getValue();

	initFormValues = () => {
		const countries = this.props.countries;
		// override the validate method of Tcomb lib for multi validate requirement.
		const Countries = Tcomb.enums(countries);
		const Email = Tcomb.refinement(
			Tcomb.String,
			s => Validator.checkEmail(s) === undefined
		);
		Email.getValidationErrorMessage = s => Validator.checkEmail(s);
		const Phone = Tcomb.refinement(
			Tcomb.String,
			s => Validator.checkPhone(s) === undefined
		);
		Phone.getValidationErrorMessage = s => Validator.checkPhone(s);

		// define customer form
		this.Customer = Tcomb.struct({
			first_name: Tcomb.String,
			last_name: Tcomb.String,
			address_1: Tcomb.String,
			country: Countries,
			state: Tcomb.String,
			city: Tcomb.String,
			postcode: Tcomb.String,
			email: Email,
			phone: Phone,
			note: Tcomb.maybe(Tcomb.String), // maybe = optional
		});

		// form options
		this.options = {
			auto: 'none', // we have labels and placeholders as option here (in Engrish, ofcourse).
			// stylesheet: css,
			fields: {
				first_name: {
					label: Languages.FirstName,
					placeholder: Languages.TypeFirstName,
					error: Languages.EmptyError, // for simple empty error warning.
					underlineColorAndroid: 'transparent',
					stylesheet: labelStyle,
				},
				last_name: {
					label: Languages.LastName,
					placeholder: Languages.TypeLastName,
					error: Languages.EmptyError,
					underlineColorAndroid: 'transparent',
					stylesheet: labelStyle,
				},
				address_1: {
					label: Languages.Address,
					placeholder: Languages.TypeAddress,
					error: Languages.EmptyError,
					underlineColorAndroid: 'transparent',
					stylesheet: labelStyle,
				},
				city: {
					label: Languages.City,
					placeholder: Languages.TypeCity,
					error: Languages.EmptyError,
					underlineColorAndroid: 'transparent',
					stylesheet: labelStyle,
				},
				state: {
					label: Languages.State,
					placeholder: Languages.TypeState,
					error: Languages.EmptyError,
					underlineColorAndroid: 'transparent',
					stylesheet: labelStyle,
				},
				postcode: {
					label: Languages.Postcode,
					placeholder: Languages.TypePostcode,
					error: Languages.EmptyError,
					underlineColorAndroid: 'transparent',
					stylesheet: labelStyle,
				},
				country: {
					label: Languages.TypeCountry,
					nullOption: { value: '', text: Languages.Country },
					error: Languages.NotSelectedError,
					styles: {
						borderColor: 'black',
						borderWidth: 1,
					},
					stylesheet: labelStyle,
				},
				email: {
					label: Languages.Email,
					placeholder: Languages.TypeEmail,
					underlineColorAndroid: 'transparent',
					stylesheet: labelStyle,
				},
				phone: {
					label: Languages.Phone,
					placeholder: Languages.TypePhone,
					underlineColorAndroid: 'transparent',
					stylesheet: labelStyle,
				},
				note: {
					label: Languages.Note,
					placeholder: Languages.TypeNote,
					underlineColorAndroid: 'transparent',
					multiline: true,
					stylesheet: customStyle,
				},
			},
		};
	};

	fetchCustomer = async props => {
		const { user: customer } = props.user;
		const userString = await AsyncStorage.getItem('@userInfo');
		let userInfo = null;
		if (userString !== null) {
			try {
				userInfo = JSON.parse(userString);
			} catch (error) {}
		}
		if (userInfo !== null) {
			this.setState({
				value: {
					first_name: userInfo.first_name,
					last_name: userInfo.last_name,
					email: userInfo.email,
					address_1: userInfo.address_1,
					city: userInfo.city,
					state: userInfo.state,
					postcode: userInfo.postcode,
					country: userInfo.country,
					phone: userInfo.phone,
				},
			});
		} else if (customer !== null) {
			this.setState({
				value: {
					first_name:
						customer.billing.first_name == ''
							? customer.first_name
							: customer.billing.first_name,
					last_name:
						customer.billing.last_name == ''
							? customer.last_name
							: customer.billing.last_name,
					email:
						customer.email.first_name == ''
							? customer.email
							: customer.billing.email,
					address_1: customer.billing.address_1,
					city: customer.billing.city,
					state: customer.billing.state,
					postcode: customer.billing.postcode,
					country: customer.billing.country,
					phone: customer.billing.phone,
				},
			});
		}
	};

	validateCustomer = async customerInfo => {
		await this.props.validateCustomerInfo(customerInfo);
		if (this.props.type === 'INVALIDATE_CUSTOMER_INFO') {
			toast(this.props.message);
			return false;
		}
		this.props.onNext();
	};

	saveUserData = async userInfo => {
		try {
			await AsyncStorage.setItem('@userInfo', JSON.stringify(userInfo));
		} catch (error) {
			console.log('error save user data', error);
		}
	};

	selectShippingMethod = item => {
		this.props.selectShippingMethod(item);
	};

	nextStep = () => {
		const value = this.form.getValue();
		if (value) {
			// if validation fails, value will be null
			this.props.onNext(this.state.value);

			// save user info for next use
			this.saveUserData(value);
		}
		// this.props.validateCustomerInfo(this.customerInfo);
		// this.props.onNext();
		this.validateCustomer(this.customerInfo);
	};

	render() {
		const { shippings, shippingMethod } = this.props;
		const isShippingEmpty = typeof shippingMethod.id === 'undefined';

		return (
			<View style={styles.container}>
				<ScrollView style={styles.form}>
					{Config.shipping.visible && shippings.length > 0 && (
						<View>
							<View style={css.rowEmpty}>
								<Text style={css.label}>{Languages.ShippingType}</Text>
							</View>

							<ScrollView contentContainerStyle={styles.shippingMethod}>
								{shippings.map((item, index) => (
									<ShippingMethod
										item={item}
										key={`${index}shipping`}
										onPress={this.selectShippingMethod.bind(this)}
										selected={
											(index == 0 && isShippingEmpty) ||
											item.id == shippingMethod.id
										}
									/>
								))}
							</ScrollView>
						</View>
					)}

					<View style={css.rowEmpty}>
						<Text style={css.label}>{Languages.YourDeliveryInfo}</Text>
					</View>

					<View style={styles.formContainer}>
						<Form
							ref={c => {
								this.form = c;
							}}
							type={this.Customer}
							options={this.options}
							value={this.state.value}
							onChange={this.onChange}
						/>
					</View>
				</ScrollView>

				<Buttons
					isAbsolute
					onPrevious={this.props.onPrevious}
					onNext={this.nextStep}
				/>
			</View>
		);
	}
}

Delivery.defaultProps = {
	shippings: [],
	shippingMethod: {},
};

const mapStateToProps = ({ carts, user, countries }) => {
	return {
		user,
		customerInfo: carts.customerInfo,
		message: carts.message,
		type: carts.type,
		isFetching: carts.isFetching,
		shippings: carts.shippings,
		shippingMethod: carts.shippingMethod,
		countries: countries.list,
	};
};

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { dispatch } = dispatchProps;
	const CartRedux = require('@redux/CartRedux');

	return {
		...ownProps,
		...stateProps,
		validateCustomerInfo: customerInfo => {
			CartRedux.actions.validateCustomerInfo(dispatch, customerInfo);
		},
		getShippingMethod: () => {
			CartRedux.actions.getShippingMethod(dispatch);
		},
		selectShippingMethod: shippingMethod => {
			CartRedux.actions.selectShippingMethod(dispatch, shippingMethod);
		},
	};
}

export default connect(
	mapStateToProps,
	undefined,
	mergeProps
)(Delivery);
