# Dokan App

A React Native mobile commerce application built for a WooCommerce-powered storefront. This project is structured around a Dokan marketplace setup and includes shopping, product browsing, categories, wishlist, cart, checkout, and app navigation flows.

## Overview

- React Native application
- Redux state management
- WooCommerce API integration
- Custom UI components and navigation flows
- Android and iOS support

## Tech Stack

- React Native 0.59.9
- React Navigation 3.x
- Redux + Redux Persist + Redux Thunk
- WooCommerce REST API
- Jest for testing
- Reactotron for debugging

## Project Structure

```bash
.
├── android/
├── ios/
├── assets/
├── src/
│   ├── common/
│   ├── components/
│   ├── containers/
│   ├── navigation/
│   ├── redux/
│   ├── selectors/
│   ├── services/
│   ├── store/
│   ├── ultils/
│   ├── Omni.js
│   ├── Router.js
│   └── selection.json
├── App.js
├── app.json
├── babel.config.js
├── index.js
├── metro.config.js
├── package.json
├── __tests__/
└── README.md
```

## Prerequisites

Before running the app, make sure you have the following installed:

- Node.js and npm
- React Native CLI
- Android Studio and Android SDK for Android development
- Xcode and CocoaPods for iOS development
- Watchman (recommended for macOS)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd dokan-app
```

2. Install dependencies:

```bash
npm install
```

3. Install iOS pods (if working on iOS):

```bash
cd ios && pod install && cd ..
```

## Configuration

The app is configured to work with a WooCommerce site in the file `src/common/Config.js`.

Update the following values for your project:

- WooCommerce URL
- consumerKey
- consumerSecret
- app branding and theme settings
- payment and menu configuration

Example configuration section:

```js
WooCommerce: {
  url: 'https://your-domain.com',
  consumerKey: 'your-consumer-key',
  consumerSecret: 'your-consumer-secret',
}
```

## Run the App

### Android

```bash
npx react-native run-android
```

### iOS

```bash
npx react-native run-ios
```

## Available Scripts

From the project root:

```bash
npm start
npm test
npm run android:dev
npm run clear:cache
npm run clear:xcode
```

## Notes

- This project is based on an older React Native codebase (RN 0.59), so compatibility with modern tooling may require careful environment setup.
- The app includes custom native and third-party libraries, so a clean install and matching tool versions are important.
- Some configuration values are in the app’s source rather than environment variables, so check the config files before building.

## License

This project does not currently include an explicit license file. If needed, add a license before publishing or distributing the app.
