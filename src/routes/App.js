import React from 'react';
import enquire from 'enquire.js';
// import { scrollScreen } from 'rc-scroll-anim';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { BackTop } from 'antd';

import Nav from './Home/Nav';
import Footer from './Home/Footer';
import './Home/less/antMotion_style.less';

class App extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    // location: PropTypes.object,
    // dispatch: PropTypes.func,
    users: PropTypes.object,
    // loading: PropTypes.bool,
  }

  componentDidMount() {
    // 实现整屏滚动
    // const docHeight = this.doc.getBoundingClientRect().height;
    // scrollScreen.init({ docHeight });
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
    const { users } = this.props;

    const navProps = {
      id: 'nav_1_0',
      key: 'nav_1_0',
      isMode: false,
    };

    const footerProps = {
      id: 'footer_1_0',
      key: 'footer_1',
      isMode: false,
    };

    return (
      <div className="templates-wrapper" ref={(doc) => { this.doc = doc; }} >
        <BackTop />
        <Nav {...navProps} users={users} />
        <div className="user-templates-wrapper">
          {this.props.children }
        </div>
        <Footer {...footerProps} />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

export default connect(mapStateToProps)(App);
