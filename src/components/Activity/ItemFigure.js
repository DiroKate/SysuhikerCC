import React from 'react';
import { Row, Col, Tag, Icon } from 'antd';
import { Avatar } from './..';
import { days, compareDays } from '../../utils';
import styles from './ItemFigure.less';

function ItemFigure(props) {
  const { detailHandler, event_leader_email } = props;

  const OpenTag = (
    compareDays(props.event_starttime, Date()) ?
      (<Tag color="orange">报名中</Tag>) : (<Tag color="red">报名结束</Tag>)
  );

  const contentLayout = {
    xs: 24,
    sm: 8,
  };

  return (
    <div className={styles.wrapper} onClick={detailHandler}>
      <div className={styles.iconWrapper}>
        <Avatar
          email={event_leader_email}
          className={styles.gravatar}
        />
      </div>
      <div className={styles.contentWrapper}>
        <h1>{props.event_name}</h1>
        <span className={styles.leaderSpan}>
          <h3>{props.event_leader}</h3>
          <p>{props.event_comments}</p>
        </span>
        <Row gutter={16}>
          <Col {...contentLayout}>
            <img
              style={{ maxHeight: '150px', maxWidth: '100%' }}
              src={props.event_pic}
              alt="活动图片"
            />
          </Col>
          <Col>
            <p style={{ fontSize: '0.8rem' }}>
              {props.event_abstract}
            </p>
          </Col>
        </Row>
        <Row
          className={styles.tagInfo}
          type="flex"
          gutter={16}
        >
          <Col>{OpenTag}</Col>
          <Col><Tag color="green">{props.event_type}</Tag></Col>
          <Col>
            <span className={styles.inlineSpan}><Icon type="environment-o" /><p>{props.event_starttime}</p>
            </span>
          </Col>
          <Col><p>{days(props.event_starttime, props.event_endtime)}天</p></Col>
          <Col>
            <span className={styles.inlineSpan}>
              <Icon type="team" /><p>{props.event_membernum}/{props.event_membermax}</p>
            </span>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ItemFigure;
