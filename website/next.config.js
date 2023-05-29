const { withPlausibleProxy } = require("next-plausible")

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
}

module.exports = withPlausibleProxy()(config)
