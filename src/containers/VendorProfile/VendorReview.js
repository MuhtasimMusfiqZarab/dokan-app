import React, { PureComponent } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Config } from '@common';
import { Review, ReviewComment, Button, ButtonIndex } from '@components';
import { toast } from '@app/Omni';

class VendorReview extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			showReviews: true,
		};

		// this.props.fetchReviews(this.props.vendorID);
		// this.reviewCount = this.props.reviews.length;
	}

	// shouldComponentUpdate(nextProps) {
	// 	return this.props.vendorID !== nextProps.vendorID;
	// }

	componentDidMount() {
		this.props.fetchReviews(this.props.vendorID);
		this.reviewCount = this.props.reviews.length;
	}

	toggleReviewContentHandler = () => {
		const { userData, onLogin } = this.props;

		if (userData) {
			this.setState({
				showReviews: !this.state.showReviews,
			});
		} else {
			onLogin();
		}
	};

	seeAllReviews = () => {
		const navigateAction = NavigationActions.navigate({
			routeName: 'ReviewsScreen',
			params: {
				vendorID: this.props.vendorID,
			},
		});
		this.props.navigation.dispatch(navigateAction);
	};

	onNewReview = (newReview = {}) => {
		this.newReview = newReview;
		this.reviewCount = this.reviewCount + 1;

		this.props.reviews.unshift(newReview);

		this.setState({
			showReviews: !this.state.showReviews,
		});
	};

	render() {
		let reviewCount = this.props.reviews.length;
		const toggleBtnText = this.state.showReviews
			? 'Write a Review'
			: 'See Reviews';
		reviewCount = this.state.showNewReview ? reviewCount + 1 : reviewCount;

		return (
			<View style={{ alignItems: 'center' }} keyboardShouldPersistTaps="always">
				<View
					style={{
						width: '100%',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginBottom: 20,
					}}>
					<Text style={{ fontSize: 20, color: '#79828F' }}>
						{reviewCount} Reviews
					</Text>
					{Config.dokanModules['Store Reviews'] && (
						<Button
							type="gradientBtn"
							text={toggleBtnText}
							onPress={() => this.toggleReviewContentHandler()}
						/>
					)}
				</View>
				{this.state.showReviews &&
					// !this.state.showNewReview &&
					reviewCount !== 0 &&
					this.props.reviews.map((item, index) => {
						if (index < 2) {
							return (
								<ReviewComment
									key={`review-${index}`}
									review={item}
									vendorReview
								/>
							);
						}
					})}
				{this.state.showReviews && reviewCount !== 0 && (
					<ButtonIndex
						onPress={() => this.seeAllReviews()}
						type="text"
						text="See all Reviews"
						textColor="#79828F"
						containerColor="#fff"
						containerStyle={{
							width: '70%',
							...Platform.select({
								ios: {
									shadowColor: '#000',
									shadowOpacity: 0.1,
									shadowOffset: { width: 1, height: 1 },
								},
								android: {
									elevation: 1,
								},
							}),
						}}
					/>
				)}
				{!this.state.showReviews && (
					<Review
						post={this.props.product}
						onNewReview={this.onNewReview}
						vendorReview={true}
						vendorID={this.props.vendorID}
					/>
				)}
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
		);
	}
}

const mapStateToProps = state => {
	return {
		netInfo: state.netInfo,
		reviews: state.vendors.vendorReviews,
		isFetching: state.vendors.isFetching,
		// message: state.products.message,
		// reviews: state.products.reviews,
		userData: state.user.user,
	};
};

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { netInfo } = stateProps;
	const { dispatch } = dispatchProps;
	const { actions } = require('@redux/VendorRedux');

	return {
		...ownProps,
		...stateProps,
		fetchReviews: vendorId => {
			if (!netInfo.isConnected) return toast(Languages.NoConnection);
			actions.fetchReviewsByVendorId(dispatch, vendorId);
		},
	};
}

export default connect(
	mapStateToProps,
	undefined,
	mergeProps
)(VendorReview);
