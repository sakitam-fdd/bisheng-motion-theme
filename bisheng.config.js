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
  source: './docs',
  output: './_site',
  theme: './src/index',
  htmlTemplate: './src/static/template.html',
  devServerConfig: {},
  port: 4000,
  themeConfig: {
    home: '/',
    title: 'motion theme',
    index: {
      banner: {
        title: 'Bisheng Motion Theme',
        introduce: 'A bisheng theme base on motion',
        content: '使用 Ant Motion 能够快速在 React 框架中使用动画。我们提供了单项，组合动画，以及整套解决方案',
        more: {
          label: '了解更多',
          link: '/'
        },
        quickStart: {
          label: '快速开始',
          link: '/'
        }
      }
    },
    header: {
      github: {
        user: 'sakitam-fdd',
        repo: 'ol3Echarts',
        type: 'star',
        count: true
      },
      nav: [
        { name: '示例', href: '/examples/', key: 'examples' },
        { name: '起步', href: '/guide/index', key: 'guide' },
        { name: 'API', href: '/api/index', key: 'api' },
        { name: '插件', href: '/plugins/index', key: 'plugins' }
      ]
    },
    footer: {
      copyright: 'sakitam-fdd'
    }
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
