const { i18n } = require('./next-i18next.config');

module.exports = {
  // pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js', '.js'],
  i18n,

  env: {
    SERVER_URL: process.env.SERVER_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
};
