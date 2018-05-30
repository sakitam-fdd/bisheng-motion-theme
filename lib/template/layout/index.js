var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import TweenOne from 'rc-tween-one';
import { enquireScreen } from 'enquire-js';
import '../../static/style';
import Header from './header';
import Footer from './footer';

let isMobile = false;
enquireScreen(b => {
  isMobile = b;
});

class Index extends React.Component {

  constructor(props) {
    super(props);

    this.onChange = e => {
      if (e.type === 'enter') {
        const dom = ReactDOM.findDOMNode(this.content);
        Array.prototype.slice.call(dom.children).forEach(item => {
          const cItem = item;
          cItem.style.transform = 'none';
        });
      }
    };

    this.state = {
      isMobile
    };
  }

  getChildContext() {
    return {
      isMobile: this.state.isMobile
    };
  }

  componentDidMount() {
    enquireScreen(b => {
      this.setState({
        isMobile: !!b
      });
    });
  }

  render() {
    const _props = this.props,
          { children } = _props,
          restProps = _objectWithoutProperties(_props, ['children']);
    const path = this.props.location.pathname;
    const pathKey = path && path.split('/')[0];
    return React.createElement(
      'div',
      { id: 'react-root', className: !pathKey ? 'index' : '' },
      React.createElement(Header, _extends({ activeKey: pathKey }, restProps)),
      React.createElement(
        TweenOne.TweenOneGroup,
        {
          className: 'content-wrapper',
          onEnd: this.onChange,
          enter: { type: 'from', opacity: 0, ease: 'easeOutQuart' },
          leave: { opacity: 0, ease: 'easeInOutQuart' },
          ref: c => {
            this.content = c;
          } },
        children
      ),
      React.createElement(Footer, restProps)
    );
  }
}

Index.contextTypes = {
  router: PropTypes.object.isRequired
};
Index.childContextTypes = {
  isMobile: PropTypes.bool
};
export default Index;