import React from 'react';
import { View, Text } from 'react-native';
import striptags from 'striptags';
import { currencyFormatter } from '@app/Omni';
import { Rating } from '@components';
import ProductDetailsAccordion from './ProductDetailsAccordion';
import styles from './ProductDetail_Style';

export default function ProductDetails(props) {
	const { product, relatedProducts, onLogin, navigation } = props;
	const selectVariation = props.state;
	const productDescription = striptags(product.short_description);
	const isOnSale = selectVariation ? selectVariation.on_sale : product.on_sale;
	const productRegularPrice = currencyFormatter(
		selectVariation ? selectVariation.regular_price : product.regular_price
	);
	const productPrice = currencyFormatter(
		selectVariation ? selectVariation.price : product.price
	);

	return (
		<View style={styles.productDetailContainer}>
			<Text style={styles.productName}>{product.name}</Text>
			<Rating rating={Number(product.average_rating)} size={15} />
			<View style={styles.productMetaContainer}>
				<View style={styles.productPriceContainer}>
					{isOnSale && (
						<Text style={styles.sale_price}>{productRegularPrice}</Text>
					)}
					<Text style={styles.productPrice}>{productPrice}</Text>
				</View>
				{/* <View style={styles.productBadgeContainer}>
						<View style={styles.productBadge}>
							<Text style={styles.productBadgeNumber}>86</Text>
							<Text style={styles.productBadgeText}>Order</Text>
						</View>
						<View style={styles.productBadge}>
							<Text style={styles.productBadgeNumber}>130</Text>
							<Text style={styles.productBadgeText}>Wishlist</Text>
						</View>
					</View> */}
			</View>
			<Text style={styles.productDescription}>{productDescription}</Text>
			<ProductDetailsAccordion
				product={product}
				relatedProducts={relatedProducts}
				onLogin={onLogin}
				navigation={navigation}
			/>
		</View>
	);
}
