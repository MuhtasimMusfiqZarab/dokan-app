/** @format */

import { Config } from '@common';
import { warn, toast } from '@app/Omni';

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
	addCartItem: async (productID, qty = 1, token) => {
		const data = {
			product_id: productID,
			quantity: qty,
		};

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
				toast(json.message);
			}
		} catch (error) {
			return error;
		}
	},
};

export default DokanWorker;
