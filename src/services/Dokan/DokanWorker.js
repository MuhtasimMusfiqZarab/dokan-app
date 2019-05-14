/** @format */

import { Config } from '@common';
import { warn, toast } from '@app/Omni';
import OAuth from 'oauth-1.0a';
import CryptoJS from 'crypto-js';
import FormData from 'form-data';

const DokanWorker = {
	getFeaturedProducts: async (page = 1, per_page = 10) => {
		return await fetch(
			`${
				Config.WooCommerce.url
			}/wp-json/dokan/v1/products/featured?page=${page}&per_page=${per_page}`
		)
			.then(response => response.json())
			.then(json => {
				return json;
			})
			.catch(error => warn(error));
	},
	getTopRatedProducts: async (page = 1, per_page = 10) => {
		return await fetch(
			`${
				Config.WooCommerce.url
			}/wp-json/dokan/v1/products/top_rated?page=${page}&per_page=${per_page}`
		)
			.then(response => response.json())
			.then(json => {
				return json;
			})
			.catch(error => warn(error));
	},
	getBestSellingProducts: async (page = 1, per_page = 10) => {
		return await fetch(
			`${
				Config.WooCommerce.url
			}/wp-json/dokan/v1/products/best_selling?page=${page}&per_page=${per_page}`
		)
			.then(response => response.json())
			.then(json => {
				return json;
			})
			.catch(error => warn(error));
	},
	getLatestProducts: async (page = 1, per_page = 10) => {
		return await fetch(
			`${
				Config.WooCommerce.url
			}/wp-json/dokan/v1/products/latest?page=${page}&per_page=${per_page}`
		)
			.then(response => response.json())
			.then(json => {
				return json;
			})
			.catch(error => warn(error));
	},
	getRelatedProducts: async productID => {
		return await fetch(
			`${Config.WooCommerce.url}/wp-json/dokan/v1/products/${productID}/related`
		)
			.then(response => response.json())
			.then(json => {
				if (json.length != 0) {
					return json;
				}
			})
			.catch(error => warn(error));
	},
	getVendors: async (page, per_page) => {
		const url = `${
			Config.WooCommerce.url
		}/wp-json/dokan/v1/stores?page=${page}&per_page=${per_page}`;

		return await fetch(url)
			.then(response => response.json())
			.then(json => {
				return json;
			})
			.catch(error => warn(error));
	},
	getFeaturedVendors: async () => {
		return await fetch(
			`${Config.WooCommerce.url}/wp-json/dokan/v1/stores?featured=yes`
		)
			.then(response => response.json())
			.then(json => {
				if (json.length != 0) {
					return json;
				}
			})
			.catch(error => warn(error));
	},
	getVendorProducts: async vendorID => {
		return await fetch(
			`${Config.WooCommerce.url}/wp-json/dokan/v1/stores/${vendorID}/products`
		)
			.then(response => response.json())
			.then(json => {
				if (json.length != 0) {
					return json;
				}
			})
			.catch(error => warn(error));
	},
	getVendorReviews: async vendorID => {
		return await fetch(
			`${Config.WooCommerce.url}/wp-json/dokan/v1/stores/${vendorID}/reviews`
		)
			.then(response => response.json())
			.then(json => {
				// if (json.length != 0) {
				// 	return json;
				// }
				console.log(json);
				return json;
			})
			.catch(error => warn(error));
	},
	postVendorReview: async (vendorID, review, token) => {
		return await fetch(
			`${Config.WooCommerce.url}/wp-json/dokan/v1/stores/${vendorID}/reviews`,
			{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(review),
			}
		)
			.then(response => response.json())
			.then(json => {
				// if (json.length != 0) {
				// 	return json;
				// }
				// console.log(json);
				return json;
			})
			.catch(error => warn(error));
	},
	getSingleVendor: async vendorID => {
		return await fetch(
			`${Config.WooCommerce.url}/wp-json/dokan/v1/stores/${vendorID}/`
		)
			.then(response => response.json())
			.then(json => {
				return json;
			})
			.catch(error => warn(error));
	},
	getCustomerProfile: async token => {
		return await fetch(
			`${Config.WooCommerce.url}/wp-json/dokan/v1/customers/me/`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			}
		)
			.then(response => response.json())
			.then(json => {
				return json;
			})
			.catch(error => warn(error));
	},
	updateCustomerProfile: async (data = {}, token) => {
		return await fetch(
			`${Config.WooCommerce.url}/wp-json/dokan/v1/customers/me/`,
			{
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			}
		)
			.then(response => response.json())
			.then(json => {
				return json;
			})
			.catch(error => warn(error));
	},
	getAppBanner: async () => {
		return await fetch(
			`${Config.WooCommerce.url}/wp-json/dokan/v1/dokan-app/slides/`
		)
			.then(response => response.json())
			.then(json => {
				if (json.length != 0) {
					return json;
				}
			})
			.catch(error => warn(error));
	},
	getAppSettings: async () => {
		return await fetch(
			`${Config.WooCommerce.url}/wp-json/dokan/v1/dokan-app/settings/`
		)
			.then(response => response.json())
			.then(json => {
				return json;
			})
			.catch(error => warn(error));
	},
	getPluginModuleStatus: async () => {
		return await fetch(`${Config.WooCommerce.url}/wp-json/dokan/v1/modules`)
			.then(response => response.json())
			.then(json => {
				return json;
			})
			.catch(error => warn(error));
	},
	getWooCommerceApiVersion: async () => {
		return await fetch(`${Config.WooCommerce.url}/wp-json`)
			.then(response => response.json())
			.then(json => {
				const namespaces = json.namespaces;
				const wooApiVersion = namespaces.includes('wc/v3') ? 'wc/v3' : 'wc/v2';

				return wooApiVersion;
			})
			.catch(err => warn(err));
	},
	fetchAllCartItems: async token => {
		try {
			const response = await fetch(
				`${Config.WooCommerce.url}/wp-json/dokan/v1/cart/items`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			);
			const totalPriceHeader = JSON.parse(
				response.headers.get('X-Dokan-Cart-Totals')
			);
			const cartSubTotal = totalPriceHeader.subtotal;
			const shippingTotal = totalPriceHeader.shipping_total;
			const discount = totalPriceHeader.discount_total;
			const cartTotalPrice = totalPriceHeader.total;
			const cartTotalItems = JSON.parse(
				response.headers.get('X-Dokan-Cart-TotalItems')
			);
			const json = await response.json();

			if (json.code === undefined) {
				return {
					cartProduct: json,
					cartSubTotal,
					cartTotalPrice,
					shippingTotal,
					discount,
					cartTotalItems,
				};
			} else {
				console.log(json.message);
			}
		} catch (error) {
			return error;
		}
	},
	addCartItem: async (productID, variationID, qty = 1, token) => {
		let data;
		if (productID !== null) {
			data = {
				product_id: productID,
				quantity: qty,
			};
		} else {
			data = {
				variation_id: variationID,
				quantity: qty,
			};
		}

		try {
			const response = await fetch(
				`${Config.WooCommerce.url}/wp-json/dokan/v1/cart/items`,
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}
			);
			const totalPriceHeader = JSON.parse(
				response.headers.get('x-dokan-cart-totals')
			);
			const cartTotalPrice = totalPriceHeader.total;
			const cartTotalItems = JSON.parse(
				response.headers.get('X-Dokan-Cart-TotalItems')
			);
			const json = await response.json();

			if (json.code === undefined) {
				return { cartProduct: json, cartTotalPrice, cartTotalItems };
			} else {
				console.log(json.message);
			}
		} catch (error) {
			return error;
		}
	},
	addCartItemsBatch: async (items, token) => {
		const data = {
			create: items,
		};

		try {
			const response = await fetch(
				`${Config.WooCommerce.url}/wp-json/dokan/v1/cart/items/batch`,
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}
			);

			const json = await response.json();

			if (json.code === undefined) {
				return json;
			} else {
				console.log(json.message);
			}
		} catch (error) {
			return error;
		}
	},
	deleteCartItem: async (productKey, token) => {
		try {
			const response = await fetch(
				`${Config.WooCommerce.url}/wp-json/dokan/v1/cart/items/${productKey}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const totalPriceHeader = JSON.parse(
				response.headers.get('x-dokan-cart-totals')
			);
			const cartTotalPrice = totalPriceHeader.total;
			const cartTotalItems = JSON.parse(
				response.headers.get('X-Dokan-Cart-TotalItems')
			);
			const json = await response.json();

			if (json.code === undefined) {
				return { cartProduct: json, cartTotalPrice, cartTotalItems };
			} else {
				toast(json.message);
			}
		} catch (error) {
			console.log(error);
		}
	},
	deleteCart: async token => {
		try {
			const response = await fetch(
				`${Config.WooCommerce.url}/wp-json/dokan/v1/cart/items/`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			const json = await response.json();

			if (json.code === undefined) {
				return json;
			} else {
				console.log(json.message);
			}
		} catch (error) {
			console.log(error);
		}
	},
	updateCartItem: async (productKey, quantity, token) => {
		const data = {
			quantity: quantity,
		};

		try {
			const response = await fetch(
				`${Config.WooCommerce.url}/wp-json/dokan/v1/cart/items/${productKey}`,
				{
					method: 'PUT',
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}
			);
			const totalPriceHeader = JSON.parse(
				response.headers.get('X-Dokan-Cart-Totals')
			);
			const cartTotalPrice = totalPriceHeader.total;
			const cartTotalItems = JSON.parse(
				response.headers.get('X-Dokan-Cart-TotalItems')
			);
			const json = await response.json();

			if (json.code === undefined) {
				return { cartProduct: json, cartTotalPrice, cartTotalItems };
			} else {
				toast(json.message);
			}
		} catch (error) {
			console.log(error);
		}
	},
	getShippingMethods: async token => {
		try {
			const response = await fetch(
				`${Config.WooCommerce.url}/wp-json/dokan/v1/cart/shipping`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			);
			const json = await response.json();

			if (json.code === undefined) {
				return json;
			} else {
				console.log(json.message);
			}
		} catch (error) {
			console.log(error);
		}
	},
	calculateShipping: async (
		token,
		countryCode = '',
		state = '',
		postCode = '',
		city = ''
	) => {
		const data = {
			calc_shipping_country: countryCode,
			calc_shipping_state: state,
			calc_shipping_postcode: postCode,
			calc_shipping_city: city,
		};
		try {
			const response = await fetch(
				`${Config.WooCommerce.url}/wp-json/dokan/v1/cart/shipping/calculate`,
				{
					method: 'PUT',
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}
			);
			const json = await response.json();

			if (json.code === undefined) {
				return json;
			} else {
				console.log(json.message);
			}
		} catch (error) {
			console.log(error);
		}
	},
	updateShippingMethod: async (shippingMethodsObj, token) => {
		try {
			const response = await fetch(
				`${Config.WooCommerce.url}/wp-json/dokan/v1/cart/shipping`,
				{
					method: 'PUT',
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(shippingMethodsObj),
				}
			);
			const json = await response.json();

			if (json.code === undefined) {
				return json;
			} else {
				console.log(json.message);
			}
		} catch (error) {
			console.log(error);
		}
	},
	getCoupons: async token => {
		try {
			const response = await fetch(
				`${Config.WooCommerce.url}/wp-json/dokan/v1/cart/coupons`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			);
			const json = await response.json();

			if (json.code === undefined) {
				return json;
			} else {
				console.log(json.message);
			}
		} catch (error) {
			console.log(error);
		}
	},
	postCoupon: async (code, token) => {
		const data = {
			code: code,
		};
		try {
			const response = await fetch(
				`${Config.WooCommerce.url}/wp-json/dokan/v1/cart/coupons`,
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}
			);
			const json = await response.json();

			if (json.code === undefined) {
				return json;
			} else {
				return json.data.params.code;
			}
		} catch (error) {
			console.log(error);
		}
	},
	getBrainTreeToken: async () => {
		const oauth = OAuth({
			consumer: {
				key: Config.WooCommerce.consumerKey,
				secret: Config.WooCommerce.consumerSecret,
			},
			signature_method: 'HMAC-SHA256',
			hash_function(base_string, key) {
				return CryptoJS.HmacSHA256(base_string, key).toString(
					CryptoJS.enc.Base64
				);
			},
		});

		const url = `${Config.WooCommerce.url}/wp-json/wc-dokan/v1/braintree/token`;
		const request_data = {
			url: url,
			method: 'post',
		};
		const data = oauth.authorize(request_data);
		const form = new FormData();

		for (key in data) {
			form.append(key, data[key]);
		}

		try {
			const response = await fetch(url, {
				method: 'post',
				headers: {
					Accept: '*/*',
				},
				body: form,
			});
			const json = await response.json();

			if (json.code === undefined) {
				return json;
			} else {
				return json.data.params.code;
			}
		} catch (error) {
			console.log(error);
		}
	},
};

export default DokanWorker;
