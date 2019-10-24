const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const fs = require('fs');

/**
 * Exports the settings for resolve in webpack.config
 *
 * @param {string} ENV Environment to build for, expects 'production' for production and
 * anything else for non-production
 * @param {string} ROOT The root folder containing package.json
 * @param {string} SRC Path to source files
 * @param {string} MODULES The modules folder
 */
module.exports = (ENV, { ROOT, MODULES, SRC }) => {
  const configFile = fs.existsSync('tsconfig.json') ?
    'tsconfig.json' :
    `${MODULES}/@silverstripe/webpack-config/tsconfig.json`;

  const extensions = ['.json', '.js', '.jsx', '.ts', '.tsx'];

  return {
    modules: [ROOT, SRC, MODULES],
    extensions,
    alias: {
      modernizr$: `${SRC}/.modernizrrc`,
    },
    plugins: [
      new TsconfigPathsPlugin({ configFile, extensions })
    ]
  }
};
