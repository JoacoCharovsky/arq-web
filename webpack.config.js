// eslint-disable-next-line @typescript-eslint/no-require-imports
const { sentryWebpackPlugin } = require("@sentry/webpack-plugin");

module.exports = {
  // ... other options
  devtool: "source-map", // Source map generation must be turned on
  plugins: [
    // Put the Sentry Webpack plugin after all other plugins
    sentryWebpackPlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: "joaquinup",
      project: "javascript-nextjs",
    }),
  ],
};
