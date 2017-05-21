import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Layout, Breadcrumb } from 'antd';

import '../themes/index.less';
import Nav from '../components/layout/nav';

const { Header, Footer, Content } = Layout;

class App extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    // location: PropTypes.object,
    // dispatch: PropTypes.func,
    users: PropTypes.object,
    // loading: PropTypes.bool,
  }

  // componentDidMount() {
  //   // 实现整屏滚动
  //   const docHeight = this.doc.getBoundingClientRect().height;
  //   scrollScreen.init({ docHeight });
  //   // 适配手机屏幕;
  //   this.enquireScreen((isMode) => {
  //     this.setState({ isMode });
  //   });
  // }
  //
  // enquireScreen = (cb) => {
  //   /* eslint-disable no-unused-expressions */
  //   enquire.register('only screen and (min-width: 320px) and (max-width: 767px)', {
  //     match: () => {
  //       cb && cb(true);
  //     },
  //     unmatch: () => {
  //       cb && cb();
  //     },
  //   });
  //   /* eslint-enable no-unused-expressions */
  // }

  render() {
    const { users } = this.props;

    const navProps = {
      id: 'nav_1_0',
      key: 'nav_1_0',
      // isMode: false,
    };

    return (
      <Layout className="layout">
        <Header>
          <Nav {...navProps} users={users} />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '12px 0' }} />
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            {this.props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Copyright © 2017 The Project by <a href="/">SYSUHIKER</a>. All Rights Reserved
        </Footer>
      </Layout>
    );
  }
}


function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

export default connect(mapStateToProps)(App);
