import React from 'react';
import { Affix } from 'antd';
import {getChildren} from 'jsonml.js/lib/utils';
import DocumentTitle from 'react-document-title';
import EditButton from '../components/EditButton';

class Guide extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  render () {
    const {pageData, themeConfig} = this.props;
    const {meta, content, toc, api} = pageData;
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
          {
            (!toc || toc.length <= 1 || meta.toc === false) ? null :
              <Affix className="toc-affix" offsetTop={16}>
                {
                  this.props.utils.toReactComponent(
                    ['ul', { className: 'toc' }].concat(getChildren(toc))
                  )
                }
              </Affix>
          }
          {!content ? null :
            this.props.utils.toReactComponent(['section', {className: 'markdown'}]
              .concat(getChildren(content)))}
          {api ? this.props.utils.toReactComponent(api) : null}
        </article>
      </DocumentTitle>
    );
  }
}

export default Guide;

