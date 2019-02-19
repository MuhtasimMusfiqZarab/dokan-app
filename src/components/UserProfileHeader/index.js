/** @format */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Languages, Tools, Config } from '@common';
import styles from './styles';
import { LinearGradient } from '@expo';
import ImagePicker from 'react-native-image-picker';

export default class UserProfileHeader extends PureComponent {
	state = {
		isImageUploaded: false,
		avatarSource: null,
	};
	static propTypes = {
		onLogin: PropTypes.func.isRequired,
		onLogout: PropTypes.func.isRequired,
		user: PropTypes.object,
	};

	loginHandle = () => {
		if (this.props.user.name === Languages.Guest) {
			this.props.onLogin();
		} else {
			this.props.onLogout();
		}
	};

	uploadImageAsync = async (imgUri, base64Img, token) => {
		let apiUrl = Config.WooCommerce.url + '/wp-json/wp/v2/media';
		let formData = new FormData();

		//dynamically get file type
		let uriParts = imgUri.split('.');
		let fileType = uriParts[uriParts.length - 1];

		//generate some random number for the filename
		var randNumber1 = Math.floor(Math.random() * 100);
		var randNumber2 = Math.floor(Math.random() * 100);

		formData.append('file', {
			base64Img,
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

		console.log('header options: ', options);
		console.log('form-data options: ', formData);

		console.log(await fetch(apiUrl, options));
	};

	changeAvatar = () => {
		if (this.props.user.name === Languages.Guest) {
			this.props.onLogin();
		} else {
			const options = {
				title: 'Select Photo',
				mediaType: 'photo',
				maxWidth: 200,
				maxHeight: 200,
				storageOptions: {
					skipBackup: true,
					path: 'images',
				},
			};

			ImagePicker.showImagePicker(options, response => {
				console.log('Response = ', response);

				if (response.didCancel) {
					console.log('User cancelled image picker');
				} else if (response.error) {
					console.log('ImagePicker Error: ', response.error);
				} else if (response.customButton) {
					console.log('User tapped custom button: ', response.customButton);
				} else {
					// const source = { uri: response.uri };
					this.uploadImageAsync(
						response.uri,
						response.data,
						this.props.user.bearerToken
					);

					// You can also display the image using data:
					// const source = { uri: 'data:image/jpeg;base64,' + response.data };

					// this.setState({
					// 	avatarSource: source,
					// });
				}
			});
		}
	};

	render() {
		const { user } = this.props;
		console.log(user);
		const avatar = Tools.getAvatar(user);
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<LinearGradient
						colors={['#F76B1C', '#FAD961']}
						style={styles.headerGradient}
					/>

					<TouchableOpacity
						onPress={this.changeAvatar}
						style={styles.profilePic}>
						{this.state.isImageUploaded ? (
							<Image source={this.state.avatarSource} style={styles.avatar} />
						) : (
							<Image source={avatar} style={styles.avatar} />
						)}
					</TouchableOpacity>

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
