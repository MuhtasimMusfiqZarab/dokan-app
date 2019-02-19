/**
 * @format
 */

import React, { PureComponent } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	ScrollView,
	TextInput,
	Switch,
	LayoutAnimation,
	ImageBackground,
	I18nManager,
	Dimensions,
	Platform,
} from 'react-native';
import { Styles, Languages, Color, Images, Config, Constants } from '@common';
import { toast, error, Validate } from '@app/Omni';
import { Button, ImageCache } from '@components';
import Spinner from '@components/Spinner';
import WPUserAPI from '@services/WPUserAPI';

import { connect } from 'react-redux';

export default class UserProfileEditScreen extends PureComponent {
	render() {
		return <Text>User Profile Edit</Text>;
	}
}
