import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';

const navs = [{ name: '示例', href: '/examples/', key: 'examples' }, { name: '起步', href: '/guide/index', key: 'guide' }, { name: 'API', href: '/api/index', key: 'api' }, { name: '插件', href: '/plugins/index', key: 'plugins' }];

class Header extends React.PureComponent {

  constructor(props) {
    super(props);

    this.getAnimData = phoneOpen => phoneOpen ? {
      phoneOpen: false,
      openAnim: { opacity: 0, delay: 300, duration: 400 },
      barAnim: [{ rotate: 0, y: 0, duration: 300 }, { opacity: 1, duration: 300 }, { rotate: 0, y: 0, duration: 300 }]
    } : {
      phoneOpen: true,
      openAnim: { opacity: 1, duration: 400 },
      barAnim: [{ rotate: 45, y: 6, duration: 300 }, { opacity: 0, duration: 300 }, { rotate: -45, y: -6, duration: 300 }]
    };

    this.phoneClick = (e, phoneOpen, href, isLogo) => {
      if (!this.props.isMobile || isLogo && !phoneOpen) {
        return;
      }
      if (href) {
        e.preventDefault();
        setTimeout(() => {
          this.context.router.push({
            pathname: href
          });
        }, 600);
      }
      this.setState(this.getAnimData(phoneOpen));
    };

    this.state = {
      openAnim: null,
      phoneOpen: false,
      barAnim: []
    };

    this.icon = '';
  }

  render() {
    const navToRender = navs.map(item => {
      const className = this.props.activeKey === item.key ? 'active' : '';
      if (item.open) {
        return React.createElement(
          'li',
          { key: item.key },
          React.createElement(
            'a',
            { href: item.href, target: '_blank' },
            item.name
          )
        );
      }
      return React.createElement(
        'li',
        { key: item.key },
        React.createElement(
          Link,
          {
            to: item.href,
            className: className,
            disabled: item.disabled,
            onClick: e => {
              this.phoneClick(e, this.state.phoneOpen, item.href);
            } },
          item.name
        )
      );
    });
    return React.createElement(
      'header',
      {
        className: `${this.props.className}-wrapper${this.state.phoneOpen ? ' open' : ''}` },
      React.createElement(
        'div',
        { className: this.props.className },
        React.createElement(
          TweenOne,
          {
            className: `${this.props.className}-logo`,
            animation: { opacity: 0, type: 'from' } },
          React.createElement(
            Link,
            {
              to: '/',
              key: 'logo',
              onClick: e => {
                this.phoneClick(e, this.state.phoneOpen, '/', true);
              } },
            React.createElement('img', { height: '24', src: this.icon })
          )
        ),
        React.createElement(
          'span',
          { className: 'git-but' },
          React.createElement('iframe', {
            src: 'https://ghbtns.com/github-btn.html?user=sakitam-fdd&repo=ol3Echarts&type=star&count=true',
            frameBorder: '0',
            scrolling: '0',
            width: '98px',
            height: '20px' })
        ),
        this.props.isMobile ? React.createElement(
          'div',
          { className: 'phone-nav' },
          React.createElement(
            'div',
            {
              className: 'phone-nav-bar',
              onClick: e => {
                this.phoneClick(e, this.state.phoneOpen);
              } },
            React.createElement(TweenOne, { component: 'em', animation: this.state.barAnim[0] }),
            React.createElement(TweenOne, { component: 'em', animation: this.state.barAnim[1] }),
            React.createElement(TweenOne, { component: 'em', animation: this.state.barAnim[2] })
          ),
          React.createElement(
            TweenOne,
            {
              className: 'phone-nav-text-wrapper',
              animation: this.state.openAnim,
              style: { pointerEvents: this.state.phoneOpen ? 'auto' : 'none' } },
            React.createElement(
              QueueAnim,
              {
                component: 'ul',
                duration: 150,
                interval: 50,
                delay: [200, 0],
                ease: ['easeOutQuad', 'easeInQuad'],
                type: 'bottom',
                leaveReverse: true },
              this.state.phoneOpen && navToRender
            )
          )
        ) : React.createElement(
          TweenOne,
          {
            component: 'nav',
            className: 'web-nav',
            animation: { opacity: 0, type: 'from' } },
          React.createElement(
            'ul',
            null,
            navToRender
          )
        )
      )
    );
  }
}

Header.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool,
  activeKey: PropTypes.any
};
Header.defaultProps = {
  className: 'header'
};
Header.contextTypes = {
  router: PropTypes.object.isRequired
};
export default Header;