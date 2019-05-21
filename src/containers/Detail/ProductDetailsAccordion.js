import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { LinearGradient } from '@expo';
import * as Animatable from 'react-native-animatable';
import { Icons } from '@common';
import { Icon, CustomIcon } from '@app/Omni';
import styles from './ProductDetail_Style';
import AccordionDescription from './AccordionItem/Description';
import AccordionShipping from './AccordionItem/Shipping';
import AccordionVendorInfo from './AccordionItem/VendorInfo';
import AccordionReview from './AccordionItem/Review';
import AccordionRelatedProducts from './AccordionItem/RelatedProducts';

export default class ProductDetailsAccordion extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedItems: [],
			activeSections: [],
		};
	}

	onSelectedItemsChange = selectedItems => {
		this.setState({ selectedItems });
	};

	renderAccordionHeader = (section, _, isActive) => {
		return (
			<Animatable.View
				duration={400}
				style={[
					styles.accordionHeader,
					isActive
						? styles.accordionHeaderActive
						: styles.accordionHeaderInActive,
				]}
				transition={['backgroundColor', 'borderRadius']}>
				<LinearGradient
					colors={[section.fromColor, section.toColor]}
					start={{ x: 0.0, y: 0.5 }}
					end={{ x: 1.0, y: 0.5 }}
					locations={[0.0, 1.0]}
					style={styles.accordionHeaderIcon}>
					<CustomIcon name={section.icon} size={20} color="#fff" />
				</LinearGradient>
				<Text style={styles.accordionHeaderText}>{section.title}</Text>
				<Text style={{ position: 'absolute', right: 15 }}>
					<Icon
						style={{
							color: '#BECDD0',
						}}
						name={
							isActive
								? Icons.MaterialCommunityIcons.DownChevron
								: Icons.MaterialCommunityIcons.ForwardChevron
						}
						size={20}
					/>
				</Text>
			</Animatable.View>
		);
	};

	renderAccordionContent = (section, _, isActive) => {
		return (
			<Animatable.View
				duration={400}
				style={[
					styles.accordionContent,
					isActive
						? styles.accordionHeaderActive
						: styles.accordionContentInActive,
				]}
				// transition="backgroundColor"
			>
				{section.content}
			</Animatable.View>
		);
	};

	updateAccordionSection = activeSections => {
		this.setState({
			activeSections,
		});
	};

	renderVariationHeader = () => {
		return (
			<Text>
				Select{' '}
				{this.props.attributes.map((attribute, index) => {
					if (index === this.props.attributes.length - 1) {
						return <Text key={index}>{attribute.name}</Text>;
					} else {
						return <Text key={index}>{attribute.name}, </Text>;
					}
				})}
			</Text>
		);
	};

	render() {
		const ACCORDION_CONTENT = [
			{
				title: 'Description',
				content: <AccordionDescription product={this.props.product} />,
				fromColor: '#00C6FB',
				toColor: '#005BEA',
				icon: 'paragraph-left',
			},
			{
				title: 'Shipping',
				content: <AccordionShipping />,
				fromColor: '#C444FB',
				toColor: '#5B56D7',
				icon: 'ship',
			},
			{
				title: 'Customer Review',
				content: (
					<AccordionReview
						product={this.props.product}
						onLogin={this.props.onLogin}
						navigation={this.props.navigation}
					/>
				),
				fromColor: '#FF9472',
				toColor: '#F2709C',
				icon: 'bubble2',
			},
			{
				title: 'Vendor Info',
				content: <AccordionVendorInfo store={this.props.product.store} />,
				fromColor: '#7ED500',
				toColor: '#00BF8D',
				icon: 'library',
			},
			{
				title: 'Related Products',
				content: (
					<AccordionRelatedProducts
						relatedProducts={this.props.relatedProducts}
						navigation={this.props.navigation}
					/>
				),
				fromColor: '#6EACFF',
				toColor: '#907CFF',
				icon: 'box',
			},
		];

		return (
			<Accordion
				activeSections={this.state.activeSections}
				sections={ACCORDION_CONTENT}
				touchableComponent={TouchableWithoutFeedback}
				renderHeader={this.renderAccordionHeader}
				renderContent={this.renderAccordionContent}
				duration={400}
				onChange={this.updateAccordionSection}
			/>
		);
	}
}
