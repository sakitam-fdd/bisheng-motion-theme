import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import DocumentTitle from 'react-document-title';

class Guide extends React.PureComponent {
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

  onScroll = () => {
    const tops = this.demoIds.map((item) => {
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
      /* eslint-disable no-restricted-globals */
      history.pushState(null, window.title, `#${id}`);
      this.hash = link;
    }
  };

  render() {
    const props = this.props;
    const { pageData } = props;
    const { meta, description } = pageData.index;
    const {
      title, subtitle, chinese, english,
    } = meta;
    return (<DocumentTitle title={`${subtitle || chinese || ''} ${title || english}`}>
      <article className="markdown">
        <h1>{title || english}
          <i>{subtitle || chinese}</i>
        </h1>
      </article>
    </DocumentTitle>);
  }
}

Guide.propTypes = {
  params: PropTypes.any,
};

Guide.defaultProps = {};

export default Guide;
