import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import ScrollLink from 'rc-scroll-anim/lib/ScrollLink';
import { isObject, isEmpty } from '../utils';
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
    const { themeConfig } = this.props
    console.log(this.props)
    const banner = (themeConfig.index.banner &&
      isObject(themeConfig.index.banner) &&
      !isEmpty(themeConfig.index.banner)) ? themeConfig.index.banner : false
    return (
      <DocumentTitle title={themeConfig.title}>
        <div className="main-wrapper">
          <div className="nav-wrapper">
            <ScrollLink to="banner" showHeightActive={['100%', '30%']} toHash={false} />
            <ScrollLink to="introduce" showHeightActive="100%" toHash={false} />
          </div>
          {
            banner ? (<Banner
              title={banner.title}
              introduce={banner.introduce}
              content={banner.content}
              more={banner.more}
              quickStart={banner.quickStart}/>) : ({})
          }
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
