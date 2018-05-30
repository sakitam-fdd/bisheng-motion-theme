import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Layout, Button } from 'antd';
const { Header, Footer, Content } = Layout;
import logo from '../static/images/404.svg';
class NotFound extends React.Component {
  render() {
    return React.createElement(
      'div',
      { className: 'page-404 status-content' },
      React.createElement(
        'section',
        null,
        React.createElement(
          'p',
          null,
          React.createElement('img', { src: logo, alt: '' })
        ),
        React.createElement(
          'h1',
          { className: 'page-404-title' },
          '404 ',
          React.createElement(
            'span',
            null,
            '\u4F60\u8981\u627E\u7684\u9875\u9762\u4E0D\u5B58\u5728'
          )
        ),
        React.createElement(
          'p',
          { className: 'page-404-message' },
          React.createElement(
            Button,
            { type: 'primary' },
            React.createElement(
              Link,
              { to: '/' },
              '\u8FD4\u56DE\u9996\u9875'
            )
          )
        )
      ),
      React.createElement('style', {
        dangerouslySetInnerHTML: {
          __html: '#react-content { height: 100%; background-color: #fff }'
        }
      })
    );
  }
}

NotFound.propTypes = {
  className: PropTypes.string
};

export default NotFound;