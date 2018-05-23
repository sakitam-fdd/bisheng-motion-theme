import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import TweenOne from 'rc-tween-one';
import { enquireScreen } from 'enquire-js';
import '../../static/style';
import Header from './header';
import Footer from './footer';

let isMobile = false;
enquireScreen((b) => {
  isMobile = b;
});

class Index extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static childContextTypes = {
    isMobile: PropTypes.bool,
  };

  constructor (props) {
    super(props);
    this.state = {
      isMobile
    };
  }

  getChildContext () {
    return {
      isMobile: this.state.isMobile,
    };
  }

  componentDidMount() {
    enquireScreen((b) => {
      this.setState({
        isMobile: !!b,
      });
    });
  }

  onChange = (e) => {
    if (e.type === 'enter') {
      const dom = ReactDOM.findDOMNode(this.content);
      Array.prototype.slice.call(dom.children).forEach((item) => {
        const cItem = item;
        cItem.style.transform = 'none';
      });
    }
  };

  render() {
    const { children, ...restProps } = this.props
    const path = this.props.location.pathname;
    const pathKey = path && path.split('/')[0];
    return (<div id="react-root" className={!pathKey ? 'index' : ''}>
      <Header {...restProps} />
      <TweenOne.TweenOneGroup
        className="content-wrapper"
        onEnd={this.onChange}
        enter={{ type: 'from', opacity: 0, ease: 'easeOutQuart' }}
        leave={{ opacity: 0, ease: 'easeInOutQuart' }}
        ref={(c) => { this.content = c; }}>
        {children}
      </TweenOne.TweenOneGroup>
      <Footer {...restProps} />
    </div>);
  }
}

export default Index;

