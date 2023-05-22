const Contentstack = require("contentstack");
const dotenv = require('dotenv')
dotenv.config()

const Stack = Contentstack.Stack({
  api_key: process.env.CONTENTSTACK_API_KEY,
  delivery_token: process.env.CONTENTSTACK_DELIVERY_KEY,
  environment: process.env.CONTENTSTACK_ENVIRONMENT,
  live_preview: {
    enable: process.env.NODE_ENV !== 'production' ? true : false,
    host: "api.contentstack.io",
    management_token: process.env.CONTENTSTACK_MANAGEMENT_KEY,
  },
});

module.exports = {
  Stack,
};
