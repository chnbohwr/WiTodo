'use strict';

/**
 * Dist configuration. Used to build the
 * final output when running npm run dist.
 */
const webpack = require('webpack');
const WebpackBaseConfig = require('./Base');

class WebpackDistConfig extends WebpackBaseConfig {

  constructor() {
    super();
    this.config = {
      cache: false,
      entry: [
        './client.js'
      ],
      plugins: [
        new webpack.EnvironmentPlugin({
          NODE_ENV: 'production'
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        //new webpack.NoErrorsPlugin(),
        new webpack.EnvironmentPlugin({
          NODE_ENV: 'development',
          APIHOST: 'p32yfvgcdc.execute-api.us-east-1.amazonaws.com/dev',
        }),
      ]
    };

    // Deactivate hot-reloading if we run dist build on the dev server
    this.config.devServer.hot = false;
  }

  /**
   * Get the environment name
   * @return {String} The current environment
   */
  get env() {
    return 'dist';
  }
}

module.exports = WebpackDistConfig;
