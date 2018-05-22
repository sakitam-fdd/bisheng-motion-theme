const path = require('path');
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;

function alertBabelConfig (rules) {
  rules.forEach((rule) => {
    if (rule.loader && rule.loader === 'babel-loader') {
      rule.options.plugins = rule.options.plugins.filter(plugin =>
        !plugin.indexOf || plugin.indexOf('babel-plugin-add-module-exports') === -1
      );
    } else if (rule.use) {
      alertBabelConfig(rule.use);
    }
  });
}

module.exports = {
  root: '/',
  source: {
    guide: 'docs/guide'
  },
  output: './_site',
  theme: './src/index',
  htmlTemplate: './src/static/template.html',
  devServerConfig: {},
  port: 4000,
  themeConfig: {
    home: '/',
    sitename: 'One',
    tagline: 'The one theme for bisheng',
    github: 'https://github.com/benjycui/bisheng',
  },
  webpackConfig (config) {
    // config.plugins.push(
    //   [
    //     require.resolve('babel-plugin-transform-runtime'),
    //     {
    //       polyfill: false,
    //       regenerator: false,
    //     }
    //   ],
    //   [
    //     'babel-plugin-import',
    //     {
    //       libraryName: 'antd',
    //       libraryDirectory: 'lib',
    //       style: true,
    //     }
    //   ]
    // );
    alertBabelConfig(config.module.rules);
    config.plugins.push(new CSSSplitWebpackPlugin({ size: 4000 }));
    config.resolve.alias = {
      'react-router': 'react-router/umd/ReactRouter'
    };
    return config;
  }
};
