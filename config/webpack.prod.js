const { resolve } = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common');
const { src: srcPath, build: buildPath, src } = require('./paths');

module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'production',

  // Control how source maps are generated
  devtool: false,

  // Where webpack outputs the assets and bundles
  output: {
    path: buildPath,
    filename: 'js/[name].[contenthash].bundle.js',
  },

  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],

    // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
    // instead of having their own. This also helps with long-term caching, since the chunks will only
    // change when actual code changes, not the webpack runtime.
    runtimeChunk: {
      name: 'runtime',
    },
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  plugins: [
    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      title: 'Bootstrap 5',
      template: resolve(srcPath, 'index.html'),
      filename: 'index.html',
      favicon: resolve(srcPath, 'assets', 'favicon.ico'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),

    // Extracts CSS into separate files
    // Note: style-loader is for development, MiniCssExtractPlugin is for production
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].bundle.css',
      chunkFilename: '[id].css',
    }),
  ],

  module: {
    rules: [
      // CSS, PostCSS, and Sass
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
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
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
});
