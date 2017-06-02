import React from 'react';
import { Button, Card, Icon } from 'antd';
import styles from './MemberList.less';

function MemberList(props) {
  const { data } = props;
  const gender = (
    <p><Icon type="male" className={styles.iconMale} />10 <Icon className={styles.iconFemale} type="female" />10</p>
  );
  return (
    <div className={styles.memberList}>
      <Button type="primary" className={styles.joinBtn}>
        立即参加
      </Button>
      <Card title="已参加" extra={gender} bordered={false}>
        <p>程序员偷懒ing</p>
        <p>这里还没有写。</p>
        <p>这里要写报名列表的呀。</p>
      </Card>
    </div>
  );
}
export default MemberList;
