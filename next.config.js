/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: 'public',
  // scope: '/',
  reloadOnOnline: false
})

module.exports = withPWA({
  experimental: {
    appDir: true,
  },
})