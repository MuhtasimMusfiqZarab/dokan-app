/** @format */

import React from 'react';
import { View, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { Color } from '@common';

const { width, height } = Dimensions.get('window');
const SIZES = { SMALL: 'small', LARGE: 'large' };

export const Mode = { normal: 'normal', full: 'full', overlay: 'overlay' };

class Spinner extends React.Component {
	constructor(props) {
		super(props);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { animating } = nextProps;
		this.setState({ animating });
	}

	render() {
		const { size, color, mode } = this.props;

		let containerStyle = styles.container;
		switch (mode) {
			case Mode.full:
				containerStyle = styles.container_full_stretch;
				break;
			case Mode.overlay:
				containerStyle = styles.container_overlay;
				break;
		}
		return (
			<View
				style={[
					containerStyle,
					{
						backgroundColor: this.props.backgroundColor
							? this.props.backgroundColor
							: 'rgba(255, 255, 255, 0.6)',
					},
				]}>
				<ActivityIndicator
					size={size}
					color={color}
					style={[
						styles.wrapper,
						{
							borderRadius: size == SIZES.SMALL ? 10 : 20,
							zIndex: 99,
						},
					]}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'transparent',
		height: null,
		width: null,
	},
	container_full_stretch: {
		flexGrow: 1,
		height: null,
		width: null,
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center',
	},
	container_overlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		width,
		height,
		// backgroundColor: `rgba(255, 255, 255, 0.6)`,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 9999,
	},
	wrapper: {
		backgroundColor: 'transparent',
		zIndex: 100,
	},
});

Spinner.defaultProps = {
	color: Color.theme,
	size: 'large',
	mode: Mode.normal,
};

export default Spinner;
