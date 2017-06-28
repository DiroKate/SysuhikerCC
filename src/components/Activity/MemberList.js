import React from 'react';
import { Button, Card, Table, Modal } from 'antd';
import { browserHistory } from 'dva/router';
import { Avatar, LocalIcon } from './..';

import styles from './MemberList.less';

function MemberInfo(props) {
  const { dataSource } = props;
  const genderMap = {
    mm: 'female',
    gg: 'male',
  };

  const columns = [{
    title: '头像',
    key: 'icon',
    render: (text, record) => {
      const email = record.userEmail ? record.userEmail : 'default@default.com';
      return (
        <Avatar email={email} className={styles.iconImg} />
      );
    },
  }, {
    title: '昵称性别',
    key: 'name_gender',
    render: (text, record) => {
      const gender = genderMap[record.event_joinlist_usergender];
      return (
        <p>
          {record.event_joinlist_usernick}
          <LocalIcon
            type={gender}
            className={styles[`${gender}`]}
            colorful
          />
        </p>
      );
    },
  }, {
    title: '备注',
    width: '40%',
    dataIndex: 'event_joinlist_comments',
    key: 'event_joinlist_comments',
  }, {
    title: '状态',
    dataIndex: 'event_joinlist_status',
    key: 'event_joinlist_status',
  }];

  return (<Table dataSource={dataSource} columns={columns} showHeader={false} pagination={{ pageSize: 20 }} />);
}

function MemberList(props) {
  const { event_id, isLogin, activityJoinList } = props.data;
  let maleNum = 0;
  let femaleNum = 0;
  for (const memberInfo of activityJoinList) {
    if (memberInfo.event_joinlist_usergender === 'mm') { femaleNum += 1; }
    if (memberInfo.event_joinlist_usergender === 'gg') { maleNum += 1; }
  }


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
      <p>{maleNum}</p>
      <LocalIcon className={styles.iconFemale} type="female" colorful />
      <p>{femaleNum}</p>
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
        <MemberInfo dataSource={activityJoinList} />
      </Card>
    </div>
  );
}
export default MemberList;
