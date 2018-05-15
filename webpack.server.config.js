const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function config(env, argv) {
  return {
    target: "node",
    mode: 'production',
    entry: [
      'babel-polyfill',
      'isomorphic-fetch',
      './src/server.tsx',
    ],
    output: {
      path: `${__dirname}/dist`,
      filename: 'server.js',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      modules: ['node_modules']
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader?importLoaders=1',
            'postcss-loader',
          ],
        },
        {
          test: /\.tsx?$/,
          exclude: /(node_modules)/,
          use: ['babel-loader', 'ts-loader']
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          use: 'file-loader',
        },
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': `'production'`,
          'TARGET': `'node'`,
        },
      }),
    ], 
  };
}

module.exports = config;
