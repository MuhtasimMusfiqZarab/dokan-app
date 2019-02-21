/**
 * @format
 */

import React from 'react';
import { View, TextInput, Text, Image } from 'react-native';
import HTML from 'react-native-render-html';
import moment from 'moment';
import { Color, Images } from '@common';
import { Rating } from '@components';
import styles from './styles';

const dateFormat = date => {
	return moment.parseZone(date).format('MMMM DD, YYYY, HH:mm');
};

const ReviewComment = props => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.headerImage}>
					<Image
						source={Images.defaultAvatar}
						style={{ width: '100%', height: '100%' }}
						resizeMode="contain"
					/>
				</View>
				<View style={styles.headerText}>
					<Text style={{ fontWeight: 'bold', color: '#000' }}>
						{props.review.name || props.review.reviewer}
					</Text>
					{/* <Text style={{color: Color.textBlue}}>
						{props.item.title}
					</Text> */}
					<Rating rating={props.review.rating} size={15} />
				</View>
			</View>
			<View style={styles.content}>
				{props.review.name && (
					<TextInput
						multiline={true}
						editable={false}
						underlineColorAndroid="transparent"
						style={{ color: Color.reviewTextColor }}>
						{props.review.review}
					</TextInput>
				)}
				{props.review.reviewer && (
					<HTML
						html={props.review.review}
						tagsStyles={{
							p: { color: Color.reviewTextColor },
						}}
					/>
				)}
			</View>
			<View style={styles.footer}>
				<Text style={{ color: Color.reviewTextColor }}>
					{dateFormat(props.review.date_created)}
				</Text>
			</View>
		</View>
	);
};

export default ReviewComment;
