import React, {PureComponent} from "react";
import { View, Text, StyleSheet } from "react-native";
import striptags from 'striptags';
import { Constants } from "@common"
import { ImageCache } from "@components";

export default class AccordionDescription extends PureComponent {
	render() {
		const productDescription = striptags(this.props.product.description);
		
		return (
			<View>
				<ImageCache
					uri={this.props.product.images[0].src}
					style={styles.accordionDescriptionImage}
				/>
				<Text style={styles.accordionDescriptionText}>
					{productDescription}
				</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	accordionDescriptionImage: {
		width: '100%',
		height: 200,
		borderRadius: 5,
		marginBottom: 20,
	},
	accordionDescriptionText: {
		color: "#9199A4",
		fontSize: 16,
		fontFamily: Constants.fontFamilyLato,
	}
})
