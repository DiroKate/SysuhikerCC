import React from 'react';
import {
  Button,
  Card,
  Table,
  Modal,
  Menu,
  Dropdown,
  Icon,
} from 'antd';
import Avatar from 'react-avatar';
import { browserHistory } from 'dva/router';
import { LocalIcon } from './..';
import { needLogin, config } from '../../utils';

import styles from './MemberList.less';

function MemberInfo(props) {
  const { dataSource, isAdmin, onStatusChange } = props;
  const genderMap = {
    mm: 'female',
    gg: 'male',
  };

  const onStatusHandler = ({ target }) => {
    const { rel } = target;
    const data = rel.split('|');
    const item = dataSource[data[0]];
    const status = data[1];

    onStatusChange(item.event_joinlist_userid, status);
  };
  const joinStatusMenu = recordIndex => (
    <Menu>
      {
        config.joinStatus.map(item => (
          <Menu.Item>
            <a
              rel={`${recordIndex}|${item}`}
              onClick={onStatusHandler}
            >{item}</a>
          </Menu.Item>
        ))
      }
    </Menu>
  );

  const columns = [
    {
      title: '头像',
      key: 'icon',
      render: (text, record) => (
        <Avatar
          round
          size={32}
          src={record.event_joinlist_userAvatarUrl}
          name={record.event_joinlist_usernick.substr(0, 1).toUpperCase()}
        />),
    }, {
      title: '昵称性别',
      key: 'name_gender',
      render: (text, record) => {
        const gender = genderMap[record.event_joinlist_usergender];
        return (
          <p>
            {record.event_joinlist_usernick}
            <LocalIcon type={gender} className={styles[`${gender}`]} colorful />
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
      key: 'event_joinlist_status',
      width: '28%',
      render: (text, record, index) => {
        const { event_joinlist_status: status } = record;
        const adminView = (<Dropdown overlay={joinStatusMenu(index)}>
          <p style={{ color: config.joinStatusColorScheme[status] }}>
            {status} <Icon type="down" />
          </p>
        </Dropdown>);
        const defaultView = (<p style={{ color: config.joinStatusColorScheme[status] }}>
          {status}
        </p>);
        return (
          isAdmin ? adminView : defaultView
        );
      },
    },
  ];

  return (<Table
    dataSource={dataSource}
    columns={columns}
    showHeader={false}
    pagination={{
      pageSize: 20,
    }}
  />);
}

function MemberList(props) {
  const {
    event_id,
    isLogin,
    activityJoinList,
    isAdmin,
    isMember,
    isExpired,
    dispatch,
  } = props.data;
  let maleNum = 0;
  let femaleNum = 0;
  for (const memberInfo of activityJoinList) {
    if (memberInfo.event_joinlist_usergender === 'mm') {
      femaleNum += 1;
    }
    if (memberInfo.event_joinlist_usergender === 'gg') {
      maleNum += 1;
    }
  }

  const jumpTo = (eventId, type) => {
    console.log('jumpTo', type);
    switch (type) {
        // 报名活动页面
      case 'apply':
        browserHistory.push(`/activity/apply/${eventId}`);
        break;

        // 编辑报名页面
      case 'edit_apply':
        console.log('更新报名信息');
        break;

        // 编辑活动信息页面;
      case 'edit_event':
        browserHistory.push(`/activity/edit/${eventId}`);
        break;

        // 退出活动跳转
      case 'exit_event':
        Modal.confirm({
          title: '退出活动',
          content: '确认退出活动？\n(如需重新报名请联系活动发起人修改报名状态)',
          okText: '确认退出',
          onOk() {
            dispatch({ type: 'activity/quitActivity' });
          },
          maskClosable: true,
        });
        break;

      default:
        break;

    }
  };

  const onEditEventHandler = () => {
    const callback = () => {
      jumpTo(event_id, 'edit_event');
    };
    needLogin(isLogin, callback, '还没登录哦，请先登录再修改活动～');
  };
  const onApplyEventHandler = () => {
    const callback = () => {
      jumpTo(event_id, 'apply');
    };
    needLogin(isLogin, callback, '还没登录哦，请先登录再报名活动～');
  };
  const onMenuClick = ({ target }) => {
    const { rel } = target;
    jumpTo(event_id, rel);
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
   * * 活动成员： 修改报名资料／自己状态权限(退出活动)
   * * 未登录或者其他： 立即参加
   * 活动过期了：
   * * 活动发起人：修改活动
   * * 其他：活动已过期。
   */
  const mainBtn = () => {
    if (isExpired && isAdmin) {
      /**
       * 管理员的已过期活动菜单
       */
      return (
        <Button type="dashed" className={styles.joinBtn} onClick={onEditEventHandler}>活动已过期，修改活动</Button>
      );
    } else if (isExpired) {
      /**
       * 非管理员的已过期活动菜单：活动已过期
       */
      return (
        <Button disabled type="primary" className={styles.joinBtn}>活动已过期</Button>
      );
    } else if (!isExpired && isAdmin) {
      const adminMenu = (
        <Menu>
          <Menu.Item>
            <a rel="edit_event" onClick={onMenuClick}>修改活动</a>
          </Menu.Item>
          <Menu.Item>
            <a rel="edit_apply" onClick={onMenuClick}>报名资料</a>
          </Menu.Item>
          <Menu.Item>
            <a rel="exit_event" onClick={onMenuClick}>退出活动</a>
          </Menu.Item>
        </Menu>
      );
      /**
       * 活动创建者菜单
       * |--管理活动
       * |----修改活动
       * |----修改报名资料
       * |----退出报名
       */
      return (
        <Dropdown overlay={adminMenu} placement="bottomLeft">
          <Button type="primary" className={styles.joinBtn}>管理活动</Button>
        </Dropdown>
      );
    } else if (!isExpired && !isAdmin && isMember) {
      const memberMenu = (
        <Menu>
          <Menu>
            <Menu.Item>
              <a rel="edit_apply" onClick={onMenuClick}>报名资料</a>
            </Menu.Item>
            <Menu.Item>
              <a rel="exit_event" onClick={onMenuClick}>退出活动</a>
            </Menu.Item>
          </Menu>
        </Menu>
      );
      /**
       * 活动成员的菜单
       * |-管理报名
       * |---报名资料修改
       * |---退出活动
       */
      return (
        <Dropdown overlay={memberMenu} placement="bottomLeft">
          <Button type="primary" className={styles.joinBtn}>管理报名</Button>
        </Dropdown>
      );
    } else {
      /**
       * 未登录／未过期的活动菜单
       */
      return (
        <Button type="primary" className={styles.joinBtn} onClick={onApplyEventHandler}>立即参加</Button>
      );
    }
  };

  const onStatusChange = (targetUserId, status) => {
    if (targetUserId) {
      dispatch({
        type: 'activity/changeJoinState',
        payload: {
          targetUserId, status,
        },
      });
    }
  };

  return (
    <div className={styles.memberList}>
      {mainBtn()}
      <Card title="报名列表" extra={gender} bordered={false}>
        <MemberInfo
          dataSource={activityJoinList}
          isAdmin={isAdmin}
          onStatusChange={onStatusChange}
        />
      </Card>
    </div>
  );
}
export default MemberList;
