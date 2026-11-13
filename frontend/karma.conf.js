const path = require('path');

process.env.CHROME_BIN = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'webpack'],
    customLaunchers: {
      EdgeHeadless: {
        base: 'ChromeHeadless',
        flags: []
      }
    },
    files: [
      'src/__tests__/*.spec.js',
      '../script/*.spec.js'
    ],
    preprocessors: {
      'src/__tests__/*.spec.js': ['webpack'],
      '../script/*.spec.js': ['webpack']
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: 'defaults' }],
                  ['@babel/preset-react', { runtime: 'automatic' }]
                ]
              }
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/i,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 8 * 1024
              }
            }
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      }
    },
    webpackMiddleware: {
      stats: 'errors-only'
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['EdgeHeadless'],
    singleRun: true,
    concurrency: 1
  });
};
