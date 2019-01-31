/**
 * @format
 */

import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from '@app/Omni';
import { Icons, Constants } from '@common';
import { actions } from '@redux/VendorRedux';
import { connect } from 'react-redux';
import styles from './styles';

class WdVendorListToolBar extends Component {
	state = {
		currentLayout: this.props.layoutVendorScreen,
	};

	layoutChangeHandler = () => {
		if (this.state.currentLayout == Constants.Layout.twoColumn) {
			this.props.switchLayoutVendorPage(
				Constants.Layout.simple,
				Icons.MaterialCommunityIcons.GridMode
			);
			this.setState({
				...this.state,
				currentLayout: Constants.Layout.simple,
			});
		} else {
			this.props.switchLayoutVendorPage(
				Constants.Layout.twoColumn,
				Icons.MaterialCommunityIcons.Categories
			);
			this.setState({
				...this.state,
				currentLayout: Constants.Layout.twoColumn,
			});
		}
	};

	render() {
		return (
			<View style={styles.toolbarContainer}>
				{/* <View style={styles.toolbarLeft}> */}
				<TouchableOpacity onPress={() => this.layoutChangeHandler()}>
					<Icon
						style={styles.toolbarIcon}
						name={this.props.layoutChangeIcon}
						size={18}
					/>
				</TouchableOpacity>
				{/* </View> */}
			</View>
		);
	}
}

const mapStateToProps = ({ vendors }) => ({
	layoutChangeIcon: vendors.layoutChangeIcon,
	layoutVendorScreen: vendors.layoutVendorScreen,
});
const switchLayoutVendorPage = actions.switchLayoutVendorPage;

export default connect(
	mapStateToProps,
	{ switchLayoutVendorPage }
)(WdVendorListToolBar);
