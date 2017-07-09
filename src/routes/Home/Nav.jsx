import React, { Component } from 'react';
import TweenOne from 'rc-tween-one';
import { Menu, Avatar } from 'antd';
import { Link } from 'dva/router';
import PropTypes from 'prop-types';
import { LocalIcon } from '../../components';


const Item = Menu.Item;
const SubMenu = Menu.SubMenu;

class Header extends Component {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    // isLogin: PropTypes.bool,
  };

  static defaultProps = {
    className: 'header1',
  };


  constructor(props) {
    super(props);
    this.state = {
      phoneOpen: false,
    };
  }

  phoneClick = () => {
    this.setState({
      phoneOpen: !this.state.phoneOpen,
    });
  }

  // menuClick = (e) => {
  //   console.log(`click Menu ${e.key}`);
  // }

  render() {
    const { app } = this.props;
    // const isLogin = app.login;
    const { isLogin, userId, userEmail, userName } = app;

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
    const userTitle = (<div>
      <span>
        <Avatar className={`${this.props.className}-user-avatar`}>{userName}</Avatar>
      </span>
      <span>{userName}</span>
    </div>);
    const loginMenu = isLogin ? (<SubMenu className="user" title={userTitle} key="user">
      <Item key="a">用户中心</Item>
      <Item key="b">修改密码</Item>
      <Item key="c">登出</Item>
    </SubMenu>) : (<Item key="login">
      <Link to="login">登录</Link>
    </Item>);

    navChildren.push(loginMenu);
    return (<TweenOne
      component="header"
      animation={{ opacity: 0, type: 'from' }}
      {...this.props}
    >
      <TweenOne
        className={`${this.props.className}-logo`}
        animation={{ x: -30, delay: 100, type: 'from', ease: 'easeOutQuad' }}
        id={`${this.props.id}-logo`}
      >
        <LocalIcon
          key="logo"
          type="LOGO-"
          className={`${this.props.className}-logo-img`}
        />
      </TweenOne>
      <TweenOne
        animation={{ x: 30, delay: 100, opacity: 0, type: 'from', ease: 'easeOutQuad' }}
        className={`${this.props.className}-nav`}
      >
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['0']}
          id={`${this.props.id}-menu`}
          onClick={this.menuClick}
        >
          {navChildren}
        </Menu>
      </TweenOne>
    </TweenOne>);
  }
}

export default Header;
