import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Constants } from '@common';
import { ImageCache } from '@components';
import { Dropdown } from 'react-native-material-dropdown';
import { TouchableRipple } from 'react-native-paper';

export default class AccordionProductVariation extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			clearVariation: false,
		};

		this.selectedOptions = [];
	}

	selectedItem = value => {
		console.log(value);
	};

	onChangeText = text => {
		this.selectedOptions.push(text);

		if (this.selectedOptions.length === this.props.attributes.length) {
			this.props.updateSelectedVariation(this.selectedOptions);
			this.selectedOptions = [];
			// this.setState({
			// 	clearVariation: true,
			// });
		}
	};

	render() {
		return (
			<View>
				{this.props.attributes.map((attribute, index) => {
					let data = [];
					for (let i = 0; i < attribute.options.length; i++) {
						let obj = { value: attribute.options[i] };
						data.push(obj);
					}

					return (
						<Dropdown
							label={attribute.name}
							data={data}
							key={index}
							onChangeText={this.onChangeText}
						/>
					);
				})}
				{this.state.clearVariation && (
					<TouchableRipple
						onPress={() => this.setState({ clearVariation: false })}
						rippleColor="rgba(0, 0, 0, .32)">
						<Text style={{ color: 'red', marginTop: 20 }}>Clear</Text>
					</TouchableRipple>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	accordionDescriptionImage: {
		width: '100%',
		height: 200,
		borderRadius: 5,
		marginBottom: 20,
	},
	accordionDescriptionText: {
		color: '#9199A4',
		fontSize: 16,
		fontFamily: Constants.fontFamilyLato,
	},
});
