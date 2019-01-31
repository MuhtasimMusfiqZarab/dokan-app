/** @format */

import React from 'react';
import PropTypes from 'prop-types';
// import { Image } from 'react-native'
import FastImage from 'react-native-fast-image';

const ImageCache = ({ style, uri }) => {
	return (
		<FastImage
			style={style}
			source={{ uri, priority: FastImage.priority.normal }}
			// resizeMode={FastImage.resizeMode.contain}
		/>
	);
};

ImageCache.propTypes = {
	style: PropTypes.any,
	uri: PropTypes.any,
};

export default ImageCache;
