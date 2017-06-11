import React from 'react';
import { connect } from 'dva';

import { RegisterForm } from '../../../components';
import styles from './index.less';

function Register(props) {
  console.log(props);
  const { dispatch } = props;
  // const handleSubmit = (e) => {
  //   console.log(e);
  // };
  const registerFormProps = {
    dispatch,
  };

  return (
    <div className="sysuhiker-top-wrapper">
      <h1>新用户注册</h1>
      <div className={styles.wrapper}>
        <RegisterForm {...registerFormProps} />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.app,
  };
}

export default connect(mapStateToProps)(Register);
