import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Layout, BackTop } from 'antd';
import enquire from 'enquire.js';

import { SysuhikerLayout } from '../components';
import '../themes/antless/antMotion_style.less';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const { Header, Content, Footer } = Layout;
const { Nav } = SysuhikerLayout;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMode: false,
    };
  }

  componentDidMount() {
    // 适配手机屏幕;
    this.enquireScreen((isMode) => {
      this.setState({ isMode });
      this.props.dispatch({ type: 'app/setMode', payload: isMode });
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
    const { children, app } = this.props;
    return (
      <Layout className="templates-wrapper">
        <BackTop />
        <Header>
          <Nav
            data={{
              ...app,
            }}
            phoneMode={this.state.isMode}
          />
        </Header>
        <Content className="user-templates-wrapper">
          {children}
        </Content>
        <Footer style={{
          textAlign: 'center',
        }}
        >
          <p>Copyright © 2017 The Project by
            <a href="/">SYSUHIKER</a>.</p>
          <p>
            <a href="http://www.miitbeian.gov.cn/">粤ICP备16111719号</a>
          </p>
        </Footer>
      </Layout>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default connect(({ app, loading }) => ({ app, loading }))(App);
