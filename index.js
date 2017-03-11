'use strict';

const environmentVariables = [
    'CONSUMER_KEY',
    'CONSUMER_SECRET',
    'ACCESS_TOKEN',
    'ACCESS_TOKEN_SECRET'
];

const tokens = {};

environmentVariables.map(environmentVariable => {
    if (! process.env[environmentVariable]) {
        throw new Error(`Please, set the ${environmentVariable} environment variable.`);
        process.exit(1);
    }

    tokens[environmentVariable.toLocaleLowerCase()] = process.env[environmentVariable];
});

module.exports = (username, limit) => {
    const usernameTypeOf = typeof username;
    if (usernameTypeOf !== 'string') {
        throw new TypeError(`Expected a string but got ${usernameTypeOf}`);
    }

    const followersLimit = typeof limit === 'number' ? limit : 10;
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
