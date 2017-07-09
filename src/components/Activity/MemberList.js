import React from 'react';
import { Button, Card, Table, Modal, Menu, Dropdown, Avatar } from 'antd';
import { browserHistory } from 'dva/router';
import { LocalIcon } from './..';

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
    render: (text, record) => (
      <Avatar
        src={record.event_joinlist_userAvatarUrl}
        size="large"
      >
        {record.event_joinlist_usernick}
      </Avatar>
      ),
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

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      showHeader={false}
      pagination={{ pageSize: 20 }}
    />);
}

function MemberList(props) {
  const { event_id, isLogin, activityJoinList, isAdmin, isMember, isExpired } = props.data;
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
  const onMenuClick = (e) => {
    switch (e.target.rel) {
      case 'updateActivity':
        console.log('更新活动信息');
        break;
      case 'quitActivity':
        Modal.warning({
          title: '退出活动',
          content: '确认退出活动？',
          okText: '确认退出',
          onOk() {
            browserHistory.push('/login');
          },
        });
        break;
      case 'updateApply':
        console.log('更新报名信息');
        break;
      default:
        break;
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


  /**
   * 显示规则：
   * 活动没过期：
   * * 活动发起人：修改活动／退出活动／报名资料／对其他成员有管理员权限。
   * * 活动成员： 修改报名资料／自己状态权限
   * * 未登录或者其他： 立即参加
   * 活动过期了：
   * * 活动发起人：修改活动
   * * 其他：活动已过期。
   */
  const mainBtn = () => {
    if (isExpired && isAdmin) {
      return (<Button type="dashed" className={styles.joinBtn} onClick={onClick} >活动已过期，修改活动</Button>);
    } else if (isExpired) {
      return (<Button disabled type="primary" className={styles.joinBtn} >活动已过期</Button>);
    } else if (!isExpired && isAdmin) {
      const adminMenu = (
        <Menu>
          <Menu.Item>
            <a rel="updateActivity" onClick={onMenuClick}>修改活动</a>
          </Menu.Item>
          <Menu.Item>
            <a rel="updateApply" onClick={onMenuClick}>报名资料</a>
          </Menu.Item>
          <Menu.Item>
            <a rel="quitActivity" onClick={onMenuClick}>退出活动</a>
          </Menu.Item>
        </Menu>
      );
      return (
        <Dropdown overlay={adminMenu} placement="bottomLeft">
          <Button type="primary" className={styles.joinBtn} >管理活动</Button>
        </Dropdown>
      );
    } else if (!isExpired && !isAdmin && isMember) {
      const memberMenu = (
        <Menu>
          <Menu>
            <Menu.Item>
              <a rel="updateApply" onClick={onMenuClick}>报名资料</a>
            </Menu.Item>
            <Menu.Item>
              <a rel="quitActivity" onClick={onMenuClick}>退出活动</a>
            </Menu.Item>
          </Menu>
        </Menu>
      );
      return (
        <Dropdown overlay={memberMenu} placement="bottomLeft">
          <Button type="primary" className={styles.joinBtn} >管理报名</Button>
        </Dropdown>
      );
    } else {
      return (<Button type="primary" className={styles.joinBtn} >立即参加</Button>);
    }
  };

  return (
    <div className={styles.memberList}>
      {mainBtn()}
      <Card title="报名列表" extra={gender} bordered={false}>
        <MemberInfo dataSource={activityJoinList} />
      </Card>
    </div>
  );
}
export default MemberList;
