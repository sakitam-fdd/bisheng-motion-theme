'use strict';
const Guide = './template/content/guide';
const Api = './template/content/api';
const Plugins = './template/content/plugins';
const Examples = './template/content/examples';
const Details = './template/components/Details';
module.exports = {
  home: '/',
  plugins: [
    'bisheng-plugin-description',
    'bisheng-plugin-toc?maxDepth=2',
    'bisheng-plugin-react?lang=__react',
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
        path: '/examples',
        component: Examples
      },
      {
        path: '/examples/:contentName',
        component: Details
      }
    ]
  }
};
