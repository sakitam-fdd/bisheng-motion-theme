---
order: 0
chinese: 单点运动
index: true
english: index
---

测试

```__react
import React from 'react';
import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';

class EaseExplain extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    leftHide: PropTypes.bool,
    rightHide: PropTypes.bool,
    title: PropTypes.string,
    circleStyle: PropTypes.object,
    animation: PropTypes.object,
    children: PropTypes.any,
  };

  static defaultProps = {
    className: 'content',
  };

  constructor(props) {
    super(props);
    this.state = {
      animation: this.props.animation,
      circleStyle: this.props.circleStyle,
      paused: true,
    };
  }

  mouseOver = () => {
    const paused = false;
    this.setState({
      paused,
    });
  }

  mouseOut = () => {
    const paused = true;
    this.setState({
      paused,
    });
  }

  render() {
    const lineWidth = 40 * (((this.props.leftHide && 1) || 0) + ((this.props.rightHide && 1) || 0));
    return (
      <div className={`${this.props.className}-wrapper`}>
        <h3>{this.props.title}</h3>
        <div
          className={this.props.className}
          onMouseEnter={this.mouseOver}
          onMouseLeave={this.mouseOut}
          onTouchStart={this.mouseOver}
          onTouchEnd={this.mouseOut}
        >
          <div className="demo-wrapper">
            {this.props.leftHide ? null : <div className="circle-dashed" style={{ left: 0 }} />}
            <TweenOne
              className="circle"
              animation={this.state.animation}
              style={this.state.circleStyle}
              paused={this.state.paused}
            />
            <div className="east">
              <i
                className="line"
                style={{
                  width: `calc(100% - ${120 - lineWidth}px)`,
                  left: 60 - ((this.props.leftHide && 40) || 0),
                }}
              />
              <i className="arrow" style={{ right: 60 - ((this.props.rightHide && 40) || 0) }} />
            </div>
            {this.props.rightHide ? null : <div className="circle-dashed" />}
          </div>
          <p className="text-center">
            {this.props.children}
          </p>
        </div>
      </div>);
  }
}

ReactDOM.render(<EaseExplain
  animation={{
    left: 410, duration: 1000, repeat: -1,
    yoyo: true, repeatDelay: 500, ease: 'easeInOutCubic',
  }}
  title="1.单物体可视范围内点到点之间的运动">
  单物体可视范围内点到点之间的运动，采用的是
  <span className="text-highlight"> ease-in-out </span>
</EaseExplain>, mountNode);
```
