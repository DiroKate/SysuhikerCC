import React from 'react';
import { Button, Card, Table, Modal } from 'antd';
import { browserHistory } from 'dva/router';
import { Avatar, LocalIcon } from './..';

import styles from './MemberList.less';

function MemberInfo(props) {
  const dataSource = [{
    key: '1',
    name: '小邱',
    userEmail: '111@qq.com',
    gender: 'female',
    notes: '传说中的备注',
    role: '发起人',
    iconUrl: '/icon.png',
    state: '发起人',
  }, {
    key: '2',
    name: 'diroguan',
    userEmail: '222@qq.com',
    gender: 'male',
    notes: '传说中的备注',
    iconUrl: '/icon.png',
    role: '作业',
    state: '活动成员',
  }, {
    key: '3',
    userEmail: '333@qq.com',
    name: '吴彦祖',
    gender: 'female',
    notes: '传说中的备注',
    iconUrl: '/icon.png',
    role: '摄影',
    state: '未确认',
  }];

  const columns = [{
    title: '头像',
    key: 'icon',
    render: (text, record) => (
      <Avatar email={record.userEmail} className={styles.iconImg} />
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
          colorful
        />
      </p>
    ),
  }, {
    title: '备注',
    dataIndex: 'notes',
    key: 'notes',
  }, {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
  }];

  return (<Table dataSource={dataSource} columns={columns} showHeader={false} />);
}

function MemberList(props) {
  const { event_id, isLogin } = props.data;

  const onClick = () => {
    if (isLogin) {
      browserHistory.push(`/activity/apply/${event_id}`);
    } else {
      Modal.confirm({
        title: '尚未登录',
        content: '还没登录哦，请先登录再报名～',
        iconType: 'meh-o',
        onOk() {
          browserHistory.push('/login');
        },
      });
    }
  };
  const gender = (
    <div className={styles.gender}>
      <LocalIcon type="male" className={styles.iconMale} colorful />
      <p>10</p>
      <LocalIcon className={styles.iconFemale} type="female" colorful />
      <p>10</p>
    </div>
  );
  return (
    <div className={styles.memberList}>
      <Button
        type="primary"
        className={styles.joinBtn}
        onClick={onClick}
      >
        立即参加
      </Button>
      <Card title="报名列表" extra={gender} bordered={false}>
        <MemberInfo />
      </Card>
    </div>
  );
}
export default MemberList;
