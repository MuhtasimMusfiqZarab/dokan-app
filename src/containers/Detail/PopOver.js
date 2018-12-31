import React, { PureComponent } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Button } from "@components";

export default class PopOver extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.popOver}>
				<Button
					type="text"
					style={[
						styles.popOverBtn,
						{marginBottom: 15}
					]}
					icon="mail2"
					iconStyle={[
						styles.popOverBtnIcon,
						{color: "#F5A623"},
					]}
					iconSize={16}
					text="Message"
					textStyle={styles.popOverBtnText}
				/>
				<Button
					type="text"
					style={[
						styles.popOverBtn,
						{marginBottom: 15}
					]}
					icon="share2"
					iconStyle={[
						styles.popOverBtnIcon,
						{color: "#E94F44"}
					]}
					iconSize={16}
					text="Share This Product"
					textStyle={styles.popOverBtnText}
					onPress={this.props.share}
				/>
				<Button
					type="text"
					style={styles.popOverBtn}
					icon="images"
					iconStyle={[
						styles.popOverBtnIcon,
						{color: "#1ABC9C"}
					]}
					iconSize={16}
					text="Media Gallery"
					textStyle={styles.popOverBtnText}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	popOver: {
		padding: 15,
		flexDirection: "column",
		backgroundColor: "#fff",
		borderRadius: 5,
		position: "absolute",
		right: 20,
		zIndex: 100,
		...Platform.select({
			ios: {
				shadowColor: "#000",
				shadowOpacity: 0.3,
				shadowOffset: {width: -1, height: 1},
			},
			android: {
				elevation: 3
			}
		})
	},
	popOverBtn: {
		alignItems: "flex-start",
		backgroundColor: "#fff",
	},
	popOverBtnIcon: {
		marginRight: 10
	},
	popOverBtnText: {
		marginTop: 0,
		fontSize: 14,
		color: "#7C8592"
	}
})