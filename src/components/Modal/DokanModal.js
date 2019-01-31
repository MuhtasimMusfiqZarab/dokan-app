/** @format */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Icons } from '@common';
import { IconIO } from '@app/Omni';
import Modal from 'react-native-modalbox';
import styles from './wdstyles';

export default class DokanModal extends PureComponent {
	static propTypes = {
		children: PropTypes.node,
		css: PropTypes.any,
		type: PropTypes.string,
		customStyle: PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			swipeToClose: true,
		};
	}

	closeModal = () => {
		this.modal.close();
	};

	openModal() {
		this.modal.open();
	}

	render() {
		return (
			<Modal
				style={[styles.dokanModal]}
				ref={modal => (this.modal = modal)}
				swipeToClose={this.state.swipeToClose}
				onClosed={this.onClose}
				onOpened={this.onOpen}
				coverScreen
				backdrop={false}>
				<View style={styles.dokanModalClose}>
					<TouchableOpacity onPress={() => this.closeModal()}>
						<IconIO name={Icons.Ionicons.Close} size={26} color="red" />
					</TouchableOpacity>
				</View>

				<View style={[styles.dokanModalContent, this.props.customStyle]}>
					{this.props.children}
				</View>
			</Modal>
		);
	}
}
