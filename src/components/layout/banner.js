import React from 'react';
import { Button } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { TweenOneGroup } from 'rc-tween-one';
import BannerAnim, { Element } from 'rc-banner-anim';
import 'rc-banner-anim/assets/index.css';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import styles from './banner.less';

const BgElement = Element.BgElement;


function Banner() {
  const childrenData = [
    {
      title: 'https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png',
      content: '逸仙徒步，自由的AA户外组织',
      button: '参加活动',
    },
    {
      title: 'https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png',
      content: '逸仙徒步，自由的AA户外组织',
      button: '逸仙茶馆',
    },
  ];

  const childrenToRender = childrenData.map((item, i) => {
    const title = item.title;
    const content = item.content;
    const button = item.button;
    return (
      <Element key={i} prefixCls={styles['banner-user-elem']}>
        <BgElement className={styles[`bg${i}`]} key="bg" />
        <QueueAnim
          type={['bottom', 'top']} delay={200}
          className={styles['banner-title']}
          key="text"
          id={`banner-wrapperBlock${i}`}
        >
          <span
            className={styles.logo}
            key="logo"
            id={`banner-titleBlock${i}`}
          >
            <img width="100%" src={title} role="presentation" />
          </span>
          <p
            key="content"
            id={`banner-contentBlock${i}`}
          >
            {content}
          </p>
          <Button
            type="ghost"
            key="button"
            id={`banner-buttonBlock${i}`}
          >
            {button}
          </Button>
        </QueueAnim>
      </Element>
    );
  });

  return (
    <OverPack>
      <TweenOneGroup
        key="banner"
        enter={{ opacity: 0, type: 'from' }}
        leave={{ opacity: 0 }}
        component=""
      >
        <div className={styles['banner-wrapper']}>
          <BannerAnim
            key="banner"
            prefixCls={styles['banner-user']}
            autoPlay
          >
            {childrenToRender}
          </BannerAnim>
        </div>
      </TweenOneGroup>
    </OverPack>
  );
}

export default Banner;
