/** @format */

const FBSDK = require('react-native-fbsdk');
const { LoginManager, AccessToken, GraphRequest, GraphRequestManager } = FBSDK;

export default class Facebook {
	static logInWithReadPermissionsAsync(logInID, options) {
		return LoginManager.logInWithReadPermissions(options.permissions).then(
			result => {
				if (result.isCancelled) {
					return { type: 'cancel' };
				}
				return AccessToken.getCurrentAccessToken().then(data => {
					return {
						type: 'success',
						token: data.accessToken,
					};
				});
			}
		);
	}
	static async getFbProfilePicUrl() {
		try {
			const currentAccessToken = await AccessToken.getCurrentAccessToken();

			const graphRequest = new GraphRequest(
				'/me',
				{
					accessToken: currentAccessToken.accessToken,
					parameters: {
						fields: {
							string: 'picture.type(large)',
						},
					},
				},
				(error, result) => {
					if (error) {
						console.error(error);
					} else {
						console.log(result.picture.data.url);
						return result.picture.data.url;
					}
				}
			);

			new GraphRequestManager().addRequest(graphRequest).start();
		} catch (error) {
			console.error(error);
		}
	}
	static async getCurrentFacebook() {
		const data = await AccessToken.getCurrentAccessToken();
		return data.accessToken;
	}
	static logOut() {
		LoginManager.logOut();
	}
}
