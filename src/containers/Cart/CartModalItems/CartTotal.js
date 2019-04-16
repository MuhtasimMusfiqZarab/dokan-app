import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { currencyFormatter } from '@app/Omni';
import css from '../styles';

export class CartTotal extends PureComponent {
	render() {
		return (
			<View style={{ height: 400 }}>
				<View style={css.row}>
					<Text style={css.label}>Cart Totals</Text>
				</View>
				<View>
					<View style={css.row}>
						<Text style={{ color: '#000' }}>Subtotal</Text>
						<Text style={{ color: '#000' }}>
							{currencyFormatter(this.props.subTotal)}
						</Text>
					</View>
					<View style={css.row}>
						<Text style={{ color: '#000' }}>Shipping Total</Text>
						<Text style={{ color: '#000' }}>
							{currencyFormatter(this.props.shippingTotal)}
						</Text>
					</View>
					<View style={css.row}>
						<Text style={{ color: '#000' }}>Discount</Text>
						<Text style={{ color: '#000' }}>{`-${currencyFormatter(
							this.props.discount
						)}`}</Text>
					</View>
					<View style={css.row}>
						<Text style={{ color: '#000', fontWeight: 'bold' }}>Total</Text>
						<Text style={{ color: '#000', fontWeight: 'bold' }}>
							{currencyFormatter(this.props.totalPrice)}
						</Text>
					</View>
				</View>
			</View>
		);
	}
}

export default CartTotal;
