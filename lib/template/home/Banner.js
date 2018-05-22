import React from 'react';
import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';
import ScrollElement from 'rc-scroll-anim/lib/ScrollElement';
import SvgMorphPlugin from 'rc-tween-one/lib/plugin/SvgMorphPlugin';

TweenOne.plugins.push(SvgMorphPlugin);

class Banner extends React.PureComponent {

  render() {
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