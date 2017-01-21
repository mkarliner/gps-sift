'use strict';

var webpack = require('webpack'),
  path = require('path'),
  pkg = { version: '0.1.0' };

var siftRootPath = path.resolve('./');

module.exports = {
  cache: true,
  resolve: {
   // NOTE: resolves to $PROJECT_ROOT/ and allows to include files from there. E.g., to include a file from
   // $PROJECT_ROOT/server use 'import settings from "server/settings.js"'.
   root: [ siftRootPath ],
   extensions: [ '', '.js', '.jsx', '.json', '.tmpl', '.vue' ],
   alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  // NOTE: keeping that here in case it is necessary in the future (see https://webpack.github.io/docs/configuration.html#module-loaders):
  // resolveLoader: {
  //   root: [path.resolve('./node_modules')]
  // },
  module: {
    loaders: [
      { test: /\.vue$/, loader: "vue" },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            // NOTE: use 'require.resolve' here as the presets are located in redsift-bundler's node_modules. If only
            // listing the presets as ['es2015', 'react'] they would be resolved from $PROJECT_ROOT, which fails if
            // they are not explicitly installed there.
            // See https://github.com/babel/babel-loader/issues/149 for a discussion on the topic.
            require.resolve('babel-preset-es2015'),
            require.resolve('babel-preset-react'),
            require.resolve('babel-preset-stage-0'),
          ]
        }
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.tmpl$/, loader: 'html-loader' },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      VERSION: JSON.stringify(pkg.version)
    }),
    new webpack.NoErrorsPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  devtool: 'source-map',
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
