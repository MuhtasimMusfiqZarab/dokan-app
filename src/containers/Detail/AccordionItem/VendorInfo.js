import React, {PureComponent} from "react";
import { View, Text } from "react-native";
import _ from "lodash";
import { Rating } from "@components";

export default class AccordionVendorInfo extends PureComponent {
	getAddress = () => {
		const addressObj = this.props.store.address;

		if(!_.isEmpty(addressObj)) {
			const street1 = addressObj.street_1;
			const street2 = addressObj.street_2;
			const state = addressObj.state;
			const city = addressObj.city;
			const country = addressObj.country
			const zip = addressObj.zip
			const fullAdressString = `${street1} ${street2} ${state} ${city}-${zip} ${country}`;

			return fullAdressString;
		} else {
			return "Nothing Found!";
		}

	}

	render() {
		const { store } = this.props;
		const address = this.getAddress();

		return (
			<View>
				<View style={{marginBottom: 20}}>
					<Text style={{color: "#000", fontSize: 18}}>{store.shop_name}</Text>
					<Rating rating={4.5} size={15} />
				</View>

				<View style={{flexDirection: "row", marginBottom: 5}}>
					<Text style={{flex: 1, color: "#A5B1B5"}}>Vendor: </Text>
					<Text style={{flex: 2, color: "#000"}}>{store.name}</Text>
				</View>
				<View style={{flexDirection: "row", marginBottom: 5}}>
					<Text style={{flex: 1, color: "#A5B1B5"}}>Address: </Text>
					<Text style={{flex: 2, color: "#000"}}>
						{address}
					</Text>
				</View>
			</View>
		)
	}
}