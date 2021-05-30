const { resolve } = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { src: srcPath, build: buildPath } = require('./paths');

module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',

  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    contentBase: buildPath,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },

  plugins: [
    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      title: 'Bootstrap 5',
      template: resolve(srcPath, 'index.html'),
      filename: 'index.html',
      favicon: resolve(srcPath, 'assets', 'favicon.ico'),
    }),

    // Only update what has changed on hot reload
    new HotModuleReplacementPlugin(),
  ],

  module: {
    rules: [
      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                // postcss plugins, can be exported to postcss.config.js
                plugins: function () {
                  return [require('autoprefixer')];
                },
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
});
