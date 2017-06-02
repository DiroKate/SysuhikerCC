import React from 'react';
import { Button, Card, Table } from 'antd';
import LocalIcon from '../base/LocalIcon.js';
import styles from './MemberList.less';

function MemberInfo(props) {
  const dataSource = [{
    key: '1',
    name: '小邱',
    gender: 'female',
    notes: '传说中的备注',
    role: '发起人',
    iconUrl: '/icon.png',
  }, {
    key: '2',
    name: 'diroguan',
    gender: 'male',
    notes: '传说中的备注',
    iconUrl: '/icon.png',
    role: '作业',
  }, {
    key: '3',
    name: '吴彦祖',
    gender: 'female',
    notes: '传说中的备注',
    iconUrl: '/icon.png',
    role: '摄影',
  }];

  const columns = [{
    title: '头像',
    key: 'icon',
    render: (text, record) => (
      <img className={styles.iconImg} src={record.iconUrl} role="presentation" />
    ),
  }, {
    title: '昵称性别',
    key: 'name_gender',
    render: (text, record) => (
      <p>
        {record.name}
        <LocalIcon
          type={record.gender}
          className={styles[`${record.gender}`]}
        />
      </p>
    ),
  }, {
    title: '备注',
    dataIndex: 'notes',
    key: 'notes',
  }, {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
  }];

  return (<Table dataSource={dataSource} columns={columns} showHeader={false} />);
}

function MemberList(props) {
  const { data } = props;
  const gender = (
    <div className={styles.gender}>
      <LocalIcon type="male" className={styles.iconMale} />
      <p>10</p>
      <LocalIcon className={styles.iconFemale} type="female" />
      <p>10</p>
    </div>
  );
  return (
    <div className={styles.memberList}>
      <Button type="primary" className={styles.joinBtn}>
        立即参加
      </Button>
      <Card title="已参加" extra={gender} bordered={false}>
        <MemberInfo />
      </Card>
    </div>
  );
}
export default MemberList;
