import React from 'react';
import { connect } from 'dva';
// import PropTypes from 'prop-types';
import { Layout, Breadcrumb } from 'antd';

import '../themes/index.less';
import Nav from '../components/layout/nav';

const { Header, Footer, Content } = Layout;
const BreadcrumbItem = Breadcrumb.Item;

class App extends React.Component {
  // static propTypes = {
  //   children: PropTypes.element.isRequired,
  //   // location: PropTypes.object,
  //   // dispatch: PropTypes.func,
  //   users: PropTypes.object,
  //   // loading: PropTypes.bool,
  // }

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
    // const { users } = this.props;

    return (
      <Layout className="layout">
        <Header>
          {/* <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <MenuItem key="1">nav 1</MenuItem>
            <MenuItem key="2">nav 2</MenuItem>
            <MenuItem key="3">nav 3</MenuItem>
          </Menu>*/}
          <Nav />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '12px 0' }}>
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>List</BreadcrumbItem>
            <BreadcrumbItem>App</BreadcrumbItem>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2016 Created by Ant UED
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
