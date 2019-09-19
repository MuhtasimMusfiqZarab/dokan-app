/** @format */

import { Constants } from '@common';
import reducers from '@redux';
import Reactotron from 'reactotron-react-native';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
// import { connectConsoleToReactotron } from '@app/Omni';
import './../../ReactotronConfig';

const middleware = [
	thunk,
	// more middleware
];

// const store = createStore(reducers, {}, applyMiddleware(...middleware));

const configureStore = () => {
	let store = null;
	if (__DEV__) {
		if (Constants.useReactotron) {
			store = createStore(
				reducers,
				{},
				compose(
					applyMiddleware(...middleware),
					Reactotron.createEnhancer()
				)
			);
		} else {
			const composeEnhancers =
				window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
			store = composeEnhancers(applyMiddleware(...middleware))(createStore)(
				reducers
			);

			if (module.hot) {
				// Enable Webpack hot module replacement for reducers
				module.hot.accept(reducers, () => {
					const nextRootReducer = reducers;
					store.replaceReducer(nextRootReducer);
				});
			}

			// For network request inspection in react-native-debugger
			global.XMLHttpRequest = global.originalXMLHttpRequest
				? global.originalXMLHttpRequest
				: global.XMLHttpRequest;
			global.FormData = global.originalFormData
				? global.originalFormData
				: global.FormData;
			global.Blob = global.originalBlob ? global.originalBlob : global.Blob;
			global.FileReader = global.originalFileReader
				? global.originalFileReader
				: global.FileReader;
		}
	} else {
		store = compose(applyMiddleware(...middleware))(createStore)(reducers);
	}
	return store;
};

export default configureStore();
