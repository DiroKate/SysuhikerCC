import React, { Component } from 'react';
import TweenOne from 'rc-tween-one';
import { Menu } from 'antd';
import { Link } from 'dva/router';
import PropTypes from 'prop-types';


const Item = Menu.Item;
const SubMenu = Menu.SubMenu;

class Header extends Component {
  static propTypes = {
    className: PropTypes.string,
    // isMode: PropTypes.bool,
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
    const props = { ...this.props };
    const isMode = props.isMode;
    delete props.isMode;

    const isLogin = props.users.login;

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
    const userTitle = (<div>
      <span className="img">
        <img
          src="https://zos.alipayobjects.com/rmsportal/iXsgowFDTJtGpZM.png"
          width="30"
          height="30"
          role="presentation"
        />
      </span>
      <span>用户名</span>
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
      {...props}
    >
      <TweenOne
        className={`${this.props.className}-logo`}
        animation={{ x: -30, delay: 100, type: 'from', ease: 'easeOutQuad' }}
        id={`${this.props.id}-logo`}
      >
        <img
          role="presentation"
          width="100%"
          src="/logo.svg"
        />
      </TweenOne>
      {isMode ? (<div
        className={`${this.props.className}-phone-nav${this.state.phoneOpen ? ' open' : ''}`}
        id={`${this.props.id}-menu`}
      >
        <div
          className={`${this.props.className}-phone-nav-bar`}
          onClick={() => {
            this.phoneClick();
          }}
        >
          <em />
          <em />
          <em />
        </div>
        <div
          className={`${this.props.className}-phone-nav-text`}
        >
          <Menu
            defaultSelectedKeys={['0']}
            mode="inline"
            theme="dark"
          >
            {navChildren}
          </Menu>
        </div>
      </div>) :
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
      }
    </TweenOne>);
  }
}

export default Header;
