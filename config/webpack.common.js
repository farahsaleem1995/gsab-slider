const { resolve } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { src: srcPath, public: publicPath } = require('./paths');

module.exports = {
  // Where webpack looks to start building the bundle
  entry: {
    main: resolve(srcPath, 'index.js'),
  },

  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: publicPath,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      // HTML
      {
        test: /\.html$/,
        use: ['html-loader'],
      },

      // JavaScript
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },

      // Images: Copy image files to build folder
      {
        test: /\.(?:ico|png|jpe?g|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash].[ext]',
        },
      },

      // Fonts and SVGs: Inline files
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
};
