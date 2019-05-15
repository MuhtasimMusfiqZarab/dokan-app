/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Button } from '@components';
import { Languages, Images, Icons } from '@common';
import { currencyFormatter } from '@app/Omni';
import * as Animatable from 'react-native-animatable';
import styles from './styles';

const Buttons = ({
	isAbsolute,
	onPrevious,
	isLoading,
	nextText,
	onNext,
	totalPrice,
	isCartFetching,
	openCartModal,
}) => {
	return (
		<View style={[styles.bottomView, isAbsolute && styles.floatView]}>
			{totalPrice ? (
				<Button
					text={`Total: ${currencyFormatter(totalPrice)}`}
					color="#999"
					style={styles.btnBack}
					textStyle={styles.btnBackText}
					onPress={openCartModal}
					isLoading={isCartFetching}
					disabled={isCartFetching}
					iconRight={Icons.MaterialCommunityIcons.UpChevron}
				/>
			) : (
				<Button
					text={Languages.Back}
					icon={Images.icons.backs}
					color="#999"
					style={styles.btnBack}
					textStyle={styles.btnBackText}
					onPress={onPrevious}
					disabled={isCartFetching}
				/>
			)}
			{/* <Button
				text={Languages.Back}
				icon={Images.icons.backs}
				color="#999"
				style={styles.btnBack}
				textStyle={styles.btnBackText}
				onPress={onPrevious}
			/> */}
			{isLoading ? (
				<View style={styles.btnBuy}>
					<Animatable.Text
						style={styles.btnBuyText}
						animation="pulse"
						iterationCount="infinite">
						{Languages.Loading}
					</Animatable.Text>
				</View>
			) : (
				<Button
					text={nextText || Languages.NextStep}
					style={styles.btnBuy}
					textStyle={styles.btnBuyText}
					onPress={onNext}
				/>
			)}
		</View>
	);
};

Buttons.propTypes = {
	isAbsolute: PropTypes.bool,
	onPrevious: PropTypes.func.isRequired,
	isLoading: PropTypes.bool,
	nextText: PropTypes.any,
	onNext: PropTypes.func.isRequired,
	totalPrice: PropTypes.number,
	isCartFetching: PropTypes.bool,
	openCartModal: PropTypes.func,
};

export default Buttons;
