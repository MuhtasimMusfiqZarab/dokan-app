/**
 * An API for JWT Auth Word Press plugin.
 * https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/
 *
 * @format
 */

import { error, request } from '@app/Omni';
import { Config } from '@common';

const url = Config.WooCommerce.url;
const isSecured = url.startsWith('https');
const secure = isSecured ? '' : '&insecure=cool';
const cookieLifeTime = 120960000000;

const WPUserAPI = {
	login: async (username, password) => {
		const _url = `${url}/wp-json/jwt-auth/v1/token`;
		const data = {
			username: username,
			password: password,
		};
		const method = 'POST';

		return await request(_url, data, method);
	},
	// login: async (username, password) => {
	// 	const _url = `${url}/api/user/generate_auth_cookie/?second=${cookieLifeTime}&username=${username}&password=${password}${secure}`;

	// 	return await request(_url);
	// },
	loginFacebook: async token => {
		const _url = `${url}/wp-json/dokan/v1/customers/social-login`;
		const data = {
			provider: 'facebook',
			access_token: token,
		};
		const method = 'POST';

		return await request(_url, data, method);
	},

	register: async ({
		username,
		email,
		firstName,
		lastName,
		password = undefined,
		confirmPassword = undefined,
		role,
	}) => {
		try {
			const _url = `${url}/wp-json/dokan/v1/user/register`;
			const data = {
				username: username,
				email: email,
				first_name: firstName,
				last_name: lastName,
				password: password ? password : '',
				confirm_password: confirmPassword ? confirmPassword : '',
				role: role,
			};

			return await request(_url, data, 'POST');
		} catch (err) {
			error(err);
			return { error: err };
		}
	},
	getNonce: async () => {
		const _url = `${url}/api/get_nonce/?controller=user&method=register`;
		const json = await request(_url);
		return json && json.nonce;
	},
	forgetPassword: async userLogin => {
		const _url = `${url}/wp-json/dokan/v1/user/lostpassword`;
		const json = await request(_url, { user_login: userLogin }, 'POST');

		return json;
	},
};

export default WPUserAPI;
