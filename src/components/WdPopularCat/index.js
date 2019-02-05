import React, { PureComponent } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Platform,
	Dimensions,
	TouchableOpacity,
} from 'react-native';
import { ButtonIndex } from '@components';
import { Color, Constants } from '@common';
import { NavigationActions } from 'react-navigation';
import { BlockTimer, CustomIcon, hexToRgb } from '@app/Omni';

const navigateAction = NavigationActions.navigate({
	routeName: 'CategoriesScreen',
});

export default class WdPopularCat extends PureComponent {
	onRowClickHandle = category => {
		const { setSelectedCategory, onViewCategory } = this.props;
		BlockTimer.execute(() => {
			setSelectedCategory({
				...category,
				mainCategory: category,
			});
			onViewCategory({ mainCategory: category });
		}, 500);
	};

	render() {
		return (
			<View style={styles.popCatWrapper}>
				<View style={styles.popCatContainer}>
					<View style={{ width: '100%', padding: 5, marginBottom: 10 }}>
						<Text
							style={{
								color: Color.wdDeepGray,
								fontSize: Constants.FontSize.heading1,
								fontFamily: Constants.fontFamilyLato,
								fontWeight: 'bold',
							}}>
							Popular Categories
						</Text>
					</View>
					{this.props.categories.map((item, index) => {
						if (index < 9) {
							let iconName = item.icon ? item.icon.replace('icon-', '') : '';
							let rgbColorCode = item.icon_color
								? hexToRgb(item.icon_color)
								: '';
							return (
								<TouchableOpacity
									key={`pcat-${index}`}
									onPress={() => this.onRowClickHandle(item)}
									style={[
										styles.popCat,
										{
											backgroundColor: rgbColorCode
												? `rgba(${rgbColorCode}, 0.1)`
												: 'rgba(255, 255, 255, 0.5)',
										},
									]}>
									<CustomIcon
										name={iconName}
										size={30}
										color={item.icon_color ? item.icon_color : 'black'}
									/>
									<Text style={{ color: '#808894', marginTop: 5 }}>
										{item.name}
									</Text>
								</TouchableOpacity>
							);
						}
					})}

					<View style={styles.btnContainer}>
						<ButtonIndex
							onPress={() => this.props.navigation.dispatch(navigateAction)}
							type="text"
							text="View all Categories"
							textStyle={{
								color: '#79828F',
								fontWeight: 'normal',
								fontFamily: Constants.fontFamilyLato,
							}}
							containerColor="#fff"
							containerStyle={{
								width: '50%',
								...Platform.select({
									ios: {
										shadowColor: '#000',
										shadowOpacity: 0.1,
										shadowOffset: { width: 1, height: 3 },
										shadowRadius: 10,
									},
									android: {
										elevation: 3,
									},
								}),
							}}
						/>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	popCatWrapper: {
		width: Dimensions.get('window').width,
		padding: 15,
	},
	popCatContainer: {
		flexDirection: 'row',
		width: '100%',
		padding: 10,
		flexWrap: 'wrap',
		marginBottom: 10,
		borderRadius: 5,
		backgroundColor: '#fff',
		...Platform.select({
			ios: {
				shadowColor: '#000',
				shadowOpacity: 0.1,
				shadowOffset: { width: 1, height: 3 },
				shadowRadius: 10,
			},
			android: {
				elevation: 3,
			},
		}),
	},
	popCat: {
		margin: 3,
		borderRadius: 3,
		width: '31%',
		height: 100,
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnContainer: {
		width: '100%',
		paddingTop: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 10,
	},
});
