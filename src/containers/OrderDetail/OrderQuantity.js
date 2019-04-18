import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { currencyFormatter } from '@app/Omni';
import css from './styles';

export default function OrderQuantity(props) {
	return (
		<View style={css.orderDetailsBlock}>
			<View style={styles.orderTableRow}>
				<View style={styles.orderTableColumn}>
					<Text style={[css.title, { color: '#000' }]}>Items</Text>
				</View>
				<View style={styles.orderTableColumn}>
					<Text style={[css.title, { color: '#000' }]}>Cost</Text>
				</View>
				<View style={styles.orderTableColumn}>
					<Text style={[css.title, { color: '#000' }]}>Total</Text>
				</View>
			</View>
			{props.items.map((item, index) => {
				return (
					<View
						style={[styles.orderTableRow, { marginBottom: 10 }]}
						key={`item-${index}`}>
						<View style={styles.orderTableColumn}>
							<Text style={[css.title, { color: 'red', marginBottom: 5 }]}>
								{item.name}
							</Text>
							<Text style={css.standardTextBlack}>
								Qty: <Text style={css.standardTextGray}>{item.quantity}</Text>
							</Text>
						</View>
						<View style={[styles.orderTableColumn, { paddingLeft: 10 }]}>
							<Text style={css.standardTextGray}>
								{currencyFormatter(item.price)}
							</Text>
						</View>
						<View style={[styles.orderTableColumn, { paddingLeft: 10 }]}>
							<Text style={css.standardTextGray}>
								{currencyFormatter(item.total)}
							</Text>
						</View>
					</View>
				);
			})}

			<View style={css.separator} />

			<View style={styles.orderTableRow}>
				{/* <View style={styles.orderTableColumn} /> */}
				<View style={styles.orderTableColumnTwo}>
					<Text style={[css.standardTextGray, { marginBottom: 5 }]}>
						Discount Total
					</Text>
					<Text style={[css.standardTextGray, { marginBottom: 5 }]}>
						Shipping Total
					</Text>
					<Text style={[css.standardTextGray, { marginBottom: 5 }]}>
						Order Total
					</Text>
				</View>
				<View style={styles.orderTableColumn}>
					<Text style={[css.standardTextGray, { marginBottom: 5 }]}>
						{currencyFormatter(props.discountTotal)}
					</Text>
					<Text style={[css.standardTextGray, { marginBottom: 5 }]}>
						{currencyFormatter(props.discountTotal)}
					</Text>
					<Text style={[css.standardTextGray, { marginBottom: 5 }]}>
						{currencyFormatter(props.total)}
					</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		backgroundColor: '#fff',
		borderRadius: 5,
		paddingVertical: 15,
		marginBottom: 15,
	},
	orderTableRow: {
		flexDirection: 'row',
		paddingHorizontal: 10,
		marginBottom: 5,
	},
	orderTableColumn: {
		flex: 1,
		paddingHorizontal: 10,
	},
	orderTableColumnTwo: {
		flex: 2,
		paddingHorizontal: 10,
	},
});
