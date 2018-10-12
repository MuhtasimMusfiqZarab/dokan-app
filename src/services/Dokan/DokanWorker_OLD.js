/** @format */

/**
 * Created by weDevs 10/10/2018
 */

import { Config } from "@common";
import { error, warn, log } from "@app/Omni";

const DokanWorker = {
  getTopRatedProducts: async () => {
    return await fetch(`${Config.WooCommerce.url}/wp-json/dokan/v1/products/top_rated`)
      .then((response) => response.json())
      .then((json) => {
        if (json.length != 0) {
          return json;
        }
      })
      .catch((error) => warn(error));
  },
  getBestSellingProducts: async () => {
    return await fetch(`${Config.WooCommerce.url}/wp-json/dokan/v1/products/best_selling`)
      .then((response) => response.json())
      .then((json) => {
        if (json.length != 0) {
          return json;
        }
      })
      .catch((error) => warn(error));
  },
  getLatestProducts: async () => {
    return await fetch(`${Config.WooCommerce.url}/wp-json/dokan/v1/products/latest`)
      .then((response) => response.json())
      .then((json) => {
        if (json.length != 0) {
          return json;
        }
      })
      .catch((error) => warn(error));
  },
  getVendors: async () => {
    return await fetch(`${Config.WooCommerce.url}/wp-json/dokan/v1/stores`)
      .then((response) => response.json())
      .then((json) => {
        if (json.length != 0) {
          return json;
        }
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
};

export default DokanWorker;
