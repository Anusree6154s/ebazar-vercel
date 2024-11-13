/**
 * Loads environment variables from a `.env` file into `process.env` and exports constant values for use across the application.
 * @module config/env.config
 */

require("dotenv").config();



/**
 * @module config/env.config
 * @description Loads environment variables from a `.env` file and exports configuration constants for use across the application.
 * @constant
 * @type {Object}
 * @property {Object} jwt - JWT configuration.
 * @property {string} jwt.jwt_secret_key - Secret key for JWT authentication.
 * @property {Object} mongoose - MongoDB configuration.
 * @property {string} mongoose.uri - URI for MongoDB connection.
 * @property {Object} stripe - Stripe configuration.
 * @property {string} stripe.key - Stripe API key.
 * @property {Object} email - Email configuration.
 * @property {string} email.senders_email - Email address for sending transactional emails.
 * @property {string} email.senders_email_2 - Backup email address for sending emails.
 * @property {string} email.app_password - Password for the sender's email.
 * @property {string} email.app_password_2 - Password for the backup sender's email.
 * @property {Object} server - Server configuration.
 * @property {number} server.port - Port number for the server.
 * @property {Object} webhook - Webhook configuration.
 * @property {string} webhook.endpoint_secret - Secret key for securing webhook endpoints.
 */
console.log(process.env.JWT_SECRET_KEY)
exports.env = {
    jwt: {
        jwt_secret_key: process.env.JWT_SECRET_KEY,
    },
    mongoose: {
        uri: process.env.NODE_ENV === 'test' ? process.env.URI_TEST : process.env.URI,
    },
    stripe: {
        stripe_secret_key: process.env.STRIPE_SECRET_KEY,
    },
    email: {
        senders_gmail: process.env.SENDERS_GMAIL,
        senders_gmail_app_password: process.env.SENDERS_GMAIL_APP_PASSWORD,
    },
    server: {
        port: process.env.PORT,
    }

};