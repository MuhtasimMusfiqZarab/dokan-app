/** @format */

import { toast } from "@app/Omni";

const stripe_url = "https://api.stripe.com/v1/";
const secret_key = "sk_test_9JqtOPaWJEGwCupk5W9uM0EO";

const StripeAPI = {
	createCardToken: async (cardNumber, expMonth, expYear, cvc) => {
		const cardDetails = {
			"card[number]": cardNumber,
			"card[exp_month]": expMonth,
			"card[exp_year]": expYear,
			"card[cvc]": cvc
		};
	
		let formBody = [];
		for (let property in cardDetails) {
			let encodedKey = encodeURIComponent(property);
			let encodedValue = encodeURIComponent(cardDetails[property]);
			formBody.push(`${encodedKey}=${encodedValue}`);
		}
		formBody = formBody.join("&");

		return await fetch(stripe_url + 'tokens', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': 'Bearer ' + secret_key
			},
			body: formBody
		})
		.then((response) => response.json())
		.then((json) => {
			if (json.error) {
				return json.error;
			} else {
				return json.id
			}
		})
		.catch( (error) => error );
	},
	processPayment: async (token, price, currency) => {
		const paymentDetails = {
			amount: price * 100,
			currency: currency,
			source: token,
		};

		let formBody = [];
		for (let property in paymentDetails) {
			let encodedKey = encodeURIComponent(property);
			let encodedValue = encodeURIComponent(paymentDetails[property]);
			formBody.push(`${encodedKey}=${encodedValue}`);
		}
		formBody = formBody.join("&");

		return await fetch(stripe_url + 'charges', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': 'Bearer ' + secret_key
			},
			body: formBody
		})
		.then((response) => response.json())
		.then((json) => {
			if (json.error) {
				return json.error.message
			} else {
				return json
			}
		})
		.catch( (error) => error );
	},
};
export default StripeAPI;
