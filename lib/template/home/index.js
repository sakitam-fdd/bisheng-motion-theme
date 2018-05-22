import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import ScrollLink from 'rc-scroll-anim/lib/ScrollLink';
import Banner from './Banner';
import '../../static/style';

class Home extends React.PureComponent {

  constructor(props) {
    super(props);
    this.tweenAnim = {
      y: 30, opacity: 0, type: 'from', ease: 'easeOutQuad'
    };
  }

  render() {
    return React.createElement(
      DocumentTitle,
      { title: '' },
      React.createElement(
        'div',
        { className: 'home-wrapper' },
        React.createElement(
          'div',
          { className: 'nav-wrapper' },
          React.createElement(ScrollLink, { to: 'banner', showHeightActive: ['100%', '30%'], toHash: false }),
          React.createElement(ScrollLink, { to: 'page1', showHeightActive: '30%', toHash: false }),
          React.createElement(ScrollLink, { to: 'page2', showHeightActive: ['30%', '70%'], toHash: false }),
          React.createElement(ScrollLink, { to: 'page3', showHeightActive: '70%', toHash: false })
        ),
        React.createElement(Banner, null)
      )
    );
  }
}

Home.propTypes = {
  pageData: PropTypes.object,
  utils: PropTypes.object
};
export default Home;