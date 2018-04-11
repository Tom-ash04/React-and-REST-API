const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: {
    app: './src/index.js',
    vendors: ['react', 'react-dom', 'isomorphic-fetch'],
  },

  output: {
    publicPath: '/dist/',
    path: resolve(__dirname, 'dist/'),
    filename: '[name].js',
  },

  devtool: 'cheap-module-eval-source-map',

  devServer: {
    historyApiFallback: {
      index: '/dist/',
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015'],
          },
        },
      },

      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader',
        }),
      },
    ],
  },

  plugins: [
    new ExtractTextWebpackPlugin('main.css'),

    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
    }),
  ],
};
