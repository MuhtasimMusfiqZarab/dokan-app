/** @format */

import React from 'react';
import PropTypes from 'prop-types';
// import { Image } from 'react-native'
import FastImage from 'react-native-fast-image';

const ImageCache = ({ style, uri, resizeMode }) => {
	let setResizeMode = null;
	if (resizeMode === 'contain') {
		setResizeMode = FastImage.resizeMode.contain;
	} else if (resizeMode === 'cover') {
		setResizeMode = FastImage.resizeMode.cover;
	} else if (resizeMode === 'stretch') {
		setResizeMode = FastImage.resizeMode.stretch;
	} else {
		setResizeMode = FastImage.resizeMode.center;
	}

	return (
		<FastImage
			style={style}
			source={{ uri, priority: FastImage.priority.normal }}
			resizeMode={resizeMode ? setResizeMode : FastImage.resizeMode.cover}
		/>
	);
};

ImageCache.propTypes = {
	style: PropTypes.any,
	uri: PropTypes.any,
	resizeMode: PropTypes.string,
};

export default ImageCache;
