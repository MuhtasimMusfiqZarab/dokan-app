import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { ReviewComment } from '@components';

class Reviews extends Component {
	componentDidMount() {
		this.props.reviews = [];
		if (this.props.productID) {
			this.props.fetchReviews(this.props.productID);
		}
		if (this.props.vendorID) {
			this.props.fetchVendorReviews(this.props.vendorID);
		}
	}

	_renderReviews = data => {
		if (this.props.productID) {
			return <ReviewComment review={data.item} />;
		} else {
			return <ReviewComment review={data.item} vendorReview />;
		}
	};

	render() {
		const { reviews, vendorReviews } = this.props;

		if (this.props.productID) {
			return (
				<View
					style={{
						flex: 1,
						backgroundColor: '#fff',
						justifyContent: 'center',
						padding: 15,
					}}>
					<FlatList
						data={reviews}
						keyExtractor={(item, index) => `r_${index}`}
						renderItem={this._renderReviews}
					/>
				</View>
			);
		} else {
			return (
				<View
					style={{
						flex: 1,
						backgroundColor: '#fff',
						justifyContent: 'center',
						padding: 15,
					}}>
					<FlatList
						data={vendorReviews}
						keyExtractor={(item, index) => `r_${index}`}
						renderItem={this._renderReviews}
					/>
				</View>
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		netInfo: state.netInfo,
		reviews: state.products.reviews,
		isFetching: state.products.isFetching,
		message: state.products.message,
		reviews: state.products.reviews,
		userData: state.user.user,
		vendorReviews: state.vendors.vendorReviews,
	};
};

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { netInfo } = stateProps;
	const { dispatch } = dispatchProps;
	const { actions } = require('@redux/ProductRedux');
	const VendorRedux = require('@redux/VendorRedux');

	return {
		...ownProps,
		...stateProps,
		fetchReviews: productId => {
			if (!netInfo.isConnected) return toast(Languages.NoConnection);
			actions.fetchReviewsByProductId(dispatch, productId);
		},
		fetchVendorReviews: vendorId => {
			if (!netInfo.isConnected) return toast(Languages.NoConnection);
			VendorRedux.actions.fetchReviewsByVendorId(dispatch, vendorId);
		},
	};
}

export default connect(
	mapStateToProps,
	undefined,
	mergeProps
)(Reviews);
