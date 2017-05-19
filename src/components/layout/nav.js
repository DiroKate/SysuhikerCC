import React from 'react';
import TweenOne from 'rc-tween-one';
import { Menu } from 'antd';
import { Link } from 'dva/router';

import styles from './nav.less';

const Item = Menu.Item;
const { SubMenu } = Menu;

class Nav extends React.Component {

  static defaultProps = {
    className: 'sysuhikerNav',
  }

  render() {
    const props = { ...this.props };
    const navData = {
      home: '首页',
      activity: '活动',
      bbs: '逸仙茶馆',
      about: '关于',
    };

    const navChildren = Object.keys(navData).map(key => (
      <Item key={key}>
        <Link to={key}>
          {navData[key]}
        </Link>
      </Item>
    ));

    const userTitle = (<div className={styles[`${this.props.className}-user`]}>
      <span>
        <img
          src="/Icon.png"
          role="presentation"
        />
      </span>
      <span>用户名</span>
    </div>);

    const loginMenu = true ? (<SubMenu className="user" title={userTitle} key="user">
      <Item key="a">用户中心</Item>
      <Item key="b">修改密码</Item>
      <Item key="c">登出</Item>
    </SubMenu>) : (<Item key="login">
      <Link to="login">登录</Link>
    </Item>);

    navChildren.push(loginMenu);

    return (
      <TweenOne
        component="header"
        animation={{ opacity: 0, type: 'from' }}
        {...props}
      >
        <TweenOne
          className={styles[`${this.props.className}-logo`]}
          animation={{ x: -30, delay: 100, type: 'from', ease: 'easeOutQuad' }}
          id={`${this.props.className}-logo`}
        >
          <img
            role="presentation"
            width="100%"
            src="/logo.svg"
          />
        </TweenOne>

        <TweenOne
          animation={{ x: 30, delay: 100, opacity: 0, type: 'from', ease: 'easeOutQuad' }}
          className={styles[`${this.props.className}-nav`]}
        >
          <Menu
            mode="horizontal" defaultSelectedKeys={['0']}
            id={`${this.props.id}-menu`}
          >
            {navChildren}
          </Menu>
        </TweenOne>

      </TweenOne>
    );
  }

}

export default Nav;
