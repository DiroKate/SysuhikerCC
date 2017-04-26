import React from 'react';
import ReactDOM from 'react-dom';
import enquire from 'enquire.js';
import { scrollScreen } from 'rc-scroll-anim';
import { connect } from 'dva';

import Nav from './Nav';
import Content0 from './Content0';
import Content1 from './Content1';
import Content2 from './Content2';
import Content3 from './Content3';
import Footer from './Footer';
import Point from './Point';

import './less/antMotion_style.less';

class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      isMode: false,
    };
  }

  componentDidMount() {
    // 实现整屏滚动
    const docHeight = ReactDOM.findDOMNode(this).getBoundingClientRect().height;
    scrollScreen.init({ docHeight });
    // 适配手机屏幕;
    this.enquireScreen((isMode) => {
      this.setState({ isMode });
    });
  }

  enquireScreen = (cb) => {
    /* eslint-disable no-unused-expressions */
    enquire.register('only screen and (min-width: 320px) and (max-width: 767px)', {
      match: () => {
        cb && cb(true);
      },
      unmatch: () => {
        cb && cb();
      },
    });
    /* eslint-enable no-unused-expressions */
  }

  render() {
    const { login } = this.props;
    console.log(login);
    const children = [
      <Nav id="nav_1_0" key="nav_1_0" isMode={this.state.isMode} />,
      <Content0 id="content_1_0" key="content_1_0" isMode={this.state.isMode} />,
      <Content1 id="content_2_0" key="content_2_0" isMode={this.state.isMode} />,
      <Content3 id="content_4_0" key="content_4_0" isMode={this.state.isMode} />,
      <Footer id="footer_1_0" key="footer_1_0" isMode={this.state.isMode} />,
      // 导航和页尾不进入锚点区，如果需要，自行添加;
      <Point key="list" ref={(c) => { this.list = c; }} data={['content_1_0', 'content_2_0', 'content_4_0']} />,
    ];
    return (
      <div className="templates-wrapper">
        {children}
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Home);
