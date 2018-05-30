import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import ScrollLink from 'rc-scroll-anim/lib/ScrollLink';
import { isObject, isEmpty, scrollTo } from '../utils';
import Banner from './Banner';
import Introduce from './introduce';
import Exhibition from './exhibition';
import '../../static/style';

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.scrollToTop = () => {
      scrollTo(0);
    };

    this.tweenAnim = {
      y: 30, opacity: 0, type: 'from', ease: 'easeOutQuad'
    };
  }

  render() {
    const { themeConfig } = this.props;
    const banner = themeConfig.index.banner && isObject(themeConfig.index.banner) && !isEmpty(themeConfig.index.banner) ? themeConfig.index.banner : false;
    const introduce = themeConfig.index.introduce && isObject(themeConfig.index.introduce) && !isEmpty(themeConfig.index.introduce) ? themeConfig.index.introduce : false;
    const exhibition = themeConfig.index.exhibition && isObject(themeConfig.index.exhibition) && !isEmpty(themeConfig.index.exhibition) ? themeConfig.index.exhibition : false;
    return React.createElement(
      DocumentTitle,
      { title: themeConfig.title },
      React.createElement(
        'div',
        { className: 'main-wrapper' },
        React.createElement(
          'div',
          { className: 'nav-wrapper' },
          React.createElement(ScrollLink, { to: 'banner', showHeightActive: ['100%', '30%'], toHash: false }),
          React.createElement(ScrollLink, { to: 'introduce', showHeightActive: '40%', toHash: false }),
          React.createElement(ScrollLink, { to: 'exhibition', showHeightActive: ['40%', '100%'], toHash: false })
        ),
        banner ? React.createElement(Banner, {
          title: banner.title,
          introduce: banner.introduce,
          content: banner.content,
          more: banner.more,
          quickStart: banner.quickStart }) : {},
        introduce ? React.createElement(Introduce, {
          pageData: this.props.pageData,
          utils: this.props.utils,
          tweenAnim: this.tweenAnim,
          onButtonClick: this.scrollToTop,
          title: banner.title,
          introduce: banner.introduce,
          content: banner.content,
          more: banner.more }) : {},
        exhibition ? React.createElement(Exhibition, {
          pageData: this.props.pageData,
          utils: this.props.utils,
          tweenAnim: this.tweenAnim,
          exhibition: exhibition,
          onButtonClick: this.scrollToTop }) : {}
      )
    );
  }
}

Home.propTypes = {
  pageData: PropTypes.object,
  utils: PropTypes.object
};
export default Home;