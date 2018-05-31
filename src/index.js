'use strict';
const Guide = './template/content/guide';
const Api = './template/content/api';
const Plugins = './template/content/plugins';
const Examples = './template/content/examples';
const Details = './template/components/Details';
module.exports = {
  home: '',
  plugins: [
    'bisheng-plugin-description',
    'bisheng-plugin-toc?maxDepth=3',
    'bisheng-plugin-react?lang=jsx harmony',
    'bisheng-plugin-antd',
  ],
  routes: {
    path: '/',
    component: './template/layout/index',
    indexRoute: {
      component: './template/main/index'
    },
    childRoutes: [
      {
        path: '/guide/:contentName',
        component: Guide
      },
      {
        path: '/api/:contentName',
        component: Api
      },
      {
        path: '/plugins/:contentName',
        component: Plugins
      },
      {
        path: '/examples/',
        component: Examples
      },
      {
        path: '/examples/demo/:contentName',
        component: Details
      }
    ]
  }
};
