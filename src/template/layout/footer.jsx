import React from 'react';
import { Row, Col } from 'antd';

function Footer() {
  return (
    <footer id="footer" className="dark">
      <Row className="bottom-bar">
        <Col md={24} sm={24} style={{ textAlign: 'center' }}>
          <span style={{ textAlign: 'center' }}>Copyright © XXXXXX</span>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;
