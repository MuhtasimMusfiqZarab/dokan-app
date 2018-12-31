/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity, I18nManager } from "react-native";
import IconEntypo from "react-native-vector-icons/Entypo";
import {Icon} from "@app/Omni";
import _ from "lodash";

import styles from "./styles";

export default class UserProfileItem extends PureComponent {
	static propTypes = {
		label: PropTypes.string,
		value: PropTypes.string,
		icon: PropTypes.any,
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
					style={{marginRight: 15}} />
				<Text style={styles.leftText}>{label}</Text>
				<TouchableOpacity onPress={onPress} style={styles.rightContainer}>
					<Text style={[styles.rightText, valueBlack && {color: "#000"} ]}>{value}</Text>
					{icon &&
						_.isBoolean(icon) && (
							<IconEntypo
								style={[
									styles.icon,
									I18nManager.isRTL && {
										transform: [{ rotate: "180deg" }],
									},
								]}
								color="#CCCCCC"
								size={22}
								name="chevron-small-right"
							/>
						)}
					{icon && !_.isBoolean(icon) && icon()}
				</TouchableOpacity>
			</View>
		);
	}
}
