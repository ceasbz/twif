import test from 'ava'
import twif from './'

const username = 'Google'

test('should thrown exception without environment variables', t => {
    const consumerKeyError = t.throws(() => {
        twif(username)
    }, Error)

    t.is(consumerKeyError.message, 'Please, set the CONSUMER_KEY environment variable.');

    process.env.CONSUMER_KEY = 123;

    const consumerSecretError = t.throws(() => {
        twif(username)
    }, Error)

    t.is(consumerSecretError.message, 'Please, set the CONSUMER_SECRET environment variable.');

    process.env.CONSUMER_SECRET = 456;

    const accessTokenError = t.throws(() => {
        twif(username)
    }, Error)

    t.is(accessTokenError.message, 'Please, set the ACCESS_TOKEN environment variable.');

    process.env.ACCESS_TOKEN = 789;

    const accessTokenSecretError = t.throws(() => {
        twif(username)
    }, Error)

    t.is(accessTokenSecretError.message, 'Please, set the ACCESS_TOKEN_SECRET environment variable.');;
})
