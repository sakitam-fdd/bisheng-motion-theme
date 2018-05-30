import React from 'react';
import { Row, Col } from 'antd';

class Footer extends React.Component {
  render() {
    const { themeConfig } = this.props;
    return React.createElement(
      'footer',
      { id: 'footer', className: 'dark' },
      React.createElement(
        Row,
        { className: 'bottom-bar' },
        React.createElement(
          Col,
          { md: 24, sm: 24, style: { textAlign: 'center' } },
          React.createElement(
            'span',
            { style: { textAlign: 'center' } },
            'Copyright \xA9 ',
            themeConfig.footer.copyright
          )
        )
      )
    );
  }
}

export default Footer;