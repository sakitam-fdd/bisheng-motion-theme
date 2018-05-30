import React from 'react';
import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import ScrollElement from 'rc-scroll-anim/lib/ScrollElement';
import SvgMorphPlugin from 'rc-tween-one/lib/plugin/SvgMorphPlugin';
import { Link } from 'react-router';
import { Icon } from 'antd';

TweenOne.plugins.push(SvgMorphPlugin);

class Banner extends React.Component {

  render() {
    const {
      title,
      introduce,
      content,
      more,
      quickStart
    } = this.props;
    return React.createElement(
      ScrollElement,
      { id: 'banner', className: `${this.props.className}-wrapper` },
      React.createElement(
        'svg',
        { className: `${this.props.className}-bg-center`, width: '100%', viewBox: '0 0 1200 800' },
        React.createElement(TweenOne, {
          component: 'circle',
          fill: 'rgba(161,174,245,.15)',
          r: '130',
          cx: '350',
          cy: '350',
          animation: {
            y: 30, x: -10, repeat: -1, duration: 3000, yoyo: true
          }
        }),
        React.createElement(TweenOne, {
          component: 'circle',
          fill: 'rgba(120,172,254,.1)',
          r: '80',
          cx: '500',
          cy: '420',
          animation: {
            y: -30, x: 10, repeat: -1, duration: 3000, yoyo: true
          }
        })
      ),
      React.createElement(
        'div',
        { className: this.props.className },
        React.createElement('div', { className: `${this.props.className}-demo` }),
        React.createElement(
          QueueAnim,
          {
            type: 'bottom',
            className: `${this.props.className}-text`,
            delay: 300 },
          React.createElement(
            'h1',
            { key: 'h1' },
            title
          ),
          React.createElement(
            'h3',
            { key: 'h3' },
            introduce
          ),
          React.createElement(
            'p',
            { key: 'p' },
            content
          ),
          React.createElement(
            'div',
            { key: 'button', className: `${this.props.className}-button` },
            React.createElement(
              Link,
              { to: more.link, className: `${this.props.className}-text-button` },
              more.label,
              React.createElement('i', null)
            ),
            React.createElement(
              Link,
              { to: quickStart.link, className: `${this.props.className}-text-button` },
              quickStart.label,
              React.createElement('i', null)
            )
          )
        ),
        React.createElement(
          TweenOne,
          {
            animation: { opacity: 0, type: 'from', delay: 400 },
            className: `${this.props.className}-down-wrapper` },
          React.createElement(
            'div',
            { key: 'down', className: `${this.props.className}-down` },
            React.createElement(
              TweenOne,
              { animation: {
                  y: 5, yoyo: true, repeat: -1, duration: 900
                } },
              React.createElement(Icon, { type: 'down-circle-o' })
            )
          ),
          React.createElement(
            'div',
            {
              className: `${this.props.className}-mouse`,
              key: 'mouse' },
            React.createElement(TweenOne, {
              className: 'mouse-bar',
              animation: {
                y: 5, yoyo: true, repeat: -1, duration: 900
              }
            })
          )
        )
      )
    );
  }
}

Banner.propTypes = {
  className: PropTypes.string
};
Banner.defaultProps = {
  className: 'banner'
};
export default Banner;