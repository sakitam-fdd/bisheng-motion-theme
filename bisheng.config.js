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
  root: './bisheng-motion-theme/',
  source: './docs',
  output: './bisheng-motion-theme',
  theme: './src/index',
  htmlTemplate: './src/static/template.html',
  devServerConfig: {},
  port: 4000,
  themeConfig: {
    home: '/',
    source: 'docs',
    title: 'motion theme',
    repository: 'https://github.com/sakitam-fdd/bisheng-motion-theme/edit/dev/',
    index: {
      banner: {
        title: 'Bisheng Motion Theme',
        introduce: 'A bisheng theme base on motion',
        content: '使用 Bisheng Motion Theme 可以让你快速构建基于基于 Bisheng 的文档展示网站。',
        more: {
          label: '了解更多',
          link: '/'
        },
        quickStart: {
          label: '快速开始',
          link: '/'
        }
      },
      introduce: {
        title: 'Bisheng Motion Theme',
        introduce: 'A bisheng theme base on motion',
        content: '使用 Bisheng Motion Theme 可以让你快速构建基于基于 Bisheng 的文档展示网站。',
        more: {
          label: '了解更多',
          link: '/'
        }
      },
      exhibition: {
        title: 'Bisheng Motion Theme',
        introduce: 'A bisheng theme base on motion',
        content: '不仅提供了 Api 的展示，也包含了解析后的示例的相关展示。',
        more: {
          label: '更多示例',
          link: '/'
        }
      }
    },
    header: {
      github: {
        user: 'sakitam-fdd',
        repo: 'bisheng-motion-theme',
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
      copyright: 'bisheng'
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
