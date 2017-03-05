'use strict';

const tokens = {
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token_key: process.env.ACCESS_TOKEN,
	access_token: process.env.ACCESS_TOKEN,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET
};

const getTwitterFollowers = require('get-twitter-followers');

getTwitterFollowers(tokens, 'ceasbz').then(followers => {
	followers.sort((a, b) => b.followers_count - a.followers_count);
	followers.slice(0, 10).map(follower => {
		console.log(`https://twitter.com/${follower.screen_name} - Total: ${follower.followers_count}`);
	});
});