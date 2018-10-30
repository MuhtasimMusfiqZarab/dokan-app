import React from "react"
import {
  Text,
  View,
  Image,
  StyleSheet,
  I18nManager,
  TouchableOpacity,
  Platform,
  Dimensions
} from "react-native"
import { Config, Constants, Color, Images } from "@common";

// const onViewVendorScreen = (props, item) => {
//   props.fetchVendorProducts(item.id);
//   props.onViewVendorProfileScreen(item);
// }

const WdAtAGlance = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.atAglanceBtn}>
        <Image
          source={Images.CategoryColorIcon}
          style={styles.btnIconImage}
        />
				<Text>Categories</Text>
      </TouchableOpacity>
			<TouchableOpacity style={styles.atAglanceBtn}>
        <Image
          source={Images.VendorColorIcon}
          style={styles.btnIconImage}
        />
				<Text>Vendors</Text>
      </TouchableOpacity>
			<TouchableOpacity style={styles.atAglanceBtn}>
        <Image
          source={Images.ProductColorIcon}
          style={styles.btnIconImage}
        />
				<Text>Products</Text>
      </TouchableOpacity>
    </View>
  )
}

export default WdAtAGlance

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 15,
    marginBottom: 15,
    width: Dimensions.get('window').width,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  atAglanceBtn: {
    width: 100,
    height: 80,
    backgroundColor: "#fff",
    borderRadius: 5,
    justifyContent: "center",
		alignItems: "center",
		...Platform.select({
			ios: {
				shadowColor: "#000",
				shadowOpacity: 0.3,
				shadowOffset: {width: 0, height: 1}
			},
			android: {
				elevation: 3
			}
		})
  },
  btnIconImage: {
    width: 20,
    height: 20,
    marginTop: 10,
    marginBottom: 10
  }
})