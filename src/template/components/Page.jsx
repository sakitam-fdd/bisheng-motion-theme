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
    className: PropTypes.string,
    pathname: PropTypes.string,
    isMobile: PropTypes.bool,
    pageData: PropTypes.any,
    hash: PropTypes.any,
    children: PropTypes.any,
  };

  static defaultProps = {
    className: 'page',
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
    const props = this.props;
    const pathNames = props.pathname.split('/');
    const isComponent = pathNames[0] === 'components';
    if (isComponent) {
      if (window.addEventListener) {
        window.addEventListener('scroll', this.onScroll);
      } else {
        window.attachEvent('onscroll', this.onScroll);
      }
    } else {
      this.componentWillUnmount();
    }
  }

  componentWillUnmount () {
    this.hash = null;
    if (window.addEventListener) {
      window.removeEventListener('scroll', this.onScroll);
    } else {
      window.detachEvent('onscroll', this.onScroll);
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

  getMenuItems (moduleData, pathNames, isComponent, isNav) {
    if (!moduleData) {
      return null;
    }
    const splicingListArr = [];
    if (pathNames[0] === 'guide') {
    }
    const children = moduleData.concat(splicingListArr).filter(item => !item.meta.hidden)
      .sort((a, b) => a.meta.order - b.meta.order);
    return children.map((item, i) => {
      const meta = item.meta;
      let link = meta.filename.replace(/(.md)/g, '');
      const path = Array.isArray(pathNames) ? pathNames.join('/') : pathNames.replace('#', '');
      const hash = this.state.isHash && this.hash.replace('#', '');
      const className = hash === meta.id || path === link ||
      (!hash && ((!path && i === 0) || path === meta.id)) ? 'active' : '';
      let linkToChildren = link.split('/')[1] === pathNames[1] ?
        (<a>
          {isNav ? meta.chinese : <span>{meta.chinese || meta.english}</span>}
        </a>) :
        (<Link to={link}>
          {isNav ? meta.chinese : <span>{meta.chinese || meta.english}</span>}
        </Link>);
      linkToChildren = isComponent ?
        (<a href={`#${meta.id}`} onClick={this.cScrollClick}>
          {meta.title}
        </a>) : linkToChildren;
      return (<li
        key={meta.english || meta.chinese || meta.id}
        className={className}
        disabled={meta.disabled}
        style={isNav ? {width: `${100 / children.length}%`} : null}>
        {linkToChildren}
      </li>);
    });
  }

  getTransitionEnd = () => {
    const transEndEventNames = {
      transition: 'transitionend',
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
    };
    return Object.keys(transEndEventNames).map((name) => {
      if (typeof document.body.style[name] === 'string') {
        return transEndEventNames[name];
      }
      return null;
    }).filter(item => item)[0];
  };

  getListChildren = (cPathNames, cModuleData, isPlugins) => {
    const {
      isMobile, pageData, hash, pathname,
    } = this.props;
    const pathNames = cPathNames;
    const isApi = pathNames[0] === 'api';
    const componentBool = isPlugins && !isMobile;

    const moduleData = componentBool ?
      this.getModuleData(pageData[pathNames[0]][pathNames[1]]) :
      cModuleData;

    const listToRender = moduleData && this.getMenuItems(
      componentBool ?
        moduleData.demo : moduleData[pathNames[0]],
      componentBool ? hash : pathNames, componentBool
    );

    const listKey = pathNames[0] === 'plugins' && !pathname.match('api') ?
      pathname : pathNames[0];
    return (!isMobile ? (listToRender && (<Affix offsetTop={60} key="list" className="nav-list-wrapper">
        <QueueAnim
          type={['bottom', 'top']}
          duration={450}
          ease="easeInOutQuad"
          className="nav-list">
          <h2 key={`${pathname.split('/')[0]}-title`}>
            {title[pathNames[0]]}
          </h2>
          <ul key={listKey}>
            {listToRender}
          </ul>
        </QueueAnim>
      </Affix>)) :
      (<MobileMenu width="180px">
          <div className="nav-list-wrapper">
            <div className="nav-list">
              <h2 key={`${pathname.split('/')[0]}-title`}>
                {isApi ? 'API' : title[pathNames[0]]}
              </h2>
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
    const {
      className, pathname, isMobile, pageData, children,
    } = this.props;
    const pathNames = pathname.split('/');
    const moduleData = this.getModuleData(pageData);
    const navHeaderRender = null;
    // const navHeaderRender = isPlugins && !isMobile ?
    //   this.getMenuItems(moduleData[pathNames[0]], pathNames, false, true) : null;
    const listToRender = this.getListChildren(pathNames, moduleData, false);
    return (<div className={className}>
      {!isMobile && (<TweenOneGroup
        enter={{height: 0, type: 'from', ease: 'easeInOutCubic'}}
        leave={{height: 0, ease: 'easeInOutCubic'}}
        component="">
        {navHeaderRender && (<div key="nav" className={`${className}-nav`}>
          <ul>
            {navHeaderRender}
          </ul>
        </div>)}
      </TweenOneGroup>)}
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
            <div key={pathname}>{children}</div>
          </TweenOneGroup>
        </section>
      </TweenOneGroup>
    </div>);
  }
}

export default Page;
