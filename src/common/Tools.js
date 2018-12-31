/** @format */

"use strict";

import { AsyncStorage } from "react-native";
import { Constants, Languages, Images } from "@common";
import { AllHtmlEntities } from "html-entities";
import truncate from "lodash/truncate";
import URI from "urijs";
import _ from "lodash";

export default class Tools {
	/**
	 * refresh the tab bar & read later page
	 */
	static getImage(data, imageSize) {
		if (typeof data == "undefined" || data == null) {
			return Constants.PlaceHolder;
		}
		if (typeof imageSize == "undefined") {
			imageSize = "medium";
		}

		const getImageSize = (mediaDetail) => {
			let imageURL = "";
			if (typeof mediaDetail["sizes"] != "undefined") {
				if (typeof mediaDetail["sizes"][imageSize] != "undefined") {
					imageURL = mediaDetail["sizes"][imageSize]["source_url"];
				}

				if (
					imageURL == "" &&
					typeof mediaDetail["sizes"]["medium"] != "undefined"
				) {
					imageURL = mediaDetail["sizes"]["medium"]["source_url"];
				}

				if (
					imageURL == "" &&
					typeof mediaDetail["sizes"]["full"] != "undefined"
				) {
					imageURL = mediaDetail["sizes"]["full"]["source_url"];
				}
			}

			if (typeof data.better_featured_image != null) {
				imageURL = data.better_featured_image["source_url"];
			}

			console.log(imageURL)

			return imageURL;
		};

		let imageURL =
			typeof data.better_featured_image != "undefined" &&
			data.better_featured_image != null
				? data.better_featured_image.source_url
				: Constants.PlaceHolderURL;

		if (
			typeof data.better_featured_image != "undefined" &&
			data.better_featured_image !== null
		) {
			if (typeof data.better_featured_image["media_details"] != "undefined") {
				imageURL = getImageSize(data.better_featured_image["media_details"]);
			}
		}

		if (imageURL == "") {
			return Constants.PlaceHolderURL;
		}

		console.log(imageURL);

		return imageURL;
	}

	static getDescription(description, limit) {
		if (typeof limit == "undefined") {
			limit = 50;
		}

		if (typeof description == "undefined") {
			return "";
		}

		let desc = description.replace("<p>", "");
		desc = truncate(desc, { length: limit, separator: " " });

		return AllHtmlEntities.decode(desc);
	}

	static getLinkVideo(content) {
		const regExp = /^.*((www.youtube.com\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\??v?=?))([^#&\?\/\ ]*).*/;
		var embedId = "";
		var youtubeUrl = "";

		URI.withinString(content, function(url) {
			var match = url.match(regExp);
			if (match && match[7].length === 11) {
				embedId = match[7];
				youtubeUrl = "www.youtube.com/embed/" + embedId;
			}
		});
		return youtubeUrl;
	}

	static async getFontSizePostDetail() {
		const data = await AsyncStorage.getItem("@setting_fontSize");
		if (typeof data != "undefined") {
			return parseInt(data);
		}
		return Constants.fontText.size;
	}

	/**
	 * getName user
	 * @user
	 */
	static getName = (user) => {
		if (user != null) {
			if (
				typeof user.last_name != "undefined" ||
				typeof user.first_name != "undefined"
			) {
				let first = user.first_name != null ? user.first_name : "";
				let last = user.last_name != null ? user.last_name : "";
				return first + " " + last;
			} else if (typeof user.name != "undefined" && user.name != null) {
				return user.name;
			} else {
				return Languages.Guest;
			}
		}
		return Languages.Guest;
	};

	/**
	 * getAvatar
	 * @user
	 */
	static getAvatar = (user) => {
		if (user) {
			if (user.avatar_url) {
				return {
					uri: user.avatar_url,
				};
			} else if (user.picture) {
				return {
					uri: user.picture.data.url,
				};
			} else {
				return Images.defaultAvatar;
			}
		}

		return Images.defaultAvatar;
	};

	/**
	 * getAddress
	 * @user
	 */
	static getAddress = (user) => {
		if (!_.isEmpty(user)) {
			if (
				typeof user.billing.address_1 != "undefined" ||
				typeof user.billing.address_2 != "undefined" ||
				typeof user.billing.city != "undefined" ||
				typeof user.billing.country != "undefined"
			) {
				const address1 = user.billing.address_1;
				const address2 = user.billing.address_2;
				const city = user.billing.city;
				const country = user.billing.country;

				return `${address1} ${address2} ${city} ${country}`;
			}
		}
	};
}
