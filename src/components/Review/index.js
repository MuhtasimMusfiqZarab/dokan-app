/** @format */

import React, { PureComponent } from "react";
import { View, TouchableOpacity, TextInput, Text } from "react-native";
import { Languages, Color, Events } from "@common";
import { Button, Spinkit } from "@components";
import Rating from "react-native-star-rating";
import CustomAPI from "@services/CustomAPI";
import Icon from "@expo/vector-icons/SimpleLineIcons";
import { toast } from "@app/Omni";
import { connect } from "react-redux";
import css from "./styles";
import WooWorker from "@services/WooCommerce/WooWorker";

class Review extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			txtComment: "",
			//   addComment: false,
			starCount: 0,
			//   statusRate: "Very Good",
			isLoading: false
		};
	}

	onStarRatingPress(rating) {
		this.setState({
			starCount: rating,
		});
	}

	submitComment = async () => {
		this.setState({
			isLoading: true
		})
		const { cookie, userData, post } = this.props;
		const self = this;
		if (this.state.txtComment == "") {
			return toast(Languages.errInputComment);
		}
		if (this.state.starCount == 0) {
			return toast(Languages.errRatingComment);
		}
		// console.log(post)
		// const commentData = {
		// 	post_id: post.id,
		// 	content: this.state.txtComment,
		// 	cookie,
		// 	comment_status: "hold",
		// 	meta: JSON.stringify({
		// 		rating: this.state.starCount,
		// 		verified: 0,
		// 	}),
		// };
		
		// CustomAPI.createComment(commentData).then((data) => {
		// 	console.log(data);
		// 	if (data.status == "ok") {
		// 		self.setState({
		// 			addComment: true,
		// 			txtComment: "",
		// 		});
		// 		toast(Languages.thanksForReview);
		// 		this.props.onNewReview();
		// 		Events.closeModalReview();
		// 	}
		// 	this.props.onNewReview();
		// })
		// .catch((error) => console.log(error));

		const reviewer = `${userData.user.first_name} ${userData.user.last_name}`
		const reviewer_email = userData.user.email
		const commentData = {
			product_id: post.id,
			review: this.state.txtComment,
			reviewer: reviewer,
			reviewer_email: reviewer_email,
			rating: this.state.starCount
		};

		const response = await WooWorker.createProductReview(commentData);

		if (response.id) {
			this.setState({
				isLoading: false
			})
			this.props.onNewReview(response);
		}

	};

	renderCommentInput = () => {
		return (
			<View style={{ flex: 1 }}>
				<View style={css.rowHead}>
					<Text style={css.headText}>{Languages.yourcomment}</Text>
				</View>
				<View style={css.inputCommentWrap}>
					<TextInput
						style={css.inputCommentText}
						underlineColorAndroid="transparent"
						autoCorrect={false}
						multiline
						value={this.state.txtComment}
						onChangeText={(text) => this.setState({ txtComment: text })}
						placeholder={Languages.placeComment}
						onSubmitEditing={this.submitComment}
					/>
					<TouchableOpacity onPress={this.submitComment} style={css.sendView}>
						<Icon
							name="cursor"
							size={16}
							color="white"
							style={css.sendButton}
						/>
						<Text style={css.sendText}>{Languages.send}</Text>
					</TouchableOpacity>
					{/* <Button
						type="gradientBtn"
						text={Languages.send}
						onPress={() => this.toggleReviewContentHandler()}
					/> */}
				</View>
			</View>
		);
	};

	renderStatusRate = (value) => {
		switch (value) {
			case 1:
				return "Terrible";
			case 2:
				return "Poor";
			case 3:
				return "Average";
			case 4:
				return "Very Good";
			case 5:
				return "Exceptional";
			default:
				return "Average";
		}
	};

	render() {
		return (
			<View style={[
				css.wrapComment,
				this.state.isLoading && {
					justifyContent: "center",
					alignItems: "center"
				}
			]}>
				{
					!this.state.isLoading && <Text style={css.headCommentText}>{Languages.comment}</Text>
				}
				{
					!this.state.isLoading && (
						<View style={css.fullWidth}>
							<View style={css.wrapRating}>
								<Rating
									disabled={false}
									maxStars={5}
									starSize={26}
									emptyStar="star-o"
									fullStar="star"
									// halfStar={'star-half-o'}
									// halfStarEnabled
									rating={this.state.starCount}
									starColor={Color.starRating}
									fullStarColor={Color.starRating}
									halfStarColor={Color.starRating}
									emptyStarColor="#ccc"
									selectedStar={(rating) => this.onStarRatingPress(rating)}
								/>
							</View>
							<View style={css.besideStar}>
								<View style={css.statusRate}>
									<Text style={css.textStatusRate}>
										{this.renderStatusRate(this.state.starCount)}
									</Text>
								</View>
							</View>
						</View>
					)
				}
				{
					!this.state.isLoading && this.renderCommentInput()
				}
				{
					this.state.isLoading && <Spinkit size="large" />
				}
				
				{/* {this.renderCommentInput()} */}
				{/* <DropdownAlert ref={ref => (this.dropdown = ref)} /> */}
			</View>
		);
	}
}

const mapStateToProps = ({ user }) => {
	return {
		cookie: user.token,
		userData: user,
	};
};
export default connect(mapStateToProps)(Review);
