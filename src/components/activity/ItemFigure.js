import React from 'react';
import { Row, Col, Tag, Icon } from 'antd';
import { browserHistory } from 'dva/router';
import styles from './ItemFigure.less';

function ItemFigure(props) {
  const { itemData } = props;
  const days = 3;// 计算出来

  const clickHandler = () => {
    browserHistory.push(`/activity/details/${itemData.id}`);
  };

  const contentLayout = {
    xs: 24,
    sm: 8,
  };

  return (
    <div className={styles.wrapper} onClick={clickHandler}>
      <div className={styles.iconWrapper}>
        <img
          alt=""
          src={itemData.iconUrl}
          style={{ width: '150px', borderRadius: '300px' }}
        />
      </div>
      <div className={styles.contentWrapper}>
        <h1>{itemData.title}</h1>
        <span className={styles.leaderSpan}>
          <h3>{itemData.leader}</h3>
          <p>{itemData.notes}</p>
        </span>
        <Row gutter={16}>
          <Col {...contentLayout}>
            <img
              style={{ maxHeight: '150px', maxWidth: '100%' }}
              src="/yay.jpg"
              alt=""
            />
          </Col>
          <Col>
            <p style={{ fontSize: '0.8rem' }}>
              {itemData.content}
            </p>
          </Col>
        </Row>
        <Row
          className={styles.tagInfo}
          type="flex"
          gutter={16}
        >
          <Col><Tag color="orange">报名中</Tag></Col>
          <Col><Tag color="green">重装徒步</Tag></Col>
          <Col>
            <span className={styles.inlineSpan}><Icon type="environment-o" /><p>{itemData.startAt}</p>
            </span>
          </Col>
          <Col><p>{days}天</p></Col>
          <Col>
            <span className={styles.inlineSpan}>
              <Icon type="team" /><p>{itemData.memberNum}/{itemData.memberTop}</p>
            </span>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ItemFigure;
