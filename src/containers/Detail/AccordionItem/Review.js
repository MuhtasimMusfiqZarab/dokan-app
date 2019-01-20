import React, {PureComponent} from "react";
import { View, Text, Platform } from "react-native";
import { connect } from "react-redux";
import { Navigate, NavigationActions } from "react-navigation";
import { Review, ReviewComment, Button, ButtonIndex } from "@components";
import { toast } from "@app/Omni";

class AccordionReview extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			showReviews: true,
		}
		
		this.props.fetchReviews(this.props.product.id);
		this.reviewCount = this.props.reviews.length
	}

	toggleReviewContentHandler = () => {
		const {userData, onLogin} = this.props;

		if (userData) {
			this.setState({
				showReviews: !this.state.showReviews,
			});
		} else {
			onLogin();
		}
	}

	seeAllReviews = () => {
		const navigateAction = NavigationActions.navigate({
			routeName: "ReviewsScreen",
			params: {
				productID: this.props.product.id
			},
		});
		this.props.navigation.dispatch(navigateAction);
	};

	onNewReview = (newReview = {}) => {
		this.newReview = newReview;
		this.reviewCount = this.reviewCount + 1;

		this.props.reviews.unshift(newReview);
		
		this.setState({
			showReviews: !this.state.showReviews
		});
	}

	render() {
		let reviewCount = this.props.reviews.length;
		const toggleBtnText = this.state.showReviews ? "Write a Review" : "See Reviews";
		reviewCount = this.state.showNewReview ? reviewCount + 1 : reviewCount;

		return (
			<View style={{alignItems: "center"}} keyboardShouldPersistTaps="always">
				<View style={{
					width: "100%",
					flexDirection: "row",
					justifyContent: 'space-between',
					alignItems: "center",
					marginBottom: 20
				}}>
					<Text style={{fontSize: 20, color: "#79828F"}}>
						{reviewCount} Reviews
					</Text>
					<Button
						type="gradientBtn"
						text={toggleBtnText}
						onPress={() => this.toggleReviewContentHandler()}
					/>
				</View>
				{
					this.state.showReviews &&
					// !this.state.showNewReview &&
					reviewCount !== 0 && (
						this.props.reviews.map((item, index) => {
							if(index < 2) {
								return (
									<ReviewComment
										key={`review-${index}`}
										review={item} />
								)
							}
						})
					)
				}
				{
					this.state.showReviews && reviewCount !== 0 && (
						<ButtonIndex
							onPress={() => this.seeAllReviews()}
							type="text"
							text="See all Reviews"
							textColor="#79828F"
							containerColor="#fff"
							containerStyle={
								{
									width: '70%',
									...Platform.select({
										ios: {
											shadowColor: '#000',
											shadowOpacity: 0.1,
											shadowOffset: {width: 1, height: 1},
										},
										android: {
											elevation: 3
										}
									}),
								}
							} 
						/>
					)
				}
				{
					!this.state.showReviews &&
						<Review post={this.props.product} onNewReview={this.onNewReview} />
				}
				{/* {
					this.state.showNewReview && (
						<View style={{width: "100%", alignItems: "center"}}>
							<ReviewComment review={this.newReview}/>
							<ButtonIndex
								onPress={() => this.seeAllReviews()}
								type="text"
								text="See all Reviews"
								textColor="#79828F"
								containerColor="#fff"
								containerStyle={
									{
										width: '70%',
										...Platform.select({
											ios: {
												shadowColor: '#000',
												shadowOpacity: 0.1,
												shadowOffset: {width: 1, height: 1},
											},
											android: {
												elevation: 3
											}
										}),
									}
								} 
							/>
						</View>
					)
				} */}
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		netInfo: state.netInfo,
		reviews: state.products.reviews,
		isFetching: state.products.isFetching,
		message: state.products.message,
		reviews: state.products.reviews,
		userData: state.user.user
	};
};

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { netInfo } = stateProps;
	const { dispatch } = dispatchProps;
	const { actions } = require("@redux/ProductRedux");

	return {
		...ownProps,
		...stateProps,
		fetchReviews: (productId) => {
			if (!netInfo.isConnected) return toast(Languages.NoConnection);
			actions.fetchReviewsByProductId(dispatch, productId);
		},
	};
}

export default connect(
	mapStateToProps,
	undefined,
	mergeProps
)(AccordionReview);