var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import PropTypes from 'prop-types';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';

import { Link } from 'react-router';

class Exhibition extends React.Component {

  render() {
    const { pageData, exhibition, utils } = this.props;
    const examples = pageData['examples']['demo'];
    const demoToChildren = Object.keys(examples).map(key => examples[key]).sort((a, b) => b.meta.order - a.meta.order).filter((key, i) => i < 6).map(item => {
      const img = item.meta.image;
      const link = item.meta.filename.replace(/(\/index)|(.md)/g, '');
      const title = item.meta.chinese || item.meta.english;
      const content = utils.toReactComponent(item.description);
      return React.createElement(
        'li',
        { key: link },
        React.createElement(
          Link,
          { to: link, onClick: this.props.onButtonClick },
          React.createElement(
            'div',
            { className: 'home-anim-demo-img' },
            React.createElement('img', { src: img, width: '100%' })
          ),
          React.createElement(
            'h2',
            null,
            title
          ),
          React.createElement(
            'div',
            { className: 'home-anim-demo-text' },
            content
          )
        )
      );
    });

    return React.createElement(
      'div',
      { className: 'main-page-wrapper exhibition' },
      React.createElement(
        OverPack,
        {
          className: 'page',
          playScale: 0.6,
          id: 'exhibition' },
        React.createElement(
          QueueAnim,
          {
            className: 'page-text',
            key: 'text',
            type: 'bottom',
            leaveReverse: true,
            delay: [0, 100] },
          React.createElement(
            'h1',
            { key: 'h1' },
            exhibition.title
          ),
          React.createElement(
            'p',
            { key: 'p' },
            exhibition.content
          )
        ),
        React.createElement(
          TweenOne,
          {
            animation: _extends({ delay: 200 }, this.props.tweenAnim),
            key: 'img',
            className: 'home-anim-demo clearfix' },
          React.createElement(
            'ul',
            null,
            demoToChildren
          )
        ),
        React.createElement(
          TweenOne,
          {
            key: 'a',
            animation: _extends({ delay: 300 }, this.props.tweenAnim),
            className: 'home-button' },
          React.createElement(
            Link,
            { to: exhibition.more.link, onClick: this.props.onButtonClick },
            exhibition.more.label
          )
        )
      )
    );
  }
}

Exhibition.propTypes = {
  pageData: PropTypes.object,
  utils: PropTypes.object,
  tweenAnim: PropTypes.object,
  onButtonClick: PropTypes.func,
  exhibition: PropTypes.object
};
Exhibition.defaultProps = {
  pageData: {},
  utils: {},
  tweenAnim: {},
  onButtonClick: () => {},
  exhibition: {}
};
export default Exhibition;