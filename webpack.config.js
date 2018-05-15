const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function config(env, argv) {
  return {
    entry: [
      'babel-polyfill',
      'isomorphic-fetch',
      './src/index.tsx',
    ],
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
    devServer: {
      contentBase: './dist',
      port: 8080,
      historyApiFallback: true,
      disableHostCheck: true,
      proxy: {
        '/0/public': {
          target: 'https://api.kraken.com',
          secure: true,
          changeOrigin: true,
        },
        '/v2': {
          target: 'https://api.coinmarketcap.com',
          secure: true,
          changeOrigin: true,
        },
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.tpl.html',
        chunksSortMode: 'dependency',
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': `'${argv.mode}'`,
          'TARGET': `'browser'`,
        },
      }),
    ],
  };
}

module.exports = config;
