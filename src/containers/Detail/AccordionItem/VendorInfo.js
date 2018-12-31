import React, {PureComponent} from "react";
import { View, Text } from "react-native";
import { Rating } from "@components";

export default class AccordionVendorInfo extends PureComponent {
	render() {
		return (
			<View>
				<View style={{marginBottom: 20}}>
					<Text style={{color: "#000", fontSize: 18}}>Abstract Shop</Text>
					<Rating rating={4.5} size={15} />
				</View>

				<View style={{flexDirection: "row", marginBottom: 5}}>
					<Text style={{flex: 1, color: "#A5B1B5"}}>Vendor: </Text>
					<Text style={{flex: 2, color: "#000"}}>Fedric Patrick</Text>
				</View>
				<View style={{flexDirection: "row", marginBottom: 5}}>
					<Text style={{flex: 1, color: "#A5B1B5"}}>Address: </Text>
					<Text style={{flex: 2, color: "#000"}}>20/4, Katasur, Mohammadpur, Dhaka, Bangladesh</Text>
				</View>
			</View>
		)
	}
}