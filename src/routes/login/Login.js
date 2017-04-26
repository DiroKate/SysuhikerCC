import React from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Spin } from 'antd';

import Nav from '../Home/Nav';
import Footer from '../Home/Footer';

import LoginForm from '../../components/login/LoginForm';
import '../Home/less/antMotion_style.less';

function Login({ dispatch, loading }) {
  const loginProps = {
    onOk(data) {
      console.log('Received values of form: ', data);
      dispatch({
        type: 'users/login',
        payload: data,
      });
    },
  };

  const LoginPage = (
    <div key="login_page" style={{ background: '#ECECEC', padding: '30px' }}>
      <Row type="flex" justify="space-around" align="middle">
        <Col xs={{ span: 22 }} lg={{ span: 10 }}>
          <Card title="欢迎登录逸仙徒步" bordered={false}>
            <Row type="flex" justify="space-around" align="middle">
              <img
                src="/logo.svg"
                role="presentation"
              />
            </Row>
            <Row type="flex" justify="space-around" align="middle">
              <Col span={22}>
                <Spin tip="登录中..." spinning={loading} size="large">
                  <LoginForm {...loginProps} />
                </Spin>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );

  const children = [
    <Nav isMode={false} />,
    LoginPage,
    <Footer isMode={false} />,
  ];

  return (
    <div className="templates-wrapper">
      {children}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.users,
  };
}

export default connect(mapStateToProps)(Login);
