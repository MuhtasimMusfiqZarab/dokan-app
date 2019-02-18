import React, { PureComponent } from 'react';
import {
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
} from 'react-native';
import { Images, Constants, Config } from '@common';
import { LinearGradient } from '@expo';
import { ImageCache } from '@components';

export default class WdNewArrival extends PureComponent {
	constructor(props) {
		super(props);

		this.page = 1;
	}

	onPressNewArrival = () => {
		const { config, onShowAll, index } = this.props;

		config.name = 'newArrival';

		onShowAll(config, index);
	};

	render() {
		return (
			<LinearGradient
				colors={['#907CFF', '#6EACFF']}
				start={{ x: 0.0, y: 0.5 }}
				end={{ x: 1.0, y: 0.5 }}
				locations={[0.0, 1.0]}
				style={styles.gradientArea}>
				<TouchableOpacity onPress={() => this.onPressNewArrival()}>
					<Text style={styles.text}> New Arrivals </Text>
				</TouchableOpacity>
				{Config.appSettings.new_arrival_image ? (
					<ImageCache
						uri={Config.appSettings.new_arrival_image}
						style={styles.newArrivalImg}
					/>
				) : (
					<Image source={Images.NewArrival} style={styles.newArrivalImg} />
				)}
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	gradientArea: {
		width: Dimensions.get('window').width,
		height: 250,
		paddingHorizontal: 15,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 20,
	},
	text: {
		// backgroundColor: 'transparent',
		fontSize: Constants.FontSize.heading1,
		color: '#fff',
		fontFamily: Constants.fontFamilyLato,
		fontWeight: 'bold',
	},
	newArrivalImg: {
		width: 175,
		height: 150,
	},
});
