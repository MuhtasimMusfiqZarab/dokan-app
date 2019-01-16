/** @format */

import { Config } from "@common";
import { error, warn, log } from "@app/Omni";

const DokanWorker = {
	getFeaturedProducts: async (page=1, per_page=10) => {
		return await fetch(
			`${Config.WooCommerce.url}/wp-json/dokan/v1/products/featured?page=${page}&per_page=${per_page}`
			)
			.then((response) => response.json())
			.then((json) => {
				return json;
			})
			.catch((error) => warn(error));
	},
	getTopRatedProducts: async (page=1, per_page=10) => {
		return await fetch(
			`${Config.WooCommerce.url}/wp-json/dokan/v1/products/top_rated?page=${page}&per_page=${per_page}`
			)
			.then((response) => response.json())
			.then((json) => {
				return json;
			})
			.catch((error) => warn(error));
	},
	getBestSellingProducts: async (page=1, per_page=10) => {
		return await fetch(
			`${Config.WooCommerce.url}/wp-json/dokan/v1/products/best_selling?page=${page}&per_page=${per_page}`
			)
			.then((response) => response.json())
			.then((json) => {
				return json;
			})
			.catch((error) => warn(error));
	},
	getLatestProducts: async (page=1, per_page=10) => {
		return await fetch(
			`${Config.WooCommerce.url}/wp-json/dokan/v1/products/latest?page=${page}&per_page=${per_page}`
			)
			.then((response) => response.json())
			.then((json) => {
				return json;
			})
			.catch((error) => warn(error));
	},
	getRelatedProducts: async (productID) => {
		return await fetch(
			`${Config.WooCommerce.url}/wp-json/dokan/v1/products/${productID}/related`
			)
			.then((response) => response.json())
			.then((json) => {
				if (json.length != 0) {
					return json;
				}
			})
			.catch((error) => warn(error));
	},
	getVendors: async (page, per_page) => {
		const url = `${Config.WooCommerce.url}/wp-json/dokan/v1/stores?page=${page}&per_page=${per_page}`

		return await fetch (url)
			.then((response) => response.json())
			.then((json) => {
				return json;
			})
			.catch((error) => warn(error));
	},
	getFeaturedVendors: async () => {
		return await fetch(`${Config.WooCommerce.url}/wp-json/dokan/v1/stores?featured=yes`)
			.then((response) => response.json())
			.then((json) => {
				if (json.length != 0) {
					return json;
				}
			})
			.catch((error) => warn(error));
	},
	getVendorProducts: async(vendorID) => {
		return await fetch(`${Config.WooCommerce.url}/wp-json/dokan/v1/stores/${vendorID}/products`)
			.then((response) => response.json())
			.then((json) => {
				if (json.length != 0) {
					return json;
				}
			})
			.catch((error) => warn(error));
	},
	getSingleVendor: async(vendorID) => {
		return await fetch(`${Config.WooCommerce.url}/wp-json/dokan/v1/stores/${vendorID}/`)
			.then((response) => response.json())
			.then((json) => {
				if (json.length != 0) {
					return json;
				}
			})
			.catch((error) => warn(error));
	}
};

export default DokanWorker;
