/** @format */

import Icon from '@expo/vector-icons/SimpleLineIcons';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Platform, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modalbox';
import styles from './wdstyles';

export default class modalBox extends PureComponent {
	static propTypes = {
		children: PropTypes.node,
		css: PropTypes.any,
		type: PropTypes.string,
		swipeToClose: PropTypes.bool,
	};

	closeModal = () => {
		this.modal.close();
	};

	closeModalLayout() {
		this.modal.close();
	}

	openModal() {
		this.modal.open();
	}

	render() {
		const { type, css, swipeToClose } = this.props;

		return (
			<Modal
				ref={modal => (this.modal = modal)}
				animationDuration={100}
				swipeToClose={swipeToClose}
				backdropOpacity={Platform.OS === 'android' ? 0.9 : 0.5}
				position={type === 'cartModal' ? 'bottom' : 'top'}
				style={[
					typeof type !== 'undefined'
						? styles.modalReadlater
						: styles.modalBoxWrap,
					css,
				]}>
				<View style={styles.wrap}>{this.props.children}</View>
				<TouchableOpacity style={styles.iconZoom} onPress={this.closeModal}>
					<Icon
						style={styles.textClose}
						name="close"
						size={22}
						color="rgba(0,0,0, 0.4)"
						backgroundColor="transparent"
					/>
				</TouchableOpacity>
			</Modal>
		);
	}
}
