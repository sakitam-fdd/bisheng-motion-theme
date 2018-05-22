import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import ScrollLink from 'rc-scroll-anim/lib/ScrollLink';
import Banner from './Banner';
import '../../static/style';

class Home extends React.PureComponent {
  static propTypes = {
    pageData: PropTypes.object,
    utils: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.tweenAnim = {
      y: 30, opacity: 0, type: 'from', ease: 'easeOutQuad',
    };
  }

  render() {
    return (
      <DocumentTitle title="">
        <div className="home-wrapper">
          <div className="nav-wrapper">
            <ScrollLink to="banner" showHeightActive={['100%', '30%']} toHash={false} />
            <ScrollLink to="page1" showHeightActive="30%" toHash={false} />
            <ScrollLink to="page2" showHeightActive={['30%', '70%']} toHash={false} />
            <ScrollLink to="page3" showHeightActive="70%" toHash={false} />
          </div>
          <Banner />
        </div>
      </DocumentTitle>
    );
  }
}

export default Home;
