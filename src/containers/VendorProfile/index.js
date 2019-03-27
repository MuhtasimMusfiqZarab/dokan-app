/** @format */

import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { VendorProfileHeader, Button, ProductList, Review } from '@components';
import { Constants } from '@common';
import VendorContact from './VendorContact';
import styles from './styles';

class VendorProfile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			tabIndex: 0,
			enableScrollViewScroll: true,
		};

		this.offsetY = 0;
	}

	// shouldComponentUpdate (nextProps) {
	//   return nextProps.vendor.id !== this.props.vendor.id
	// }

	handleClickTab = tabIndex => {
		this.setState({ tabIndex });
	};

	render() {
		const { vendor, navigation } = this.props;

		return (
			<View style={styles.container}>
				{/* <View
					style={{
						width: "100%",
						height: 50,
						backgroundColor: "blue",
						justifyContent: "center",
						alignItems: "center",
						position: "absolute",
						top: 0,
						left: 0,
						zIndex: 1
					}}
				>
					<Text style={{color: "white"}}>Transparent Header</Text>
				</View> */}

				<ScrollView
					keyboardDismissMode="on-drag"
					keyboardShouldPersistTaps="always">
					<VendorProfileHeader vendor={vendor} />
					<View style={styles.tabView}>
						<View
							style={[
								styles.tabButton,
								Constants.RTL && { flexDirection: 'row-reverse' },
							]}>
							<View style={styles.tabItem}>
								<Button
									type="tab"
									from="search"
									textStyle={styles.textTab}
									text={'Product'}
									onPress={() => this.handleClickTab(0)}
									selected={this.state.tabIndex == 0}
								/>
							</View>
							<View style={styles.tabItem}>
								<Button
									type="tab"
									textStyle={styles.textTab}
									text={'Review'}
									onPress={() => this.handleClickTab(1)}
									selected={this.state.tabIndex == 1}
								/>
							</View>
							<View style={styles.tabItem}>
								<Button
									type="tab"
									textStyle={styles.textTab}
									text={'Contact'}
									onPress={() => this.handleClickTab(2)}
									selected={this.state.tabIndex == 2}
								/>
							</View>
						</View>
						{this.state.tabIndex === 0 && (
							<View style={styles.tabContent}>
								<ProductList
									page={1}
									navigation={navigation}
									onViewProductScreen={item =>
										this.props.navigation.navigate('DetailScreen', item)
									}
									vendorID={vendor.id}
								/>
							</View>
						)}
						{this.state.tabIndex === 1 && (
							<View
								style={{
									padding: 20,
								}}>
								<Review vendorReview={true} />
							</View>
						)}
						{this.state.tabIndex === 2 && (
							<VendorContact
								location={vendor.location}
								storeName={vendor.store_name}
								address={vendor.address}
								phone={vendor.phone}
							/>
						)}
					</View>
				</ScrollView>
			</View>
		);
	}
}

export default VendorProfile;
