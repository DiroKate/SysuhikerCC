import React, { Component } from 'react';
import TweenOne from 'rc-tween-one';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';


const Item = Menu.Item;
const SubMenu = Menu.SubMenu;

class Header extends Component {
  static propTypes = {
    className: PropTypes.string,
    isMode: PropTypes.bool,
    id: PropTypes.string,
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

  render() {
    const props = { ...this.props };
    const isMode = props.isMode;
    delete props.isMode;
    const navData = {
      menu1: '首页',
      menu2: '活动',
      menu3: '逸仙茶馆',
      menu4: '关于',
    };
    const navChildren = Object.keys(navData).map((key, i) => (
      <Item key={i}>
        {navData[key]}
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
    navChildren.push((<Item className="help" key="help">
      <Icon type="question-circle-o" />
      <span>帮助</span>
    </Item>),
      (<SubMenu className="user" title={userTitle} key="user">
        <Item key="a">用户中心</Item>
        <Item key="b">修改密码</Item>
        <Item key="c">登出</Item>
      </SubMenu>));
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
          mode="horizontal" defaultSelectedKeys={['0']}
          id={`${this.props.id}-menu`}
        >
          {navChildren}
        </Menu>
      </TweenOne>
      }
    </TweenOne>);
  }
}

export default Header;
