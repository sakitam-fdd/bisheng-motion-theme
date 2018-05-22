import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import ScrollLink from 'rc-scroll-anim/lib/ScrollLink';
import Banner from './Banner';
import Introduce from './introduce';
import '../../static/style';

class Home extends React.Component {
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
    const {
      themeConfig,
    } = this.props
    console.log(this)
    return (
      <DocumentTitle title={themeConfig.sitename}>
        <div className="main-wrapper">
          <div className="nav-wrapper">
            <ScrollLink to="banner" showHeightActive={['100%', '30%']} toHash={false} />
            <ScrollLink to="Introduce" showHeightActive="30%" toHash={false} />
            <ScrollLink to="page2" showHeightActive={['30%', '70%']} toHash={false} />
            <ScrollLink to="page3" showHeightActive="70%" toHash={false} />
          </div>
          <Banner />
          <Introduce
            pageData={this.props.pageData}
            utils={this.props.utils}
            tweenAnim={this.tweenAnim}
            onButtonClick={this.scrollToTop}/>
        </div>
      </DocumentTitle>
    );
  }
}

export default Home;
