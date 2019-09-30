/** @format */

import { Config, Languages, Tools } from '@common';
import { LinearGradient } from '@expo';
import { DokanWorker } from '@services/Dokan/DokanWorker';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import styles from './styles';

export default class UserProfileHeader extends PureComponent {
	state = {
		isImageUploaded: false,
		avatarSource: null,
	};
	static propTypes = {
		onLogin: PropTypes.func.isRequired,
		onLogout: PropTypes.func.isRequired,
		user: PropTypes.object,
		updateUser: PropTypes.func,
		changeLoadingState: PropTypes.func,
		loginType: PropTypes.string,
	};

	loginHandle = () => {
		if (this.props.user.name === Languages.Guest) {
			this.props.onLogin();
		} else {
			this.props.onLogout();
		}
	};

	uploadImageAsync = async (imgUri, token) => {
		this.props.changeLoadingState(true);

		let apiUrl = Config.WooCommerce.url + '/wp-json/dokan/v1/customers/me';
		let formData = new FormData();

		//dynamically get file type
		let uriParts = imgUri.split('.');
		let fileType = uriParts[uriParts.length - 1];

		//generate some random number for the filename
		var randNumber1 = Math.floor(Math.random() * 100);
		var randNumber2 = Math.floor(Math.random() * 100);

		formData.append('file', {
			uri: imgUri,
			name: `photo-${randNumber1}-${randNumber2}.${fileType}`,
			type: `image/${fileType}`,
		});

		let options = {
			method: 'POST',
			body: formData,
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer ' + token,
				'Content-Type': 'multipart/form-data',
				'Cache-Control': 'no-cache',
			},
		};

		const response = await fetch(apiUrl, options);
		const json = await response.json();

		if (json.id !== undefined) {
			const response = await DokanWorker.updateCustomerProfile(
				json.profile_picture,
				token
			);
			if (response.id) {
				this.props.updateUser(response);
				this.setState({ isImageUploaded: true, avatarSource: imgUri });
				this.props.changeLoadingState(false);
			}
		}
	};

	changeAvatar = () => {
		if (this.props.user.name === Languages.Guest) {
			this.props.onLogin();
		} else {
			const options = {
				title: 'Change Avatar',
				mediaType: 'photo',
				maxWidth: 200,
				maxHeight: 200,
				noData: true,
				storageOptions: {
					skipBackup: true,
					path: 'images',
				},
			};

			ImagePicker.showImagePicker(options, response => {
				if (response.didCancel) {
					console.log('User cancelled image picker');
				} else if (response.error) {
					console.log('ImagePicker Error: ', response.error);
				} else if (response.customButton) {
					console.log('User tapped custom button: ', response.customButton);
				} else {
					this.uploadImageAsync(response.uri, this.props.user.bearerToken);
				}
			});
		}
	};

	render() {
		const { user, loginType } = this.props;
		const avatar = Tools.getAvatar(user, loginType);

		console.log(loginType);
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<LinearGradient
						colors={['#F76B1C', '#FAD961']}
						style={styles.headerGradient}
					/>
					{loginType === 'regular' && (
						<TouchableOpacity
							onPress={this.changeAvatar}
							style={styles.profilePic}>
							{this.state.isImageUploaded ? (
								<Image
									source={{ uri: this.state.avatarSource }}
									style={styles.avatar}
								/>
							) : (
								<Image source={avatar} style={styles.avatar} />
							)}
						</TouchableOpacity>
					)}
					{loginType === 'facebook' && (
						<View style={styles.profilePic}>
							<Image source={avatar} style={styles.avatar} />
						</View>
					)}
					<View style={styles.textContainer}>
						<Text style={styles.fullName}>{user.name}</Text>
						<Text style={styles.address}>{user ? user.address : ''}</Text>

						<TouchableOpacity onPress={this.loginHandle}>
							<Text style={styles.loginText}>
								{user.name === Languages.Guest
									? Languages.Login
									: Languages.Logout}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}
