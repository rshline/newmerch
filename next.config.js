/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    strive_public_key : process.env.STRIPE_PUBLIC_KEY
  }
}
