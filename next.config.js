/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public"
});

module.exports = withPWA({
  reactStrictMode: true,
  env: {
    strive_public_key : process.env.STRIPE_PUBLIC_KEY
  }
})
