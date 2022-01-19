/* eslint-disable import/no-extraneous-dependencies */
const withFonts = require('next-fonts');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withFonts(
  withBundleAnalyzer({
    poweredByHeader: false,
    trailingSlash: true,
    reactStrictMode: true,
  })
);
