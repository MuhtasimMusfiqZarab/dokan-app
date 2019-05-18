import React from 'react';
import { Text, View, StyleSheet, Platform, Dimensions } from 'react-native';
import { Icons, Color } from '@common';
import { TouchableScale } from '@components';
import { Icon } from '@app/Omni';
import { NavigationActions } from 'react-navigation';

const { width } = Dimensions.get('window');

const WdSearchBox = props => {
	return (
		<TouchableScale onPress={() => props.navigation.navigate('Search')}>
			<View style={styles.conatiner}>
				<View style={styles.searchArea}>
					<Text style={styles.searchText}>Search Product...</Text>
					<Icon
						style={styles.searchIcon}
						name={Icons.MaterialCommunityIcons.Search}
						size={20}
					/>
				</View>
			</View>
		</TouchableScale>
	);
};

const styles = StyleSheet.create({
	conatiner: {
		width: '100%',
		paddingHorizontal: 15,
		marginTop: 20,
		marginBottom: 20,
	},
	searchArea: {
		width: '100%',
		height: width / 8,
		paddingHorizontal: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignSelf: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
		borderRadius: 3,
		...Platform.select({
			ios: {
				shadowColor: '#000',
				shadowOpacity: 0.1,
				shadowOffset: { width: 0, height: 1 },
				shadowRadius: 10,
			},
			android: {
				elevation: 3,
			},
		}),
	},
	searchText: {
		color: Color.TextLight,
	},
	searchIcon: {
		color: Color.TextLight,
	},
});

export default WdSearchBox;
