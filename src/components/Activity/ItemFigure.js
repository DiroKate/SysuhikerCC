import React from 'react';
import { Row, Col, Tag, Icon } from 'antd';
import Gravatar from 'react-gravatar';
import styles from './ItemFigure.less';

function ItemFigure(props) {
  const { itemData, detailHandler } = props;
  const days = 3;// 计算出来
  const userEmail = 'diroguan@foxmail.com';


  const contentLayout = {
    xs: 24,
    sm: 8,
  };

  return (
    <div className={styles.wrapper} onClick={detailHandler}>
      <div className={styles.iconWrapper}>
        <Gravatar 
          email={userEmail} 
          className={styles.gravatar}
          default="monsterid"
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
