import React from 'react';
import { getChildren } from 'jsonml.js/lib/utils';
import DocumentTitle from 'react-document-title';
import * as utils from '../utils';
import Page from '../components/Page';

class Guide extends React.Component {

  render() {
    const { pageData, themeConfig } = this.props;
    const { meta, content, toc, api } = pageData;
    const { title, subtitle, chinese, english } = meta;
    const tocItem = this.props.utils.toReactComponent(toc);
    const tocChildren = utils.toArrayChildren(tocItem.props.children).map(item => {
      const itemChildren = utils.toArrayChildren(item.props.children).map(cItem => React.cloneElement(cItem, {
        onClick: utils.scrollClick
      }));
      return React.cloneElement(item, item.props, itemChildren);
    });
    return React.createElement(
      Page,
      this.props,
      React.createElement(
        DocumentTitle,
        { title: `${title || chinese || english} - ${themeConfig.title}` },
        React.createElement(
          'article',
          { className: 'markdown' },
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
          !toc || toc.length <= 1 ? null : React.createElement(
            'section',
            { className: 'toc' },
            React.cloneElement(tocItem, tocItem.props, tocChildren)
          ),
          !content ? null : this.props.utils.toReactComponent(['section', { className: 'markdown' }].concat(getChildren(content))),
          api ? this.props.utils.toReactComponent(api) : null
        )
      )
    );
  }
}

Guide.propTypes = {};
Guide.defaultProps = {};
export default Guide;