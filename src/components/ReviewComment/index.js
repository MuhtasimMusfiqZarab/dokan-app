/**
 * @format 
 * 
 * Created by weDevs
 */
import React, { PureComponent } from "react";
import {
	View,
	TouchableOpacity,
	TextInput,
	Text,
	Image
} from "react-native";
import { Languages, Color, Events, Images } from "@common";
import styles from "./styles";

const ReviewComment = (props) => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.headerImage}>
					<Image
						source={Images.defaultAvatar}
						style={{width: "100%", height: "100%"}}
						resizeMode="contain"
					/>
				</View>
				<View style={styles.headerText}>
					<Text style={{fontWeight: "bold"}}>
						{props.item.customer_name}
					</Text>
					<Text style={{color: Color.textBlue}}>
						{props.item.title}
					</Text>
				</View>
			</View>
			<View style={styles.content}>
				<TextInput
					multiline={true}
					editable={false}
					underlineColorAndroid="transparent"
					style={
						{ color: Color.reviewTextColor}
					}>
					{props.item.comment}
				</TextInput>
			</View>
			<View style={styles.footer}>
				<Text style={{color: Color.reviewTextColor}}>
					{props.item.date}
				</Text>
			</View>
  	</View>
	)
}

export default ReviewComment;