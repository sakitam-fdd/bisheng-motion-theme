import React from 'react';
import { Row, Col } from 'antd';

function Footer() {
  return React.createElement(
    'footer',
    { id: 'footer', className: 'dark' },
    React.createElement(
      'div',
      { className: 'footer-wrap' },
      React.createElement(
        Row,
        null,
        React.createElement(
          Col,
          { md: 6, sm: 24, xs: 24 },
          React.createElement('div', { className: 'footer-center' })
        ),
        React.createElement(
          Col,
          { md: 6, sm: 24, xs: 24 },
          React.createElement('div', { className: 'footer-center' })
        ),
        React.createElement(
          Col,
          { md: 6, sm: 24, xs: 24 },
          React.createElement('div', { className: 'footer-center' })
        ),
        React.createElement(
          Col,
          { md: 6, sm: 24, xs: 24 },
          React.createElement(
            'div',
            { className: 'footer-center' },
            React.createElement('h2', null),
            React.createElement('div', null),
            React.createElement('div', null)
          )
        )
      )
    ),
    React.createElement(
      Row,
      { className: 'bottom-bar' },
      React.createElement(
        Col,
        { md: 24, sm: 24, style: { textAlign: 'center' } },
        React.createElement(
          'span',
          { style: { textAlign: 'center' } },
          'Copyright \xA9 XXXXXX'
        )
      )
    )
  );
}

export default Footer;