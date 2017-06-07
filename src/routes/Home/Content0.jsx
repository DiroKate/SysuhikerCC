import React from 'react';
import { Button, Icon } from 'antd';
import { browserHistory } from 'dva/router';
import QueueAnim from 'rc-queue-anim';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import BannerAnim, { Element } from 'rc-banner-anim';
import 'rc-banner-anim/assets/index.css';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';

const BgElement = Element.BgElement;
class Banner extends React.Component {
  render() {
    const props = { ...this.props };
    delete props.isMode;

    const activityBtnCb = () => {
      browserHistory.push('/activity');
    };
    const bbsBtnCb = () => {
      browserHistory.push('/bbs');
    };


    const activityBanner = (
      <Element
        prefixCls="banner-user-elem"
        key={`${props.className}-banner-user-elem-1`}
      >
        <BgElement
          className={'bg bg0'}
          key="bg"
        />
        <QueueAnim
          type={['bottom', 'top']} delay={200}
          className={`${props.className}-title`}
          key="text"
        >
          <span
            className="logo"
            key="logo"
          >
            <img
              width="100%"
              src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png"
              role="presentation"
            />
          </span>
          <p>逸仙徒步，自由的AA户外组织</p>
          <Button
            type="ghost"
            key="button"
            onClick={activityBtnCb}
          >
            参加活动
          </Button>
        </QueueAnim>
      </Element>
    );

    const bbsBanner = (
      <Element
        prefixCls="banner-user-elem"
        key={`${props.className}-banner-user-elem-2`}
      >
        <BgElement
          className={'bg bg1'}
          key="bg"
        />
        <QueueAnim
          type={['bottom', 'top']} delay={200}
          className={`${props.className}-title`}
          key="text"
        >
          <span
            className="logo"
            key="logo"
          >
            <img
              width="100%"
              src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png"
              role="presentation"
            />
          </span>
          <p>逸仙徒步，自由的AA户外组织</p>
          <Button
            type="ghost"
            key="button"
            onClick={bbsBtnCb}
          >
            逸仙茶馆
          </Button>
        </QueueAnim>
      </Element>
    );
    return (
      <OverPack
        {...props}
      >
        <TweenOneGroup
          key="banner"
          enter={{ opacity: 0, type: 'from' }}
          leave={{ opacity: 0 }}
          component=""
        >
          <div className={`${props.className}-wrapper`}>
            <BannerAnim
              key="banner"
            >
              {activityBanner}
              {bbsBanner}
            </BannerAnim>
          </div>
        </TweenOneGroup>
        <TweenOne
          animation={{ y: '-=20', yoyo: true, repeat: -1, duration: 1000 }}
          className={`${props.className}-icon`}
          style={{ bottom: 40 }}
          key="icon"
        >
          <Icon type="down" />
        </TweenOne>
      </OverPack>
    );
  }
}

Banner.defaultProps = {
  className: 'banner1',
};

export default Banner;
