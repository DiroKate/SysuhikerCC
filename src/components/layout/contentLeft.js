import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import cx from 'classnames';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';

import styles from './contentLeft.less';

function ContentLeft() {
  const isMode = false;
  const props = {
    id: 'content0',
  };
  const animType = {
    queue: isMode ? 'bottom' : 'right',
    one: isMode ? { y: '+=30', opacity: 0, type: 'from' }
      : { x: '-=30', opacity: 0, type: 'from' },
  };

  const rootClassNames = cx({
    [styles['content-template-wrapper']]: true,
    [styles['content-half-wrapper']]: true,
  });

  const overPackClassNames = cx({
    [styles['content-template']]: true,
    [styles.contentLeft]: true,
  });


  return (
    <div className={rootClassNames}>
      <OverPack
        className={overPackClassNames}
        location={props.id}
      >
        <TweenOne
          key="img"
          animation={animType.one}
          className={styles['contentLeft-img']}
          id={`${props.id}-imgWrapper`}
          resetStyleBool
        >
          <span id={`${props.id}-img`}>
            <img
              role="presentation"
              width="100%"
              src="https://zos.alipayobjects.com/rmsportal/nLzbeGQLPyBJoli.png"
            />
          </span>
        </TweenOne>
        <QueueAnim
          className={styles['contentLeft-text']}
          type={animType.queue}
          key="text"
          leaveReverse
          ease={['easeOutCubic', 'easeInCubic']}
          id={`${props.id}-textWrapper`}
        >
          <h1 key="h1" id={`${props.id}-title`}>
            企业资源管理
          </h1>
          <p key="p" id={`${props.id}-content`}>
            云资源集中编排、弹性伸缩、持续发布和部署，高可用及容灾。云资源集中编排、弹性伸缩、持续发布和部署，高可用及容灾。云资源集中编排、弹性伸缩、持续发布和部署，高可用及容灾。
          </p>
        </QueueAnim>
      </OverPack>
    </div>
  );
}

export default ContentLeft;
