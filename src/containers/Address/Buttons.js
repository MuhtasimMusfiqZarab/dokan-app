/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Button } from '@components';
import { Languages, Images } from '@common';
import { currencyFormatter } from '@app/Omni';
import * as Animatable from 'react-native-animatable';
import styles from './styles';

const Buttons = ({ isAbsolute, onCancel, onSave, isBtnLoading }) => {
	return (
		<View style={[styles.bottomView, isAbsolute && styles.floatView]}>
			<Button
				text="Cancel"
				// color="#999"
				style={styles.btnCancel}
				textStyle={styles.btnCancelText}
				onPress={onCancel}
				disabled={isBtnLoading}
			/>
			<Button
				text="Save"
				loaderColor="#fff"
				style={styles.btnSave}
				textStyle={styles.btnSaveText}
				onPress={onSave}
				isLoading={isBtnLoading}
				disabled={isBtnLoading}
			/>
		</View>
	);
};

Buttons.propTypes = {
	isAbsolute: PropTypes.bool,
	onCancel: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired,
	isBtnLoading: PropTypes.bool,
};

export default Buttons;
