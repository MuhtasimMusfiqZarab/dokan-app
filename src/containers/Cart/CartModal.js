/** @format */

import React, { PureComponent } from 'react';
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	Dimensions,
	I18nManager,
	Platform,
} from 'react-native';
import Modal from 'react-native-modalbox';
import EventEmitter from '@services/AppEventEmitter';
import { CartTotal } from './CartModalItems/CartTotal';
import { ShippingMethods } from './CartModalItems/ShippingMethods';

const { width, height } = Dimensions.get('window');

export default class CartModal extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			modalType: '',
			storeName: '',
		};
		this.modalOpenSub = '';
		this.modalCloseSub = '';
	}

	componentDidMount() {
		this.modalOpenSub = EventEmitter.addListener(
			'cartModal.open',
			(modalType, storeName) => this.openModal(modalType, storeName)
		);
		this.modalCloseSub = EventEmitter.addListener('cartModal.close', () =>
			this.closeModal()
		);
	}

	componentWillUnmount() {
		this.modalOpenSub && this.modalOpenSub.remove();
		this.modalCloseSub && this.modalCloseSub.remove();
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.shouldOpenCartModal) this.openModal();
	}

	closeModal = () => {
		this.props.setBottomButtons('prevNext');
		this.cartModal.close();
	};

	openModal = (modalType, storeName) => {
		modalType !== 'modalCartTotal' && this.props.setBottomButtons('cancelSave');
		this.setState({
			modalType: modalType,
			storeName: storeName,
		});

		this.cartModal.open();
	};

	onClose = () => this.props.setBottomButtons('prevNext');

	render() {
		const { modalType, storeName } = this.state;

		return (
			<Modal
				ref={modal => (this.cartModal = modal)}
				animationDuration={100}
				onClosed={this.onClose}
				backdropOpacity={0.5}
				useNativeDriver={false}
				position="bottom"
				style={[styles.cartModal]}>
				<View style={styles.cartWrap}>
					{modalType === 'modalCartTotal' && (
						<CartTotal
							subTotal={this.props.subTotal}
							shippingTotal={this.props.shippingTotal}
							discount={this.props.discount}
							totalPrice={this.props.totalPrice}
						/>
					)}
					{modalType === 'modalShippingMethods' && (
						<ShippingMethods
							navigation={this.props.navigation}
							storeName={storeName}
							shippingMethods={this.props.shippingMethods}
							onSelectNewShippingMethod={this.props.onSelectNewShippingMethod}
							userCountry={this.props.userCountry}
						/>
					)}
				</View>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	cartModal: {
		height: height / 3,
		backgroundColor: 'transparent',
		zIndex: 9999,
		right: I18nManager.isRTL ? 0 : null,
	},
	cartWrap: {
		flex: 1,
		padding: 10,
		backgroundColor: 'rgba(255,255,255, 1)',
	},
});
