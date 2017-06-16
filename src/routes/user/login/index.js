import React from 'react';
import { connect } from 'dva';
import classNames from 'classnames';
import { Card, Spin, Row, Col } from 'antd';
import QueueAnim from 'rc-queue-anim';

import { LoginForm, LocalIcon } from '../../../components';

import styles from './index.less';

function Login({ dispatch, loading }) {
  // console.log(loading);
  const loginProps = {
    onOk(data) {
      dispatch({
        type: 'login/login',
        payload: data,
      });
    },
  };

  const LoginPage = (
    <Card
      className={styles.card}
    >
      <QueueAnim delay={300} className="queue-simple">
        <LocalIcon key="logo" type="LOGO-" className={styles.icon} />
        <h2 key="solgan" className={styles.slogan}>逸起Hike，仙至High</h2>
        <Spin key="loginForm" tip="登录中..." spinning={loading} size="large">
          <LoginForm {...loginProps} />
        </Spin>
      </QueueAnim>
    </Card>
  );

  const cNs = classNames(
    // { 'sysuhiker-top-wrapper': true },
    { [`${styles.wrapper}`]: true },
  );

  const cardLayout = {
    xs: { span: 20, offset: 2 },
    sm: { span: 11, offset: 12 },
    md: { span: 8, offset: 15 },
  };

  return (
    <div className={cNs}>
      <Row type="flex">
        <Col {...cardLayout} >
          { LoginPage }
        </Col>
      </Row>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.app,
  };
}

export default connect(mapStateToProps)(Login);
