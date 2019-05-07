import React, { PureComponent } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	AsyncStorage,
} from 'react-native';
import { Icon, currencyFormatter } from '@app/Omni';
import { RadioButton } from '@components';
import { Icons, Events } from '@common';
import css from '../styles';

export class ShippingMethods extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			selectedMethod: '',
			availAbleMethods: [],
		};
		this.storeName = '';
	}

	handleDeliveryInfoPress = () => {
		Events.closeCartModal();
		this.props.navigation.navigate('Address', { from: 'CartScreen' });
	};

	onCancelCartModal = () => Events.closeCartModal();
	onSaveCartModal = () => alert('Saved!!');

	async componentDidMount() {
		const allShippingMethods = this.props.shippingMethods;
		this.storeName = this.props.storeName;
		const currentVendor = allShippingMethods.filter(
			item => item.store_name === this.storeName
		);
		const selectedMethod = currentVendor[0].chosen_method;

		this.setState({
			selectedMethod: selectedMethod,
			availAbleMethods: currentVendor[0].available_methods,
		});
	}

	onPressShippingMethod = shippingID => {
		this.props.onSelectNewShippingMethod(this.storeName, shippingID);
		this.setState({ selectedMethod: shippingID });
	};

	renderShippingMethods = () => {
		return this.state.availAbleMethods.map(item => (
			<View key={item.id} style={[css.row, { borderColor: 'transparent' }]}>
				<Text style={css.label}>
					{`${item.label} ${currencyFormatter(item.cost)}`}
				</Text>
				<RadioButton
					animation={'bounceIn'}
					isSelected={item.id === this.state.selectedMethod}
					innerColor="#1ABC9C"
					outerColor="#1ABC9C"
					size={14}
					onPress={() => this.onPressShippingMethod(item.id)}
				/>
			</View>
		));
	};

	render() {
		const { userCountry, shippingMethods } = this.props;

		return (
			<View style={{ flex: 1 }}>
				<TouchableOpacity
					style={[css.row, { flex: 0.2 }]}
					onPress={() => this.handleDeliveryInfoPress()}>
					<View>
						<Text style={[css.label, { color: '#9B59B6' }]}>
							Delivery Address
						</Text>
						<Text style={{ color: '#7D8693' }}>Change Address</Text>
					</View>
					<View style={{ justifyContent: 'center' }}>
						<Icon
							color="#7D8693"
							name={Icons.MaterialCommunityIcons.ForwardChevron}
							size={30}
						/>
					</View>
				</TouchableOpacity>

				{userCountry !== '' && shippingMethods.length !== 0 && (
					<View style={{ flex: 0.8, paddingVertical: 10 }}>
						<View style={[css.row, { borderColor: 'transparent' }]}>
							<Text style={{ color: '#7D8693' }}>Shipping Methods</Text>
						</View>
						<ScrollView>{this.renderShippingMethods()}</ScrollView>
					</View>
				)}
				{userCountry !== '' && shippingMethods.length === 0 && (
					<View style={{ flex: 0.8, paddingVertical: 10 }}>
						<View style={[css.row, { borderColor: 'transparent' }]}>
							<Text style={{ color: '#7D8693' }}>
								Shipping is not Available to this Address
							</Text>
						</View>
					</View>
				)}
				{userCountry === '' && (
					<View
						style={{
							flex: 0.5,
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<Text style={{ color: 'red' }}>
							Add address to calculate shipping
						</Text>
					</View>
				)}

				{/* <CancelSaveButtons
					isAbsolute
					onCancelCartModal={this.onCancelCartModal}
					onSaveCartModal={this.onSaveCartModal}
					isCartFetching={this.props.isCartFetching}
				/> */}
			</View>
		);
	}
}

export default ShippingMethods;
