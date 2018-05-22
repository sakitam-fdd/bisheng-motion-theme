import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import TweenOne from 'rc-tween-one';
import { enquireScreen } from 'enquire-js';
import '../../static/style';
import Header from './header';
import Footer from './footer';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

class Index extends React.PureComponent {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      isMobile
    }, this.onChange = e => {
      if (e.type === 'enter') {
        const dom = ReactDOM.findDOMNode(this.content);
        Array.prototype.slice.call(dom.children).forEach(item => {
          const cItem = item;
          cItem.style.transform = 'none';
        });
      }
    }, _temp;
  }

  componentDidMount() {
    enquireScreen(b => {
      this.setState({
        isMobile: !!b
      });
    });
  }

  render() {
    const path = this.props.location.pathname;
    const pathKey = path && path.split('/')[0];
    const key = !pathKey ? 'index' : 'page';
    const children = !pathKey || pathKey === 'exhibition' ? React.cloneElement(this.props.children, {
      key: pathKey ? path : key
    }) : React.createElement(
      Page,
      {
        key: key,
        pathname: this.props.location.pathname,
        pageData: this.props.pageData,
        hash: this.props.location.hash,
        isMobile: this.state.isMobile },
      this.props.children
    );
    return React.createElement(
      'div',
      { id: 'react-root', className: !pathKey ? 'home' : '' },
      React.createElement(Header, { activeKey: pathKey, isMobile: this.state.isMobile }),
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
      React.createElement(Footer, null)
    );
  }
}

Index.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
  pageData: PropTypes.any
};
export default Index;