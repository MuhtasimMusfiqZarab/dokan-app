/** @format */

import React, { Component } from "react";
import {
	Text,
	Platform,
	TouchableOpacity,
	StyleSheet,
	Image,
} from "react-native";
import { Color, Styles } from "@common";
import { CustomIcon, Icon } from "@app/Omni";
import * as Animatable from "react-native-animatable";

class NavigationBarIcon extends Component {
	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		if (
			typeof this.props.number != "undefined" &&
			this.refs.menu &&
			this.props.number != nextProps.number
		) {
			this.refs.menu.fadeInDown(600);
		}
	}

	render() {
		const { onPress, number, icon, color, size, type } = this.props;
		const iconColor = color ? color : "#000";
		
		const renderItem = () => {
			if (type === "icon") {
				return (
					<CustomIcon
						name={icon}
						style={[
							styles.icon,
							{ color: iconColor },
						]}
						size={size ? size : 18}
					/>
				)
			} else if (type === "materialIcon") {
				return (
					<Icon
						name={icon}
						style={[
							styles.icon,
							{ color: iconColor },
						]}
						size={size ? size : 18}
					/>
				)
			} else {
				return (
					<Image
						source={icon}
						style={[
							styles.icon,
							{ tintColor: iconColor },
							{
								width: size ? size : Styles.IconSize.ToolBar,
								height: size ? size : Styles.IconSize.ToolBar,
							},
						]}
						resizeMode="contain"
					/>
				)
			}
		}
		
		return (
			<TouchableOpacity onPress={onPress} style={styles.iconWrap}>
				{renderItem()}
				{!number ? null : (
					<Animatable.View ref="menu" style={styles.numberWrap}>
						<Text style={styles.number}>{number}</Text>
					</Animatable.View>
				)}
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	iconWrap: {
		...Styles.Common.ColumnCenter,
		width: Platform.OS === "android" ? 30 : Styles.headerHeight,
		height: Styles.headerHeight,
		// marginRight: 5
	},
	numberWrap: {
		...Styles.Common.ColumnCenter,
		position: "absolute",
		top: Platform.OS === "ios" ? 1 : 8,
		right: Platform.OS === "ios" ? 20 : 18,
		height: 20,
		minWidth: 20,
		backgroundColor: Color.error,
		borderRadius: 10,
	},
	number: {
		color: "white",
		fontSize: 12,
		marginLeft: 3,
		marginRight: 3,
	},
	icon: {
		opacity: 0.8,
	},
});

NavigationBarIcon.defaultProps = {
	number: 0,
};

export default NavigationBarIcon;
