'use strict';

const Guide = './template/content/guide';
module.exports = {
  home: '/',
  plugins: ['bisheng-plugin-description', 'bisheng-plugin-toc?maxDepth=2', 'bisheng-plugin-react?lang=__react', 'bisheng-plugin-antd'],
  routes: {
    path: '/',
    component: './template/layout/index',
    indexRoute: {
      component: './template/home/index'
    },
    childRoutes: [{
      path: '/guide/:contentName',
      component: Guide
    }]
  }
};