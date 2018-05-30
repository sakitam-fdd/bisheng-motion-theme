import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { enquireScreen } from 'enquire-js';

class Code extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = () => {
      this.setState({
        replay: true
      }, () => {
        this.setState({
          replay: false
        });
      });
    };

    this.codeClick = () => {
      this.setState({
        openCode: true
      });
    };

    this.codeCloseClick = () => {
      this.setState({
        openCode: false
      });
    };

    console.log(this.props);
    this.components = this.props.pageData;
    this.state = {
      code: this.props.utils.toReactComponent(this.components['examples']['demo'].index.highlightedCode),
      component: this.components['examples']['demo'].index.preview(React, ReactDom),
      replay: false,
      isMode: false,
      openCode: false
    };
  }

  componentDidMount() {
    enquireScreen(bool => {
      const isMode = bool;
      this.setState({ isMode });
    });
  }

  render() {
    return React.createElement(
      'div',
      { className: this.props.className },
      React.createElement(
        'div',
        { className: `${this.props.className}-top` },
        React.createElement('i', null),
        React.createElement('i', null),
        React.createElement('i', null)
      ),
      React.createElement(
        'div',
        { className: `${this.props.className}-left ${this.state.openCode ? 'code-open' : ''}` },
        this.state.code,
        this.state.isMode && React.createElement(
          'div',
          { className: `${this.props.className}-close`, onClick: this.codeCloseClick },
          React.createElement(Icon, { type: 'close' })
        )
      ),
      React.createElement(
        'div',
        { className: `${this.props.className}-right` },
        this.state.replay ? null : this.state.component,
        React.createElement(
          'div',
          { className: 'replay-button' },
          React.createElement('i', { onClick: this.onClick })
        )
      ),
      this.state.isMode && React.createElement(
        'div',
        { className: `${this.props.className}-icon`, onClick: this.codeClick },
        React.createElement(Icon, { type: 'code-o' })
      )
    );
  }
}

Code.propTypes = {
  className: PropTypes.string,
  pageData: PropTypes.object,
  utils: PropTypes.any
};
Code.defaultProps = {
  className: 'code'
};
export default Code;