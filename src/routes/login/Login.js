import React from 'react';
import { connect } from 'dva';
import { Row, Col, Card } from 'antd';

import LoginForm from '../../components/login/LoginForm';


function Login() {
  return (
    <div style={{ background: '#ECECEC', padding: '30px' }}>
      <Row type="flex" justify="space-around" align="middle">
        <Col xs={{ span: 22 }} lg={{ span: 10 }}>
          <Card title="欢迎登录逸仙徒步" bordered={false}>
            <Row type="flex" justify="space-around" align="middle">
              <img
                src="https://zos.alipayobjects.com/rmsportal/iXsgowFDTJtGpZM.png"
                role="presentation"
              />
            </Row>
            <Row type="flex" justify="space-around" align="middle">
              <Col span={22}>
                <LoginForm />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>

  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Login);
