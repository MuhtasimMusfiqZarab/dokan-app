import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
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
						<Text style={{ color: '#000' }}>$50</Text>
					</View>
					<View style={css.row}>
						<Text style={{ color: '#000' }}>Total</Text>
						<Text style={{ color: '#000' }}>$50</Text>
					</View>
				</View>
			</View>
		);
	}
}

export default CartTotal;
