var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import PropTypes from 'prop-types';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Link } from 'react-router';
import Code from '../components/Code';

class Introduce extends React.Component {

  render() {
    const {
      title,
      introduce,
      content,
      more
    } = this.props;
    return React.createElement(
      'div',
      { className: 'main-page-wrapper introduce' },
      React.createElement(
        OverPack,
        {
          playScale: 0.6,
          className: 'page vh',
          id: 'introduce' },
        React.createElement(
          QueueAnim,
          { className: 'page-text', key: 'text', type: 'bottom', leaveReverse: true, delay: 100 },
          React.createElement(
            'h1',
            { key: 'h1' },
            title
          ),
          React.createElement(
            'p',
            { key: 'p' },
            introduce
          )
        ),
        React.createElement(
          TweenOne,
          {
            className: 'code-wrapper',
            animation: _extends({}, this.props.tweenAnim, { delay: 200 }),
            key: 'code' },
          React.createElement(Code, { className: 'code', pageData: this.props.pageData, utils: this.props.utils })
        ),
        React.createElement(
          TweenOne,
          {
            key: 'a',
            className: 'home-button',
            animation: _extends({}, this.props.tweenAnim, { delay: 300 }) },
          React.createElement(
            Link,
            { to: more.link, onClick: this.props.onButtonClick },
            more.label
          )
        )
      )
    );
  }
}

Introduce.propTypes = {
  pageData: PropTypes.object,
  utils: PropTypes.object,
  tweenAnim: PropTypes.object,
  onButtonClick: PropTypes.func,
  title: PropTypes.string,
  introduce: PropTypes.string,
  content: PropTypes.string,
  more: PropTypes.object
};
Introduce.defaultProps = {
  pageData: {},
  utils: {},
  tweenAnim: {},
  onButtonClick: () => {}
};
export default Introduce;