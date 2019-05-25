/** @format */

import React, { PureComponent, Component } from 'react';
import {
	View,
	Text,
	Image,
	ScrollView,
	StyleSheet,
	Dimensions,
	I18nManager,
} from 'react-native';
import Modal from 'react-native-modalbox';
import { Chip } from 'react-native-paper';
import { currencyFormatter, toast } from '@app/Omni';
import { Constants, Styles, Color, Events } from '@common';
import VariationButton from './VariationButton';
import EventEmitter from '@services/AppEventEmitter';

export default class VariationModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			attributeWithOptions: this.props.attributeWithOptions,
		};

		this.modalOpenSub = '';
		this.modalCloseSub = '';
		this.selectedAttribute = {};
		this.selectedOptions = [];
		this.goToCart = false;
	}

	componentDidMount() {
		this.modalOpenSub = EventEmitter.addListener('variationModal.open', go =>
			this.openModal(go)
		);
		this.modalCloseSub = EventEmitter.addListener('variationModal.close', () =>
			this.modal.close()
		);
	}

	openModal = go => {
		this.goToCart = go;
		this.modal.open();
	};

	componentWillUnmount() {
		this.modalOpenSub && this.modalOpenSub.remove();
		this.modalCloseSub && this.modalCloseSub.remove();
	}

	onPressVariation = (attribute, option) => {
		const prevState = this.state.attributeWithOptions;

		// Build the new object
		Object.keys(prevState).map(key => {
			if (key === attribute) {
				this.selectedAttribute[key] = {
					options: [option],
				};
			} else if (
				key !== attribute &&
				this.selectedAttribute[key] !== undefined &&
				this.selectedAttribute[key].length !== 0
			) {
				return;
			} else {
				this.selectedAttribute[key] = prevState[key];
			}
		});

		Object.keys(this.selectedAttribute).map(key => {
			if (this.selectedAttribute[key].options.length === 0) {
				this.selectedOptions = [];
			} else {
				this.selectedOptions.push(this.selectedAttribute[key].options[0]);
			}
		});

		if (this.selectedOptions.length === this.props.product.attributes.length) {
			this.props.updateSelectedVariation(this.selectedOptions);
			this.selectedOptions = [];
		}

		this.setState({
			attributeWithOptions: this.selectedAttribute,
		});
	};

	onCancel = () => {
		Events.closeVariationModal();
	};

	onDone = () => {
		const { attributeWithOptions } = this.state;
		const { product } = this.props;
		let selectedOptions = [];

		Object.keys(attributeWithOptions).map(key => {
			if (attributeWithOptions[key].options.length === 0) {
				return;
			} else {
				selectedOptions.push(attributeWithOptions[key].options[0]);
			}
		});

		if (selectedOptions.length === 0) {
			const text = `Please select ${product.attributes.map(
				(attribute, index) => {
					if (index === product.attributes.length - 1) {
						return `${attribute.name}`;
					} else {
						return `${attribute.name}, `;
					}
				}
			)}`;

			toast(text);
		} else if (selectedOptions.length === product.attributes.length - 1) {
			Object.keys(attributeWithOptions).map(key => {
				if (attributeWithOptions[key].options.length === 0) {
					toast(`Select ${key}`);
					return;
				}
			});
		} else {
			this.props.addToCart(this.goToCart);
			Events.closeVariationModal();
		}
	};

	render() {
		const { attributeWithOptions } = this.state;
		const { product, selectVariation } = this.props;
		const productPrice = currencyFormatter(
			selectVariation ? selectVariation.regular_price : product.price
		);

		return (
			<Modal
				ref={modal => (this.modal = modal)}
				animationDuration={300}
				swipeToClose={false}
				onClosed={this.onClose}
				backdropOpacity={0.5}
				useNativeDriver={false}
				style={[styles.modal]}>
				<View style={styles.Wrap}>
					<ScrollView>
						<View style={styles.prdocutContainer}>
							<View style={styles.productImage}>
								<Image
									source={{ uri: product.images[0].src }}
									style={{ width: '100%', height: '100%' }}
									resizeMode="cover"
								/>
							</View>
							<View style={styles.productDetails}>
								<Text style={styles.productName}>{product.name}</Text>
								<Text style={styles.productPrice}>{productPrice}</Text>
							</View>
						</View>
						{this.props.attributes !== undefined &&
							this.props.attributes.map((attribute, index) => {
								let data = [];
								for (let i = 0; i < attribute.options.length; i++) {
									let obj = { value: attribute.options[i] };
									data.push(obj);
								}

								return (
									<View style={{ marginBottom: 15 }} key={index}>
										<Text style={styles.attributeTtile}>
											Select: {attribute.name}
										</Text>
										<View style={styles.optionContainer}>
											{attribute.options.map((option, index) => {
												let attrName = attribute.name;
												return (
													<Chip
														key={index}
														style={{ marginRight: 5, marginVertical: 5 }}
														selected={attributeWithOptions[
															attrName
														].options.includes(option)}
														onPress={() =>
															this.onPressVariation(attribute.name, option)
														}
														mode="outlined">
														{option}
													</Chip>
												);
											})}
										</View>
									</View>
								);
							})}
					</ScrollView>
				</View>
				<VariationButton onCancel={this.onCancel} onDone={this.onDone} />
			</Modal>
		);
	}
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
	modal: {
		backgroundColor: 'transparent',
		zIndex: 9999,
		right: I18nManager.isRTL ? 0 : null,
	},
	Wrap: {
		flex: 1,
		padding: 10,
		backgroundColor: 'rgba(255,255,255, 1)',
	},
	prdocutContainer: {
		flexDirection: 'row',
		marginBottom: 20,
		paddingVertical: 15,
	},
	productImage: {
		width: width / 3,
		height: width / 3.5,
		borderRadius: 5,
		backgroundColor: '#fff',
		marginRight: 10,
	},
	productDetails: {
		flexWrap: 'wrap',
	},
	productName: {
		color: Color.blackTextSecondary,
		fontSize: Styles.FontSize.big,
		fontFamily: Constants.fontFamilyLato,
		marginBottom: 5,
	},
	productPrice: {
		color: Color.blackTextPrimary,
		fontSize: Styles.FontSize.large,
		fontFamily: Constants.fontFamilyLato,
	},
	attributeTtile: {
		fontFamily: Constants.fontFamilyLato,
		fontSize: Styles.FontSize.large,
		color: Color.blackTextPrimary,
		marginBottom: 5,
	},
	optionContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
});
