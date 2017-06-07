import React from 'react';
import { RegisterForm } from '../../../components';
import styles from './index.less';

function Register() {
  return (
    <div className="sysuhiker-top-wrapper">
      <h1>新用户注册</h1>
      <div className={styles.wrapper}>
        <RegisterForm />
      </div>
    </div>
  );
}
export default Register;
