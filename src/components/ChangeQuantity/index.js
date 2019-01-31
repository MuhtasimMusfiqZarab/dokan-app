/** @format */

import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Constants, Color } from '@common';

class ChangeQuantity extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			quantity: props.quantity,
		};
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.quantity !== 'undefined') {
			this.setState({ quantity: nextProps.quantity });
		}
	}

	increase = () => {
		if (this.state.quantity < Constants.LimitAddToCart) {
			this.props.onChangeQuantity(this.state.quantity + 1);
			this.setState({ quantity: this.state.quantity + 1 });
		}
	};

	reduced = () => {
		if (this.state.quantity > 1) {
			this.props.onChangeQuantity(this.state.quantity - 1);
			this.setState({ quantity: this.state.quantity - 1 });
		}
	};

	render() {
		const hitSlop = { top: 20, right: 10, bottom: 20, left: 10 };
		return (
			<View style={[styles.container, this.props.style]}>
				<TouchableOpacity
					style={styles.btnUp}
					hitSlop={hitSlop}
					onPress={this.increase}>
					<FontAwesome name="plus" size={16} color="#E94F44" />
				</TouchableOpacity>
				<Text style={styles.text}>{this.state.quantity}</Text>
				<TouchableOpacity
					style={styles.btnDown}
					hitSlop={hitSlop}
					onPress={this.reduced}>
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
