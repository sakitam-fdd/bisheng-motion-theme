import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';
import DocumentTitle from 'react-document-title';

class Details extends React.Component {

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

    this.state = {
      replay: false
    };
  }

  shouldComponentUpdate() {
    return this.state.replay;
  }

  render() {
    const props = this.props;
    const { pageData, themeConfig } = this.props;
    const className = this.props.className;
    const {
      meta, content, description,
      style, preview, highlightedCode, highlightedStyle
    } = pageData;
    const {
      title, subtitle, chinese, english
    } = meta;
    return React.createElement(
      DocumentTitle,
      { title: `${subtitle || chinese || ''} ${title || english} - ${themeConfig.title}` },
      React.createElement(
        'div',
        { className: 'page' },
        React.createElement(
          TweenOne,
          { animation: { y: 30, opacity: 0, type: 'from' }, className: 'page-wrapper' },
          React.createElement(
            'article',
            { className: `markdown ${className}` },
            React.createElement(
              'div',
              { className: `${className}-demo` },
              !this.state.replay && preview(React, ReactDOM)
            ),
            React.createElement(
              'div',
              { className: 'replay-button' },
              React.createElement('i', { onClick: this.onClick })
            ),
            React.createElement(
              'h1',
              null,
              title || english,
              !subtitle && !chinese ? null : React.createElement(
                'i',
                null,
                subtitle || chinese
              )
            ),
            props.utils.toReactComponent(description),
            !!content.length && props.utils.toReactComponent(['section'].concat(content)),
            React.createElement(
              'h2',
              null,
              '\u4EE3\u7801\u7247\u6BB5'
            ),
            !!style && React.createElement('style', { dangerouslySetInnerHTML: { __html: style } }),
            React.createElement(
              'h3',
              null,
              'jsx'
            ),
            !!highlightedCode.length && props.utils.toReactComponent(highlightedCode),
            highlightedStyle && React.createElement(
              'h3',
              null,
              'css'
            ),
            highlightedStyle && React.createElement(
              'pre',
              { className: 'css' },
              React.createElement('code', { dangerouslySetInnerHTML: { __html: highlightedStyle } })
            )
          )
        )
      )
    );
  }
}

Details.propTypes = {
  className: PropTypes.string,
  pageData: PropTypes.object
};
Details.defaultProps = {
  className: 'examples-details'
};
export default Details;