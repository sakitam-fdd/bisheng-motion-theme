import React from 'react';
import PropTypes from 'prop-types';
import {TweenOneGroup} from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import {Link} from 'react-router';
import {Affix} from 'antd';
import MobileMenu from 'rc-drawer-menu';
import {scrollClick} from '../utils';

class Page extends React.PureComponent {
  static propTypes = {
    pageData: PropTypes.object
  };

  static defaultProps = {
    className: 'page'
  };

  constructor (props) {
    super(props);
    this.state = {
      isHash: false,
    };
  }

  componentDidMount () {
    this.componentDidUpdate();
    this.enter = true;
  }

  componentDidUpdate () {
    this.hash = null;
    this.state.isHash = false;
    this.componentWillUnmount();
  }

  componentWillUnmount () {
    this.hash = null;
    if (window.addEventListener) {
      window.removeEventListener('scroll', this.onScroll);
    } else {
      window.detachEvent('onscroll', this.onScroll);
    }
  }

  calcMinHeight () {
    return {
      minHeight: `${window.document.body.clientHeight - 130}px`
    }
  }

  onScroll = () => {
    if (this.hash !== window.location.hash) {
      this.hash = window.location.hash;
      this.setState({
        isHash: true,
      });
    }
  };

  getModuleData = (pageData) => {
    if (!pageData) {
      return null;
    }
    const moduleData = {};
    Object.keys(pageData).forEach((key) => {
      const children = Object.keys(pageData[key]).map(cKey =>
        pageData[key][cKey].index || pageData[key][cKey]);
      moduleData[key] = children;
    });
    return moduleData;
  };

  getMenuItems (moduleData, pathNames) {
    if (!moduleData) {
      return null;
    }
    const {themeConfig} = this.props;
    const source = themeConfig.source;
    const splicingListArr = [];
    const children = moduleData.concat(splicingListArr).filter(item => !item.meta.hidden)
      .sort((a, b) => a.meta.order - b.meta.order);
    return children.map((item, i) => {
      const meta = item.meta;
      const _link = meta.filename.replace(new RegExp(source), '');
      const link = _link.replace(/(\.md)/g, '');
      const path = Array.isArray(pathNames) ? pathNames.join('/') : pathNames.replace('#', '');
      const hash = this.state.isHash && this.hash.replace('#', '');
      const className = hash === meta.id || path === link || `/${path}` === link ||
      (!hash && ((!path && i === 0) || path === meta.id)) ? 'active' : '';
      let linkToChildren = link.split('/')[1] === pathNames[1] ?
        (<a>
          <span>{meta.chinese || meta.english}</span>
        </a>) :
        (<Link to={link}>
          <span>{meta.chinese || meta.english}</span>
        </Link>);
      return (<li
        key={meta.english || meta.chinese || meta.id}
        className={className}
        disabled={meta.disabled}>
        {linkToChildren}
      </li>);
    });
  }

  getListChildren = (moduleData, pathNames, pathKey, isMobile) => {
    const {themeConfig} = this.props;
    const _title = themeConfig.header.nav.filter(_item => _item['key'] === pathKey)
    const listToRender = moduleData && this.getMenuItems(moduleData[pathNames[0]], pathNames);
    return (!isMobile ? (listToRender && (
        <Affix offsetTop={60} key="list" className="nav-list-wrapper">
          <QueueAnim
            type={['bottom', 'top']}
            duration={450}
            ease="easeInOutQuad"
            className="nav-list">
            {
              _title && _title.length > 0 ? (
                <h2 key={`${pathKey}-title`}>
                  {_title[0]['name']}
                </h2>
              ) : ({})
            }
            <ul key={pathKey}>
              {listToRender}
            </ul>
          </QueueAnim>
        </Affix>)) :
      (<MobileMenu width="180px">
          <div className="nav-list-wrapper">
            <div className="nav-list">
              {
                _title && _title.length > 0 ? (
                  <h2 key={`${pathKey}-title`}>
                    {_title[0]['name']}
                  </h2>
                ) : ({})
              }
              <ul>
                {listToRender}
              </ul>
            </div>
          </div>
        </MobileMenu>
      ));
  };

  cScrollClick = (e) => {
    e.preventDefault();
    scrollClick(e);
  };

  render () {
    const {className, location, data, children, isMobile} = this.props;
    const pathNames = location.pathname && location.pathname.split('/');
    const pathKey = pathNames && pathNames.length > 0 && pathNames[0];
    const moduleData = this.getModuleData(data, pathNames);
    const listToRender = this.getListChildren(moduleData, pathNames, pathKey, isMobile);
    return (<div className={className} style={this.calcMinHeight()}>
      <TweenOneGroup
        enter={{
          y: 30,
          type: 'from',
          opacity: 0,
          onComplete: (e) => {
            const {target} = {...e};
            target.style.cssText = '';
          },
        }}
        leave={{y: -30, opacity: 0}}
        className={`${className}-wrapper`}>
        {listToRender}
        <section key="content">
          <TweenOneGroup
            enter={{y: 30, type: 'from', opacity: 0}}
            leave={{y: -30, opacity: 0}}
            className={`${className}-content`}
            style={{minHeight: this.state.minHeight}}>
            <div>{children}</div>
          </TweenOneGroup>
        </section>
      </TweenOneGroup>
    </div>);
  }
}

export default Page;
