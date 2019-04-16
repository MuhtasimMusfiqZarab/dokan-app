/** @format */

import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Constants, Color } from '@common';
import { toast } from '@app/Omni';

class ChangeQuantity extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isDisabled: false,
			updatedQuantity: '',
			isCartUpdating: false,
		};
		this.quantity = props.quantity;
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.quantity !== 'undefined') {
			this.setState({
				updatedQuantity: nextProps.quantity,
			});
		}
	}

	increase = async () => {
		const { updateCartItem, productKey, token } = this.props;

		if (
			this.quantity < Constants.LimitAddToCart &&
			this.state.updatedQuantity < Constants.LimitAddToCart
		) {
			await updateCartItem(productKey, this.quantity + 1, token);
			this.quantity = this.quantity + 1;
		} else {
			toast(`${Constants.LimitAddToCart} is the maximum limit`);
		}
	};

	reduced = async () => {
		const { updateCartItem, productKey, token } = this.props;

		if (this.quantity > 1 && this.state.updatedQuantity > 1) {
			await updateCartItem(productKey, this.quantity - 1, token);
			this.quantity = this.quantity - 1;
		}
	};

	render() {
		const hitSlop = { top: 20, right: 10, bottom: 20, left: 10 };
		const { isDisabled } = this.state;

		return (
			<View style={[styles.container, this.props.style]}>
				<TouchableOpacity
					style={styles.btnUp}
					hitSlop={hitSlop}
					onPress={!isDisabled ? this.increase : () => false}>
					<FontAwesome name="plus" size={16} color="#E94F44" />
				</TouchableOpacity>
				{!this.props.isCartUpdating && (
					<Text style={styles.text}>{this.state.updatedQuantity}</Text>
				)}
				{this.props.isCartUpdating && (
					<Text style={styles.text}>{this.quantity}</Text>
				)}
				<TouchableOpacity
					style={styles.btnDown}
					hitSlop={hitSlop}
					onPress={!isDisabled ? this.reduced : () => false}>
					<FontAwesome name="minus" size={16} color="#E94F44" />
				</TouchableOpacity>
			</View>
		);
	}
}
ChangeQuantity.defaultProps = {
	quantity: 1,
	onChangeQuantity: () => {},
};

const styles = StyleSheet.create({
	container: {
		width: 50,
		alignItems: 'center',
	},
	text: {
		fontSize: 18,
		fontFamily: Constants.fontFamily,
		color: Color.wdgray4,
		marginTop: 1,
		marginBottom: 1,
	},
	btnUp: {
		width: '100%',
		height: 40,
		backgroundColor: '#f7f8fa',
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnDown: {
		width: '100%',
		height: 40,
		backgroundColor: '#f7f8fa',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default ChangeQuantity;
