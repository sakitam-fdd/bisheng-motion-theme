import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import DocumentTitle from 'react-document-title';

class Guide extends React.PureComponent {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.onScroll = () => {
      const tops = this.demoIds.map(item => {
        const dom = document.getElementById(item);
        let top = dom.getBoundingClientRect().top;
        if (top < 0) {
          top = -top;
        }
        return top;
      });
      const t = Math.min.apply(null, tops);
      const id = this.demoIds[tops.indexOf(t)];
      const link = `#${id}`;
      if (this.hash !== link) {
        history.pushState(null, window.title, `#${id}`);
        this.hash = link;
      }
    }, _temp;
  }

  componentDidMount() {
    const props = this.props;
    const { location } = props;
    this.hash = location.hash;
    if (window.addEventListener) {
      window.addEventListener('scroll', this.onScroll);
    } else {
      window.attachEvent('onscroll', this.onScroll);
    }
  }

  componentWillUnmount() {
    if (window.addEventListener) {
      window.removeEventListener('scroll', this.onScroll);
    } else {
      window.detachEvent('onscroll', this.onScroll);
    }
  }

  render() {
    const props = this.props;
    const { pageData } = props;
    const { meta, description } = pageData.index;
    const {
      title, subtitle, chinese, english
    } = meta;
    return React.createElement(
      DocumentTitle,
      { title: `${subtitle || chinese || ''} ${title || english}` },
      React.createElement(
        'article',
        { className: 'markdown' },
        React.createElement(
          'h1',
          null,
          title || english,
          React.createElement(
            'i',
            null,
            subtitle || chinese
          )
        )
      )
    );
  }
}

Guide.propTypes = {
  params: PropTypes.any
};

Guide.defaultProps = {};

export default Guide;