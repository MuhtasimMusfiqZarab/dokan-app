/** @format */

import React, { Component } from 'react';
import wp from '@services/PostAPI';
import { WebView } from '@components';
import { Text } from 'react-native';
import _ from 'lodash';

export default class CustomPage extends Component {
	constructor(props) {
		super(props);
		this.state = { html: '' };
		this.fetchPage = this.fetchPage.bind(this);
	}

	componentDidMount() {
		this.fetchPage(this.props.id);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.fetchPage(nextProps.id);
	}

	fetchPage(id) {
		wp.pages()
			.id(id)
			.get((err, data) => {
				console.log(data);
				if (data) {
					let content = data.content.rendered;
					var matches = content.match(/style=\"(.*?)\"/gim);

					if (matches) {
						matches.forEach(style => {
							const dashedProps = style.match(/[a-z]+-[a-z]+\:/g);
							let replacedStyle = style;
							if (dashedProps) {
								dashedProps.forEach(prop => {
									const camelizedProps = _.camelCase(prop);
									replacedStyle = replacedStyle.replace(
										prop,
										camelizedProps + ':'
									);
								});
							}

							content = content.replace(style, replacedStyle);
						});
					}

					this.setState({
						html:
							typeof data.content.rendered !== 'undefined'
								? content
								: 'Content is updating',
					});
				}
			});
	}

	render() {
		return <WebView html={this.state.html} />;
		// return <Text>Hello</Text>;
	}
}
