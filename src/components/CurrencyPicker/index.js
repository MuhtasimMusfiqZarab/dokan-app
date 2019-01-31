/** @format */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { RadioButtons } from 'react-native-radio-buttons';
import CurrencyWorker from '@services/CurrencyWorker';
import _ from 'lodash';
import { Color } from '@common';
import { LinearGradient } from '@expo';
import styles from './styles';

class CurrencyPicker extends PureComponent {
	static propTypes = {
		changeCurrency: PropTypes.func.isRequired,
		currency: PropTypes.any,
	};

	constructor(props) {
		super(props);

		this.state = {};
	}

	_changeCurrency = selectedOption => {
		this.props.changeCurrency(selectedOption);
		// this.props.closeCurrencyModal();
	};

	_renderOptions = (option, selected, onSelect, index) => {
		const isLastOption = index === CurrencyWorker.length - 1;
		return (
			<LinearGradient
				key={index}
				start={{ x: 0.0, y: 0.5 }}
				end={{ x: 1.0, y: 0.5 }}
				locations={[0.0, 1.0]}
				colors={selected ? ['#FF9472', '#F2709C'] : ['#fff', '#fff']}>
				<TouchableOpacity
					onPress={onSelect}
					style={{
						padding: 10,
						flexDirection: 'row',
						alignItems: 'center',
						width: '100%',
						marginBottom: isLastOption ? 200 : 0,
					}}>
					<Text
						style={[
							styles.text,
							{
								color: selected ? '#fff' : Color.blackTextPrimary,
							},
						]}>
						{option.code}
					</Text>
					<Text
						style={
							selected
								? [styles.text, { color: '#fff' }]
								: { marginLeft: 10, color: Color.blackTextPrimary }
						}>
						({option.name})
					</Text>
				</TouchableOpacity>
			</LinearGradient>
		);
	};

	render() {
		const { currency } = this.props;
		const selectedIndex =
			currency &&
			_.findIndex(CurrencyWorker, o => {
				return o.code === currency.code;
			});

		return (
			<View>
				<RadioButtons
					options={CurrencyWorker}
					onSelection={this._changeCurrency}
					selectedIndex={selectedIndex}
					renderOption={this._renderOptions}
					renderContainer={optionNodes => (
						<ScrollView
							style={{
								height: null,
								width: '100%',
							}}>
							{optionNodes}
						</ScrollView>
					)}
				/>
			</View>
		);
	}
}

export default CurrencyPicker;
