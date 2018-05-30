import React from 'react';
import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';

class Examples extends React.Component {

  render() {
    const { pageData, themeConfig } = this.props;
    const demo = pageData.demo;
    const source = themeConfig.source;
    console.log(this);
    const listChildren = Object.keys(demo).map(key => demo[key]).sort((a, b) => b.meta.order - a.meta.order).map(item => {
      const img = item.meta.image;
      const _link = item.meta.filename.replace(new RegExp(source), '');
      const link = _link.replace(/(\/index\.md)/g, '/index');
      const title = item.meta.chinese || item.meta.english;
      return React.createElement(
        'li',
        { key: link },
        React.createElement(
          Link,
          { to: link },
          React.createElement('img', { src: img, width: '100%' })
        ),
        React.createElement(
          'h3',
          null,
          title
        )
      );
    });
    return React.createElement(
      'div',
      { className: 'page' },
      React.createElement(
        'div',
        { className: 'page-wrapper' },
        React.createElement(
          TweenOne,
          {
            className: this.props.className,
            component: 'ul',
            animation: { y: 30, type: 'from', opacity: 0 } },
          listChildren
        )
      ),
      React.createElement(DocumentTitle, { title: `示例 - ${themeConfig.title}` })
    );
  }
}

Examples.propTypes = {
  className: PropTypes.string,
  pageData: PropTypes.object
};
Examples.defaultProps = {
  className: 'examples-list'
};
export default Examples;