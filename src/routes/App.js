import React from 'react';
import enquire from 'enquire.js';
import { scrollScreen } from 'rc-scroll-anim';
import { connect } from 'dva';
import PropTypes from 'prop-types';

import Nav from './Home/Nav';
import Footer from './Home/Footer';
import './Home/less/antMotion_style.less';

class App extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    // location: PropTypes.object,
    // dispatch: PropTypes.func,
    // app: PropTypes.object,
    // loading: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      isMode: false,
    };
  }

  componentDidMount() {
    // 实现整屏滚动
    const docHeight = this.doc.getBoundingClientRect().height;
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
    return (
      <div className="templates-wrapper" ref={(doc) => { this.doc = doc; }} >
        <Nav id="nav_1_0" key="nav_1_0" isMode={this.state.isMode} />

        {this.props.children}
        <Footer id="footer_1_0" key="footer_1_0" isMode={this.state.isMode} />
      </div>
    );
  }
}
export default connect(({ app, loading }) => ({ app, loading: loading.models.app }))(App);
