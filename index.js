'use strict';

const tokens = {
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token_key: process.env.ACCESS_TOKEN,
	access_token: process.env.ACCESS_TOKEN,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET
};

module.exports = (username, followersLimit) => {
	const usernameTypeOf = typeof username;
	if (usernameTypeOf !== 'string') {
        throw new TypeError(`Expected a string but got ${usernameTypeOf}`);
    }

    const followersLimitTypeOf = typeof followersLimit;
    if (followersLimitTypeOf !== 'number') {
    	throw new TypeError(`Expected a string but got ${followersLimitTypeOf}`);	
    }

	const getTwitterFollowers = require('get-twitter-followers');

	getTwitterFollowers(tokens, username).then(followers => {
		followers.sort((a, b) => b.followers_count - a.followers_count);
		followers.slice(0, followersLimit).map((follower, index) => {
			console.log(`
 Position: ${index + 1}
 Link: https://twitter.com/${follower.screen_name}
 Total followers: ${follower.followers_count}`
);
		});
	});
};