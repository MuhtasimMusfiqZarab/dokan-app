/**
 * @format
 */

import React, { Component } from 'react';
import { I18nManager } from 'react-native';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import OneSignal from 'react-native-onesignal';
import { Languages, Constants } from '@common';
import { EventEmitter, getNotification } from '@app/Omni';
import store from '@store/configureStore';
import Router from './src/Router';

export default class ReduxWrapper extends Component {
	constructor(props) {
		super(props);
		// OneSignal.init('265739e7-93c8-49f8-b1a0-f69990ce8458');
		OneSignal.init('4c6151ae-422f-4c17-8884-40df44509e27');
		OneSignal.inFocusDisplaying(2);
	}

	async componentDidMount() {
		const notification = await getNotification();

		// Check push notification and OneSignal subscription statuses
		OneSignal.getPermissionSubscriptionState(status => {
			console.log(status);
		});

		if (notification) {
			console.log(notification);
			OneSignal.setSubscription(true);
			OneSignal.addEventListener('opened', this.onOpened);
			OneSignal.addEventListener('received', this.onReceived);
			OneSignal.addEventListener('ids', this.onIds);
		} else {
			OneSignal.setSubscription(false);
		}

		// set default Language for App
		const language = store.getState().language;
		Languages.setLanguage(language.lang);
		EventEmitter.emit(Constants.EmitCode.MenuReload, language.lang);

		// Enable for mode RTL
		I18nManager.forceRTL(language.rtl);
	}

	async componentWillUnmount() {
		const notification = await getNotification();

		if (notification) {
			OneSignal.removeEventListener('opened', this.onOpened);
			OneSignal.removeEventListener('received', this.onReceived);
			OneSignal.removeEventListener('ids', this.onIds);
		}
		// OneSignal.removeEventListener('opened', this.onOpened);
		// OneSignal.removeEventListener('received', this.onReceived);
		// OneSignal.removeEventListener('ids', this.onIds);
	}

	onReceived(notification) {
		console.log('Notification received: ', notification);
	}

	onOpened(openResult) {
		console.log('Message: ', openResult.notification.payload.body);
		console.log('Data: ', openResult.notification.payload.additionalData);
		console.log('isActive: ', openResult.notification.isAppInFocus);
		console.log('openResult: ', openResult);
	}

	onIds(device) {
		console.log('Device info: ', device);
	}

	render() {
		const persistor = persistStore(store);

		return (
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<Router />
				</PersistGate>
			</Provider>
		);
	}
}
