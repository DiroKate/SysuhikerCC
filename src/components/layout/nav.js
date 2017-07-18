import React from 'react';
import { Row, Col, Menu, Avatar, Icon, Dropdown } from 'antd';
import { Link } from 'dva/router';

import LocalIcon from '../LocalIcon';
import styles from './nav.less';

const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

function Nav({ data, phoneMode }) {
  const {
      isLogin, userId, userEmail, userAvatarUrl, userName } = data;
  const navData = {
    home: '首页',
    activity: '活动',
    bbs: '逸仙茶馆',
    about: '关于',
  };
  const navChildren = Object.keys(navData).map(key => (
    <Item key={key}>
      <Link to={`/${key}`}>
        {navData[key]}
      </Link>
    </Item>
    ));
  const userTitle = (
    <div className={styles.userTitle}>
      <span>
        <Avatar
          src={userAvatarUrl}
        >{userName ? userName.substr(0, 1).toUpperCase() : ''}</Avatar>
      </span>
    </div>);
  const loginMenu = isLogin ? (<SubMenu title={userTitle} key="user">
    <Item key="sysuhiker">用户中心</Item>
    <Item key="logout">登出</Item>
  </SubMenu>) : (<Item key="login">
    <Link to="/login">登录</Link>
  </Item>);

  // navChildren.push(loginMenu);

  const phoneMenu = (
    <Menu
      defaultSelectedKeys={['home']}
      theme="dark"
      className={styles.phoneMenu}
      style={{ width: 240 }}
      mode="inline"
    >
      {navChildren}
      {isLogin ? (<SubMenu title={(<span>{userName}</span>)} key="user">
        <Item key="sysuhiker">用户中心</Item>
        <Item key="logout">登出</Item>
      </SubMenu>) : (<Item key="login">
        <Link to="/login">登录</Link>
      </Item>)}
    </Menu>
  );

  const userMenu = phoneMode ? (
    <Dropdown overlay={phoneMenu}>
      <Icon type="menu-fold" className={styles.phoneMenuLogo} />
    </Dropdown>
    ) : (
      <Row
        type="flex"
        align="center"
        justify="end"
      >
        <Col>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['home']}
            theme="dark"
            className={styles.menu}
          >
            {navChildren}
            {loginMenu}
          </Menu>
        </Col>
      </Row>
    );
  return (
    <Row
      type="flex"
      align="center"
      justify="space-between"
    >
      <Col>
        <LocalIcon
          key="logo"
          type="LOGO-"
          className={styles.logo}
        />
      </Col>
      <Col>{userMenu}</Col>
    </Row>
  );
}

export default Nav;
