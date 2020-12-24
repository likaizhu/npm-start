const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const env = process.env.NODE_ENV
const plugins = [
  new CleanWebpackPlugin(),
  new Dotenv({
    path: `.env.${
      env === 'production'
        ? 'production'
        : env === 'development'
        ? 'development'
        : 'staging'
    }`,
    // path: '.env.production',
  }),
]
module.exports = plugins
