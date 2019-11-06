const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const dev = argv.mode === 'development';

  const plugins = [new HtmlWebpackPlugin()];

  if (dev) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return {
    entry: './src/index.js',
    devtool: dev ? 'source-map' : 'none',
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          options: { presets: ['@babel/env'] }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    resolve: { extensions: ['*', '.js', '.jsx'] },
    output: {
      path: path.resolve(__dirname, 'dist/'),
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: path.join(__dirname, 'public/'),
      port: 3000,
      publicPath: 'http://localhost:3000',
      hotOnly: true
    },
    plugins
  };
};
