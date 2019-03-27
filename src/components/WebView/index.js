/** @format */

import React, { PureComponent } from 'react';
import { View, Image, Dimensions } from 'react-native';
import HTML from 'react-native-render-html';
import { Tools, Constants } from '@common';
const { width } = Dimensions.get('window');

export default class Index extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			fontSize: Constants.fontText.size,
		};

		Tools.getFontSizePostDetail().then(data => {
			this.setState({ fontSize: data });
		});
	}

	render() {
		const htmlContent = this.props.html;
		const tagsStyles = {
			h1: { color: '#000' },
			h2: { color: '#000' },
			h3: { color: '#000' },
			h4: { color: '#000' },
			h5: { color: '#000' },
			h6: { color: '#000' },
			p: { margin: 0, padding: 0, color: '#000' },
			li: { color: '#333' },
		};

		return (
			<View style={{ padding: 10 }}>
				<HTML
					html={htmlContent + '<div style="width: ' + (width - 40) + '"></div>'}
					tagsStyles={tagsStyles}
					renderers={{
						img: htmlAttribs => {
							const { src, width, height } = htmlAttribs;
							if (!src) {
								return false;
							}
							const newWidth = Dimensions.get('window').width - 20;
							const newHeight = (height * newWidth) / width;
							return (
								<Image
									source={{ uri: src }}
									style={{
										width: newWidth,
										height: newHeight,
										resizeMode: 'contain',
									}}
								/>
							);
						},
					}}
				/>
			</View>
		);
	}
}
