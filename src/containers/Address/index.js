/** @format */

import React, { PureComponent } from 'react';
import {
	Text,
	View,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import css from '@cart/styles';
import { Config, Validator, Languages, Color } from '@common';
import { connect } from 'react-redux';
import Buttons from './Buttons';
import { toast } from '@app/Omni';
import Tcomb from 'tcomb-form-native';
import { cloneDeep, findKey, find } from 'lodash';
import styles from './styles';
import { TextInputMask } from 'react-native-masked-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CountryPicker, {
	getAllCountries,
} from 'react-native-country-picker-modal';
import { Checkbox } from 'react-native-paper';
import DokanWorker from '@services/Dokan/DokanWorker';

const Form = Tcomb.form.Form;
const customStyle = cloneDeep(Tcomb.form.Form.stylesheet);
const customInputStyle = cloneDeep(Tcomb.form.Form.stylesheet);
const labelStyle = cloneDeep(Tcomb.form.Form.stylesheet);
const labelStyleBottomMargin = cloneDeep(Tcomb.form.Form.stylesheet);

// Customize Form Stylesheet
customStyle.textbox.normal = {
	...customStyle.textbox.normal,
	height: 150,
	marginBottom: 200,
};
customStyle.controlLabel.normal = {
	...customStyle.controlLabel.normal,
	fontSize: 15,
	color: Color.textGray,
	fontWeight: 'normal',
};
labelStyle.controlLabel.normal = {
	...customStyle.controlLabel.normal,
	fontSize: 15,
	color: Color.textGray,
	fontWeight: 'normal',
};
labelStyleBottomMargin.controlLabel.normal = {
	...customStyle.controlLabel.normal,
	fontSize: 15,
	color: Color.textGray,
	fontWeight: 'normal',
};
labelStyleBottomMargin.textbox.normal = {
	...customStyle.textbox.normal,
	height: 36,
	marginBottom: 50,
};
customInputStyle.textbox.normal = {
	...customInputStyle.textbox.normal,
};
customInputStyle.controlLabel.normal = {
	...customInputStyle.controlLabel.normal,
	fontSize: 15,
};

class Address extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			value: {
				first_name: '',
				last_name: '',
				address_1: '',
				address_2: '',
				state: '',
				city: '',
				postcode: '',
				country: '',
				email: '',
				phone: '',
				note: '',
			},
			cca2: 'BD',
			countryName: '',
			isBtnLoading: false,
			sameAsBilling: true,
		};

		this.initFormValues(this.props);
	}

	componentDidMount() {
		// const { getShippingMethod, countries } = this.props;

		this.fetchCustomer(this.props);
		// getShippingMethod();
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.user != this.props.user) {
			this.fetchCustomer(nextProps);
			this.initFormValues(nextProps);
		}
	}

	onChange = value => this.setState({ value });

	onPress = () => this.form.getValue();

	initFormValues = props => {
		const { countries, fromScreen } = props;
		const { user: customer } = props.user;
		// override the validate method of Tcomb lib for multi validate requirement.
		// const Countries = Tcomb.enums(countries);
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
		if (fromScreen === 'CartScreen' && customer.billing.country !== '') {
			this.Customer = Tcomb.struct({
				first_name: Tcomb.String,
				last_name: Tcomb.String,
				country: Tcomb.String,
				state: Tcomb.String,
				city: Tcomb.String,
				postcode: Tcomb.String,
				address_1: Tcomb.String,
				address_2: Tcomb.maybe(Tcomb.String),
				note: Tcomb.maybe(Tcomb.String), // maybe = optional
			});
		} else {
			this.Customer = Tcomb.struct({
				first_name: Tcomb.String,
				last_name: Tcomb.String,
				email: Email,
				phone: Tcomb.Number,
				country: Tcomb.String,
				state: Tcomb.String,
				city: Tcomb.String,
				postcode: Tcomb.String,
				address_1: Tcomb.String,
				address_2: Tcomb.maybe(Tcomb.String),
			});
		}

		// form options
		this.options = {
			i18n: {
				optional: ' (optional)',
				required: ' *',
			},
			auto: 'none',
			// stylesheet: css,
			fields: {
				first_name: {
					label: Languages.FirstName,
					// placeholder: Languages.TypeFirstName,
					error: Languages.EmptyError, // for simple empty error warning.
					underlineColorAndroid: 'transparent',
					stylesheet: labelStyle,
				},
				last_name: {
					label: Languages.LastName,
					// placeholder: Languages.TypeLastName,
					error: Languages.EmptyError,
					underlineColorAndroid: 'transparent',
					stylesheet: labelStyle,
				},
				address_1: {
					label: Languages.Address1,
					placeholder: Languages.TypeAddress1,
					error: Languages.EmptyError,
					underlineColorAndroid: 'transparent',
					stylesheet: labelStyle,
				},
				address_2: {
					label: Languages.Address2,
					placeholder: Languages.TypeAddress2,
					error: Languages.EmptyError,
					underlineColorAndroid: 'transparent',
					stylesheet:
						fromScreen === 'UserScreen' ||
						(fromScreen === 'CartScreen' && customer.billing.country === '')
							? labelStyleBottomMargin
							: labelStyle,
				},
				country: {
					label: Languages.TypeCountry,
					// placeholder: Languages.Country,
					error: Languages.NotSelectedError,
					stylesheet: labelStyle,
					template: this.renderCountry,
				},
				state: {
					label: Languages.State,
					// placeholder: Languages.TypeState,
					error: Languages.EmptyError,
					underlineColorAndroid: 'transparent',
					stylesheet: labelStyle,
					autoCorrect: false,
				},
				city: {
					label: Languages.City,
					// placeholder: Languages.TypeCity,
					error: Languages.EmptyError,
					underlineColorAndroid: 'transparent',
					stylesheet: labelStyle,
					autoCorrect: false,
				},
				postcode: {
					label: Languages.Postcode,
					// placeholder: Languages.TypePostcode,
					error: Languages.EmptyError,
					underlineColorAndroid: 'transparent',
					stylesheet: labelStyle,
					autoCorrect: false,
				},
				email: {
					label: Languages.Email,
					// placeholder: Languages.TypeEmail,
					underlineColorAndroid: 'transparent',
					stylesheet: labelStyle,
					autoCorrect: false,
					editable:
						fromScreen === 'UserScreen' ||
						(fromScreen === 'CartScreen' && customer.billing.country === '')
							? false
							: true,
				},
				phone: {
					label: Languages.Phone,
					// placeholder: Languages.TypePhone,
					underlineColorAndroid: 'transparent',
					error: Languages.EmptyError,
					stylesheet: labelStyle,
					// template: this.renderPhoneInput,
					autoCorrect: false,
				},
				note: {
					label: Languages.Note,
					placeholder: Languages.TypeNote,
					underlineColorAndroid: 'transparent',
					multiline: true,
					stylesheet: customStyle,
					autoCorrect: false,
				},
			},
		};
	};

	renderPhoneInput = locals => {
		const stylesheet = locals.stylesheet;
		let formGroupStyle = stylesheet.formGroup.normal;
		let controlLabelStyle = stylesheet.controlLabel.normal;
		let textboxStyle = stylesheet.textbox.normal;
		let helpBlockStyle = stylesheet.helpBlock.normal;
		const errorBlockStyle = stylesheet.errorBlock;

		if (locals.hasError) {
			formGroupStyle = stylesheet.formGroup.error;
			controlLabelStyle = stylesheet.controlLabel.error;
			textboxStyle = stylesheet.textbox.error;
			helpBlockStyle = stylesheet.helpBlock.error;
		}

		const label = locals.label ? (
			<Text style={controlLabelStyle}>{locals.label}</Text>
		) : null;
		const help = locals.help ? (
			<Text style={helpBlockStyle}>{locals.help}</Text>
		) : null;
		const error =
			locals.hasError && locals.error ? (
				<Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
					{locals.error}
				</Text>
			) : null;

		return (
			<View style={formGroupStyle}>
				{label}
				<TextInputMask
					type={'cel-phone'}
					style={textboxStyle}
					onChangeText={value => locals.onChange(value)}
					onChange={locals.onChangeNative}
					placeholder={locals.placeholder}
					value={locals.value}
				/>
				{help}
				{error}
			</View>
		);
	};

	renderCountry = locals => {
		const stylesheet = locals.stylesheet;
		let formGroupStyle = stylesheet.formGroup.normal;
		let controlLabelStyle = stylesheet.controlLabel.normal;
		let textboxStyle = stylesheet.textbox.normal;
		let helpBlockStyle = stylesheet.helpBlock.normal;
		const errorBlockStyle = stylesheet.errorBlock;

		if (locals.hasError) {
			formGroupStyle = stylesheet.formGroup.error;
			controlLabelStyle = stylesheet.controlLabel.error;
			textboxStyle = stylesheet.textbox.error;
			helpBlockStyle = stylesheet.helpBlock.error;
		}

		const label = locals.label ? (
			<Text style={controlLabelStyle}>{locals.label}</Text>
		) : null;
		const help = locals.help ? (
			<Text style={helpBlockStyle}>{locals.help}</Text>
		) : null;
		const error =
			locals.hasError && locals.error ? (
				<Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
					{locals.error}
				</Text>
			) : null;

		return (
			<View style={formGroupStyle}>
				{label}
				<CountryPicker
					onChange={value => {
						this.setState({ cca2: value.cca2 });
						locals.onChange(value.name);
					}}
					cca2={this.state.cca2}
					filterable
					closeable>
					<Text
						style={[textboxStyle, locals.value == '' && { color: '#c6c6cc' }]}>
						{locals.value == '' ? locals.placeholder : locals.value}
					</Text>
				</CountryPicker>
				{help}
				{error}
			</View>
		);
	};

	fetchCustomer = async props => {
		const { user: customer } = props.user;
		const { fromScreen } = this.props;
		const { sameAsBilling } = this.state;
		const userString = await AsyncStorage.getItem('@userInfo');
		let userInfo = null;

		if (userString !== null) {
			try {
				userInfo = JSON.parse(userString);
			} catch (error) {
				console.log(error);
			}
		}

		const country = find(
			this.props.countries,
			item => item.code === customer.billing.country
		);

		if (fromScreen === 'CartScreen' && customer.billing.country !== '') {
			if (userInfo !== null && !sameAsBilling) {
				this.setState({
					value: {
						first_name: userInfo.first_name,
						last_name: userInfo.last_name,
						address_1: userInfo.address_1,
						address_2: userInfo.address_2,
						city: userInfo.city,
						state: userInfo.state,
						postcode: userInfo.postcode,
						country: userInfo.country,
					},
				});
			} else if (customer !== null && sameAsBilling) {
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
						address_1: customer.billing.address_1,
						address_2: customer.billing.address_2,
						city: customer.billing.city,
						state: customer.billing.state,
						postcode: customer.billing.postcode,
						country:
							country !== undefined ? country.name : customer.billing.country,
					},
				});
			} else {
				this.setState({
					value: {
						first_name: '',
						last_name: '',
						address_1: '',
						address_2: '',
						city: '',
						state: '',
						postcode: '',
						country: '',
					},
				});
			}
		} else {
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
						customer.billing.email == ''
							? customer.email
							: customer.billing.email,
					address_1: customer.billing.address_1,
					city: customer.billing.city,
					state: customer.billing.state,
					postcode: customer.billing.postcode,
					country:
						country !== undefined ? country.name : customer.billing.country,
					phone: customer.billing.phone,
				},
			});
		}
	};

	validateCustomer = async customerInfo => {
		const { fromScreen, user } = this.props;
		if (fromScreen === 'CartScreen' && user.user.billing.country !== '') {
			await this.props.validateCustomerInfo(customerInfo, 'shipping');
		} else {
			await this.props.validateCustomerInfo(customerInfo, 'billing');
		}

		if (this.props.type === 'INVALIDATE_CUSTOMER_INFO') {
			toast(this.props.message);
			return false;
		} else {
			return true;
		}
	};

	saveUserData = async userInfo => {
		try {
			await AsyncStorage.setItem('@userInfo', JSON.stringify(userInfo));
		} catch (error) {
			console.log('error save user data', error);
		}
	};

	updateCustomerAddress = async (userInfo, token) => {
		const country = find(
			this.props.countries,
			item => item.name === userInfo.country
		);
		// const state = find(country.states, item => item.name === userInfo.state);
		// console.log(country);
		// console.log(state);

		const data = {
			first_name: userInfo.first_name,
			last_name: userInfo.last_name,
			billing: {
				first_name: userInfo.first_name,
				last_name: userInfo.last_name,
				company: '',
				address_1: userInfo.address_1,
				address_2: userInfo.address_2,
				city: userInfo.city,
				state: userInfo.state,
				postcode: userInfo.postcode,
				country: country.code,
				email: userInfo.email,
				phone: userInfo.phone,
			},
		};

		const user = await DokanWorker.updateCustomerProfile(data, token);
		this.props.updateUser(user);
	};

	onSave = async () => {
		const userInfo = this.form.getValue();
		const token = this.props.user.token;
		const { user } = this.props.user;

		if (userInfo) {
			this.setState({ isBtnLoading: true });

			// await this.validateCustomer(userInfo);
			// await this.updateCustomerAddress(userInfo, token);
			// await this.saveUserData(userInfo);

			// this.setState({ isBtnLoading: true });

			// User with billing address trying to buy
			if (
				this.props.fromScreen === 'CartScreen' &&
				user.billing.country !== ''
			) {
				await this.validateCustomer(userInfo);
				await this.saveUserData(userInfo);
				this.props.calculateShipping(token, this.state.cca2);
				this.setState({ isBtnLoading: false });
				this.props.navigation.goBack();
			}
			// User with no billing address trying to buy
			else if (
				this.props.fromScreen === 'CartScreen' &&
				user.billing.country == ''
			) {
				await this.validateCustomer(userInfo);
				await this.updateCustomerAddress(userInfo, token);
				this.setState({ isBtnLoading: false });
			}
			// User is trying to change billing address
			else {
				await this.validateCustomer(userInfo);
				await this.updateCustomerAddress(userInfo, token);
				this.setState({ isBtnLoading: false });
				this.props.navigation.goBack();
			}
		}
	};

	onCancel = () => {
		this.props.navigation.goBack();
	};

	handleSameAsBilling = () => {
		this.setState(
			{
				sameAsBilling: !this.state.sameAsBilling,
			},
			() => {
				this.fetchCustomer(this.props);
			}
		);
	};

	render() {
		// const { shippings, shippingMethod } = this.props;
		// const isShippingEmpty = typeof shippingMethod.id === 'undefined';

		const { fromScreen, user } = this.props;
		const { sameAsBilling } = this.state;

		return (
			<View style={styles.container}>
				<KeyboardAwareScrollView
					style={styles.form}
					showsVerticalScrollIndicator={false}>
					<View style={css.rowEmpty}>
						<Text style={[css.label, { color: '#000', fontWeight: 'bold' }]}>
							{fromScreen === 'CartScreen' && user.user.billing.country !== ''
								? Languages.YourDeliveryInfo
								: Languages.BillingDetails}
						</Text>
					</View>
					{fromScreen === 'CartScreen' && user.user.billing.country !== '' && (
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Checkbox
								status={sameAsBilling ? 'checked' : 'unchecked'}
								onPress={() => this.handleSameAsBilling()}
							/>
							<TouchableOpacity onPress={() => this.handleSameAsBilling()}>
								<Text style={{ color: Color.textGray }}>
									Same as Billing Address
								</Text>
							</TouchableOpacity>
						</View>
					)}
					<View style={styles.formContainer}>
						<Form
							ref={c => (this.form = c)}
							type={this.Customer}
							options={this.options}
							value={this.state.value}
							onChange={this.onChange}
						/>
					</View>
				</KeyboardAwareScrollView>

				<Buttons
					isAbsolute
					onCancel={this.onCancel}
					onSave={this.onSave}
					isBtnLoading={this.state.isBtnLoading}
				/>
			</View>
		);
	}
}

Address.defaultProps = {
	shippings: [],
	shippingMethod: {},
	selectedAddress: {},
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
	const UserRedux = require('@redux/UserRedux');

	return {
		...ownProps,
		...stateProps,
		validateCustomerInfo: (customerInfo, type) => {
			CartRedux.actions.validateCustomerInfo(dispatch, customerInfo, type);
		},
		calculateShipping: (
			token,
			countryCode = '',
			state = '',
			postCode = '',
			city = ''
		) => {
			CartRedux.actions.calculateShipping(
				dispatch,
				token,
				countryCode,
				state,
				postCode,
				city
			);
		},
		updateUser: user => dispatch(UserRedux.actions.updateUserInfo(user)),
	};
}

export default connect(
	mapStateToProps,
	undefined,
	mergeProps
)(Address);
