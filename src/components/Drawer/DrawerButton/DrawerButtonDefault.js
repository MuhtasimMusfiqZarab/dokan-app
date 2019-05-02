/**
 * @format
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet,
	TouchableOpacity,
	I18nManager,
	Text,
	Platform,
} from 'react-native';
import { Styles, Color, Constants, Languages } from '@common';
import { Icon } from '@app/Omni';

class DrawerButton extends PureComponent {
	render() {
		const {
			text,
			onPress,
			iconLeft,
			uppercase,
			// textStyle,
			isActive,
			colorText,
		} = this.props;
		const transText = text !== '' && Languages[text] ? Languages[text] : text;

		return (
			<TouchableOpacity
				activeOpacity={0.8}
				style={[
					styles.container,
					isActive && {
						borderLeftWidth: 1,
						borderColor: colorText,
					},
				]}
				onPress={onPress}>
				<Icon
					style={
						isActive && {
							...Platform.select({
								ios: {
									shadowOffset: { width: 0, height: 2 },
									shadowColor: 'black',
									shadowOpacity: 0.5,
								},
							}),
						}
					}
					name={iconLeft}
					color={isActive ? '#F06352' : Color.wdgray}
					size={20}
				/>
				<Text
					style={[
						styles.text,
						I18nManager.isRTL && { paddingRight: 20 },
						isActive && {
							color: '#F06352',
						},
						colorText && {
							color: colorText,
						},
					]}>
					{uppercase ? transText.toUpperCase() : transText}
				</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		...Styles.Common.RowCenterLeft,
		paddingVertical: 10,
		paddingHorizontal: 20,
		flex: 1,
	},
	text: {
		// padding: 4,
		// color: Color.blackTextPrimary,
		paddingLeft: 10,
		color: Color.wdgray,
		fontSize: Styles.FontSize.medium,
		fontFamily: Constants.fontFamilyLato,
	},
	activeIcon: {},
});

DrawerButton.propTypes = {
	text: PropTypes.string,
	onPress: PropTypes.func,
	icon: PropTypes.string,
	uppercase: PropTypes.bool,
	isActive: PropTypes.bool,
	colorText: PropTypes.string,
	iconLeft: PropTypes.any,
};

DrawerButton.defaultProps = {
	uppercase: false,
	isActive: false,
	// colorText: true,
	text: 'Default button name',
	onPress: () => alert('Drawer button clicked'),
};

export default DrawerButton;
