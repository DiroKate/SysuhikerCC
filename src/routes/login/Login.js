import React from 'react';
import { connect } from 'dva';
import { Button, Form, Input, Row, Col } from 'antd';

import styles from './Login.less';
import config from '../../utils/config';

const FormItem = Form.Item;


function Login() {
  return (
    <div>
      <Row type="flex" justify="space-around">
        <Col span={8}>
          <Row type="flex" justify="center" align="middle" gutter={16}>
            <img className={styles.logoImg} alt={'logo'} src={config.logoSrc} />
            <span className={styles.logoFont}>逸仙徒步</span>
          </Row>
          <Form>
            <FormItem hasFeedback>
              <Input size="large" placeholder="用户名" />
            </FormItem>
            <FormItem hasFeedback>
              <Input type="password" size="large" placeholder="密码" />
            </FormItem>
            <Button className={styles.loginBtn} type="primary" size="large">
          登陆
        </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Login);
