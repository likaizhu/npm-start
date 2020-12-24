const path = require('path')
const plugins = require('./plugins')
module.exports = {
  entry: {
    video: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, '..dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'video',
    libraryExport: 'default',
    umdNamedDefine: true,
    publicPath: '/',
  },
  devtool: 'eval-cheap-source-map',
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
  devServer: {
    compress: true,
    contentBase: path.resolve(__dirname, '..', 'example'),
    clientLogLevel: 'none',
    port: 9001,
    hot: true,
    open: true,
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  },
  plugins,
}
