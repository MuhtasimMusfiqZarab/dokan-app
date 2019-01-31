import React, { PureComponent } from 'react';
import {
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
} from 'react-native';
import { Images } from '@common';
import { LinearGradient } from '@expo';

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
				<Image source={Images.NewArrival} style={styles.newArrivalImg} />
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	gradientArea: {
		width: Dimensions.get('window').width,
		height: 250,
		paddingLeft: 15,
		paddingRight: 15,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	text: {
		backgroundColor: 'transparent',
		fontSize: 22,
		color: '#fff',
	},
	newArrivalImg: {
		width: 175,
		height: 144,
	},
});
