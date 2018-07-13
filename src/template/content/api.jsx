import React from 'react';
import EditButton from '../components/EditButton';
import {getChildren} from 'jsonml.js/lib/utils';
import DocumentTitle from 'react-document-title';

class Api extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  render () {
    const {pageData, themeConfig} = this.props;
    const {meta, content, api} = pageData;
    const {title, subtitle, chinese, english, filename} = meta;
    return (
      <DocumentTitle title={`${title || chinese || english} - ${themeConfig.title}`}>
        <article className="markdown">
          <h1>
            {title || english}
            {(!subtitle && !chinese) ? null : <i>{subtitle || chinese}</i>}
            <EditButton
              title={title}
              filename={filename}
              themeConfig={themeConfig}/>
          </h1>
          {!content ? null :
            this.props.utils.toReactComponent(['section', {className: 'markdown'}]
              .concat(getChildren(content)))}
          {api ? this.props.utils.toReactComponent(api) : null}
        </article>
      </DocumentTitle>
    );
  }
}

export default Api;

