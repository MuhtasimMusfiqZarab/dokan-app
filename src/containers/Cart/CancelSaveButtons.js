/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Button } from '@components';
import { Languages, Images } from '@common';
import { currencyFormatter } from '@app/Omni';
import * as Animatable from 'react-native-animatable';
import styles from './styles';

const CancelSaveButtons = ({
	isAbsolute,
	onCancelCartModal,
	onSaveCartModal,
	isCartFetching,
}) => {
	return (
		<View style={[styles.bottomView, isAbsolute && styles.floatView]}>
			<Button
				text="Cancel"
				color="#999"
				style={styles.btnBack}
				textStyle={styles.btnBackText}
				onPress={onCancelCartModal}
			/>
			<Button
				text="Save"
				style={styles.btnBuy}
				textStyle={styles.btnBuyText}
				onPress={onSaveCartModal}
			/>
		</View>
	);
};

CancelSaveButtons.propTypes = {
	isAbsolute: PropTypes.bool,
	onCancelCartModal: PropTypes.func.isRequired,
	onSaveCartModal: PropTypes.func.isRequired,
	isCartFetching: PropTypes.bool,
};

export default CancelSaveButtons;
