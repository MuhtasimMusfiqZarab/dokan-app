import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import { connect } from "react-redux";
import { ReviewComment } from "@components";

class Reviews extends Component {
	componentDidMount() {
		this.props.reviews = [];
		this.props.fetchReviews(this.props.productID)
	}

	_renderReviews = (data) => ( <ReviewComment review={data.item} /> );

	render() {
		const { reviews } = this.props;

		return (
			<View style={{
				flex: 1,
				backgroundColor: "#fff",
				justifyContent: "center",
				padding: 15
			}}>
				<FlatList
					data={reviews}
					keyExtractor={(item, index) => `r_${index}`}
					renderItem={this._renderReviews}
				/>
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
)(Reviews);
