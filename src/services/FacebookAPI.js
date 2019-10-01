/**
 * @format
 */
import { Config } from '@common';
import { Facebook } from '@expo';
import { log, toast } from './../Omni';

// const LoginBehaviors = {
// 	native_with_fallback: 'native',
// 	native_only: 'native_only',
// 	web_only: 'web_only',
// };

class FacebookAPI {
	constructor() {
		// Expo.Facebook.setLoginBehavior(LoginBehaviors.native_with_fallback);
	}

	async login() {
		try {
			const ask = await Facebook.logInWithReadPermissionsAsync(
				Config.appFacebookId,
				{
					permissions: ['public_profile', 'email'],
				}
			);
			const { type } = ask;
			console.log(type);
			if (type === 'cancel') {
				return { message: 'Login cancelled' };
			}
			if (type === 'success') {
				const { token, profilePicUrl } = ask;

				const graphResponse = await fetch(
					`https://graph.facebook.com/me?fields=picture.height(250)&access_token=${token}`
				);
				const graphResponseJSON = await graphResponse.json();
				console.log(graphResponseJSON);

				return {
					token: token,
					profilePicUrl: graphResponseJSON.picture.data.url,
				};
				// return response.json();
			}
		} catch (err) {
			console.log('err:::', err);
			return { message: 'Login Failed' };
			// if (err.framesToPop === 1 && err.code === 'EUNSPECIFIED') {
			//     if (Platform.OS === 'android') {
			//         Expo.Facebook.setLoginBehavior(LoginBehaviors.web_only);
			//     }
			// }
			//     return callback('Sorry, Can\'t get data from Facebook. Please try other login method', undefined);
			// }
			// callback(err, undefined);
		}
	}

	getFbProfilePicUrl() {
		return Facebook.getFbProfilePicUrl();
	}

	logout() {
		Facebook.logOut();
	}

	getAccessToken() {
		console.log(Facebook.getCurrentFacebook());
		return Facebook.getCurrentFacebook();
	}

	async shareLink(link, desc) {
		const shareLinkContent = {
			contentType: 'link',
			contentUrl: link,
			contentDescription: desc,
		};
		try {
			const canShow = await Facebook.canShow(shareLinkContent);
			if (canShow) {
				const result = await Facebook.show(shareLinkContent);
				if (!result.isCancelled) {
					toast('Post shared');
					log('Share a post with id: ' + result.postId);
				}
			}
		} catch (error) {
			toast('An error occurred. Please try again later');
			error('Share post fail with error: ' + error);
		}
	}
}

export default new FacebookAPI();
