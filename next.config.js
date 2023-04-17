/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  scrope: '/',
  reloadOnOnline: false
})

module.exports = withPWA({
  experimental: {
    appDir: true,
  },
})