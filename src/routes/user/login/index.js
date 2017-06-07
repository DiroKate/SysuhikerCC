import React from 'react';
import { connect } from 'dva';
import classNames from 'classnames';
import { Card, Spin } from 'antd';
import QueueAnim from 'rc-queue-anim';

import { LoginForm, LocalIcon } from '../../../components';

import styles from './index.less';


function Login({ dispatch, loading }) {
  const loginProps = {
    onOk(data) {
      dispatch({
        type: 'users/login',
        payload: data,
      });
    },
  };

  const LoginPage = (
    <Card
      title="欢迎登录逸仙徒步"
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
    { 'sysuhiker-top-wrapper': true },
    { [`${styles.wrapper}`]: true },
);

  return (
    <div className={cNs}>
      { LoginPage }
    </div>
  );
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.users,
  };
}

export default connect(mapStateToProps)(Login);
