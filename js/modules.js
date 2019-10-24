const fs = require('fs');

/**
 * Exports the settings for javascript modules in webpack.config
 *
 * @param {string} ENV Environment to build for, expects 'production' for production and
 * anything else for non-production
 * @param {string} MODULES The modules folder
 * @param {string} THIRDPARTY A thirdparty folder, self-hosted modules.
 * @returns {{rules: Array.<*>}}
 */
module.exports = (ENV, { MODULES, THIRDPARTY }) => {
  const tsconfigPath = fs.existsSync('tsconfig.json') ?
    'tsconfig.json' :
    `${MODULES}/@silverstripe/webpack-config/tsconfig.json`;

  return {
    rules: [
      {
        // .js and .jsx files are caught
        test: /\.jsx?$/,
        exclude: new RegExp(`(${MODULES}|${THIRDPARTY})`),
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', { modules: false }],
            'react',
          ],
          plugins: [
            'transform-object-rest-spread',
          ],
          comments: false,
          cacheDirectory: (ENV !== 'production'),
        },
      },
      {
        test: /\.tsx?$/,
        exclude: new RegExp(`(${MODULES}|${THIRDPARTY})`),
        use: [
          'babel-loader',
          `ts-loader?configFile=${tsconfigPath}`
        ]
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/,
        exclude: /fonts[\/\\]([\w_-]+)\.svg$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
        },
      },
      {
        test: '/i18n.js/',
        use: 'script-loader',
      },
      {
        test: /\.modernizrrc$/,
        use: [
          'modernizr-loader',
          'json-loader',
        ],
      },
    ],
  };
};
