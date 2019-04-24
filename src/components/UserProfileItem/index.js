/** @format */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	I18nManager,
} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { Icon } from '@app/Omni';
import { isBoolean } from 'lodash';

import styles from './styles';

export default class UserProfileItem extends PureComponent {
	static propTypes = {
		label: PropTypes.string,
		value: PropTypes.string,
		icon: PropTypes.any,
		onPress: PropTypes.any,
		iconLeft: PropTypes.any,
		valueBlack: PropTypes.any,
	};

	static defaultProps = {
		icon: false,
	};

	render() {
		const { label, value, onPress, icon, iconLeft, valueBlack } = this.props;

		return (
			<View style={styles.row}>
				<Icon
					name={iconLeft}
					color="#9B9B9B"
					size={20}
					style={{ marginRight: 15 }}
				/>
				<Text style={styles.leftText}>{label}</Text>
				{icon && isBoolean(icon) && (
					<TouchableOpacity onPress={onPress} style={styles.rightContainer}>
						<Text style={[styles.rightText, valueBlack && { color: '#000' }]}>
							{value}
						</Text>
						<IconEntypo
							style={[
								styles.icon,
								I18nManager.isRTL && {
									transform: [{ rotate: '180deg' }],
								},
							]}
							color="#CCCCCC"
							size={22}
							name="chevron-small-right"
						/>
					</TouchableOpacity>
				)}
				{icon && !isBoolean(icon) && (
					<View style={styles.rightContainer}>
						<Text style={[styles.rightText, valueBlack && { color: '#000' }]}>
							{value}
						</Text>
						{icon()}
					</View>
				)}
				{!icon && (
					<View style={styles.rightContainer}>
						<Text style={[styles.rightText, valueBlack && { color: '#000' }]}>
							{value}
						</Text>
					</View>
				)}
			</View>
		);
	}
}
