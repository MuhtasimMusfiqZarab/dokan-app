/** @format */

import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '@components';
import { Constants, Color } from '@common';

export default class FilterButtons extends PureComponent {
	state = {
		selectedIndex: 0,
	};

	onPressAll = () => {
		this.setState({
			selectedIndex: 0,
		});
		this.props.onSelectAll();
	};

	onPressCompleted = () => {
		this.setState({
			selectedIndex: 1,
		});
		this.props.onSelectComplete();
	};

	render() {
		const { isAbsolute } = this.props;
		const { selectedIndex } = this.state;

		return (
			<View style={[styles.bottomView, isAbsolute && styles.floatView]}>
				<Button
					text={'All'}
					color="#999"
					style={[
						styles.btnFilter,
						styles.btnFilterAll,
						selectedIndex === 0 && {
							backgroundColor: Color.BuyNowButton,
						},
					]}
					textStyle={[
						styles.btnFilterText,
						selectedIndex === 0 && { color: '#fff' },
					]}
					onPress={() => this.onPressAll()}
				/>
				<Button
					text={'Completed'}
					style={[
						styles.btnFilter,
						styles.btnFilterComplete,
						selectedIndex === 1 && {
							backgroundColor: Color.BuyNowButton,
						},
					]}
					textStyle={[
						styles.btnFilterText,
						selectedIndex === 1 && { color: '#fff' },
					]}
					onPress={() => this.onPressCompleted()}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	bottomView: {
		width: '50%',
		height: Constants.Dimension.ScreenHeight(0.05),
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: Color.BuyNowButton,
		borderRadius: 3,
		alignSelf: 'center',
		marginTop: Constants.Dimension.ScreenWidth(0.05),
	},
	floatView: {
		// width: Constants.Window.width,
		position: 'absolute',
	},
	btnFilter: {
		flex: 0.5,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	btnFilterAll: { borderTopLeftRadius: 3, borderBottomLeftRadius: 3 },
	btnFilterComplete: { borderTopRightRadius: 3, borderBottomRightRadius: 3 },
	btnFilterText: {
		color: Color.BuyNowButton,
		fontSize: 14,
		fontFamily: Constants.fontFamilyLato,
	},
});
