const path = require('path')
const plugins = require('./plugins')
module.exports = {
  mode: 'production',
  // devtool: 'source-map',
  entry: {
    video: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].min.js',
    libraryTarget: 'umd',
    library: 'video',
    libraryExport: 'default',
    umdNamedDefine: true,
    publicPath: '/',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@babel/preset-env'],
            },
          },
        ],
        exclude: path.resolve(__dirname, '../libs/DPlayer.min.js'),
      },
    ],
  },
  plugins,
}
