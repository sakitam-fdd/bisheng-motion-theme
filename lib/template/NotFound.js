import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Layout, Button } from 'antd';
const { Header, Footer, Content } = Layout;
import logo from '../static/images/500.gif';
class NotFound extends React.Component {
  render() {
    return React.createElement(
      Layout,
      { className: 'status-content' },
      React.createElement(Header, null),
      React.createElement(
        Content,
        null,
        React.createElement('img', { src: logo, alt: '' }),
        React.createElement(
          Button,
          { type: 'primary' },
          React.createElement(
            Link,
            { to: '/' },
            '\u8FD4\u56DE\u9996\u9875'
          )
        )
      ),
      React.createElement(Footer, null)
    );
  }
}

NotFound.propTypes = {
  className: PropTypes.string
};

export default NotFound;