/**
 * Created by InspireUI on 18/02/2017.
 *
 * @format
 */

import React, { Component } from "react";
import { I18nManager } from "react-native";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";
import OneSignal from "react-native-onesignal";
import { Languages, Constants } from "@common";
import { EventEmitter, getNotification } from "@app/Omni";
import Reactotron from "reactotron-react-native";
import store from "@store/configureStore";
import "./../ReactotronConfig";
import Router from "./Router";

export default class ReduxWrapper extends Component {
  async componentDidMount() {
    const notification = await getNotification();

    if (notification) {
      OneSignal.removeEventListener("opened", this.onOpened);
      OneSignal.addEventListener("received", this.onReceived);
      OneSignal.addEventListener("ids", this.onIds);
    }
    // console.ignoredYellowBox = ['Warning: View.propTypes', 'Warning: BackAndroid'];

    const language = store.getState().language;
    // set default Language for App
    Languages.setLanguage(language.lang);
    EventEmitter.emit(Constants.EmitCode.MenuReload, language.lang);
    // Enable for mode RTL
    I18nManager.forceRTL(language.rtl);

    if (__DEV__) {
      Reactotron.connect();
      Reactotron.clear();
    }
  }

  async componentWillUnmount() {
    const notification = await getNotification();

    if (notification) {
      OneSignal.removeEventListener("opened", this.onOpened);
      OneSignal.removeEventListener("received", this.onReceived);
      OneSignal.removeEventListener("ids", this.onIds);
    }
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log("Message: ", openResult.notification.payload.body);
    console.log("Data: ", openResult.notification.payload.additionalData);
    console.log("isActive: ", openResult.notification.isAppInFocus);
    console.log("openResult: ", openResult);
  }

  onIds(device) {
    console.log("Device info: ", device);
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
