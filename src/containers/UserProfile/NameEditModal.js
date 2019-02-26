import React, { Component, Fragment } from 'react';
import { Text, View } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import { ModalBox, TextInput, Button } from '@components';
import styles from './styles';
import DokanWorker from '@services/Dokan/DokanWorker';

export class NameEditModal extends Component {
	state = {
		isLoading: false,
	};

	updateUsername = async values => {
		this.setState({ isLoading: true });

		const data = {
			first_name: values.firstName,
			last_name: values.lastName,
		};

		const user = await DokanWorker.updateCustomerProfile(
			data,
			this.props.token
		);
		this.props.updateUser(user);

		this.setState({ isLoading: false });
		this.props.closeEditModal();
	};

	render() {
		const { user } = this.props;

		return (
			<ModalBox ref={this.props.refs}>
				<Formik
					initialValues={{
						firstName: user.first_name,
						lastName: user.last_name,
					}}
					onSubmit={values => this.updateUsername(values)}
					validationSchema={yup.object().shape({
						firstName: yup.string().required(),
						lastName: yup.string().required(),
					})}>
					{({
						values,
						handleChange,
						errors,
						setFieldTouched,
						touched,
						isValid,
						handleSubmit,
					}) => (
						<Fragment>
							<TextInput
								value={values.firstName}
								onChangeText={handleChange('firstName')}
								onBlur={() => setFieldTouched('firstName')}
								placeholder="First Name"
								inputStyle={styles.editTextInputStyle}
							/>
							{touched.firstName && errors.firstName && (
								<Text style={{ fontSize: 10, color: 'red', marginBottom: 15 }}>
									{errors.firstName}
								</Text>
							)}
							<TextInput
								value={values.lastName}
								onChangeText={handleChange('lastName')}
								placeholder="Last Name"
								onBlur={() => setFieldTouched('lastName')}
								inputStyle={styles.editTextInputStyle}
							/>
							{touched.lastName && errors.lastName && (
								<Text style={{ fontSize: 10, color: 'red', marginBottom: 15 }}>
									{errors.lastName}
								</Text>
							)}

							<Button
								type="text"
								text="Save"
								style={{
									width: '90%',
									height: 40,
									marginTop: 15,
									backgroundColor: '#E74C3C',
								}}
								disabled={!isValid}
								onPress={handleSubmit}
								isLoading={this.state.isLoading}
							/>
						</Fragment>
					)}
				</Formik>
			</ModalBox>
		);
	}
}

export default NameEditModal;
