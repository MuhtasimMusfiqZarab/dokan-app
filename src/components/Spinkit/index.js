/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';
import Color from '@common/Color';
import styles from './styles';

const Spinkit = ({ css, size, color }) => (
	<View style={[styles.spinner, typeof css !== 'undefined' ? css : null]}>
		<ActivityIndicator
			color={color ? color : Color.spin}
			size={size ? size : 'small'}
		/>
	</View>
);

Spinkit.propTypes = {
	css: PropTypes.any,
	size: PropTypes.any,
	color: PropTypes.string,
};

export default Spinkit;
