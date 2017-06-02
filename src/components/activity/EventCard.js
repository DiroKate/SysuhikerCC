import React from 'react';
import { Timeline, Row, Col } from 'antd';
import LocalIcon from '../base/LocalIcon.js';
import styles from './EventCard.less';

function EventCard(props) {
  const { data } = props;

  const eventCardCallback = ({ iconType, title, content }) => {
    return (
      <Row className={styles.event_card_row}>
        <Col span={6} >
          <LocalIcon type={iconType} />
          <div className={styles.event_card_title}>
            {title}
          </div>
        </Col>
        <Col offset={1} className={styles.event_card_content}>
          {content}
        </Col>
      </Row>
    );
  };

  return (
    <Timeline className={styles.event_card}>
      <Timeline.Item className={styles.timeLine} color="green">
        {eventCardCallback({
          iconType: 'rocket',
          title: '出发地:',
          content: data.departure,
        })}
      </Timeline.Item>
      <Timeline.Item className={styles.timeLine} color="green">
        {eventCardCallback({
          iconType: 'mudedi',
          title: '目的地:',
          content: data.arrivals,
        })}
      </Timeline.Item>
      <Timeline.Item className={styles.timeLine} color="red">
        {eventCardCallback({
          iconType: 'calendar',
          title: '行程日期:',
          content: `${data.start_at}  至   ${data.end_at}`,
        })}
      </Timeline.Item>
      <Timeline.Item className={styles.timeLine} color="red">
        {eventCardCallback({
          iconType: 'clock1',
          title: '报名截止:',
          content: data.deadline,
        })}
      </Timeline.Item>
      <Timeline.Item className={styles.timeLine} color="blue">
        {eventCardCallback({
          iconType: 'clock',
          title: '集合时间:',
          content: data.collection_time,
        })}
      </Timeline.Item>
      <Timeline.Item className={styles.timeLine} color="blue">
        {eventCardCallback({
          iconType: 'jihedidian',
          title: '集合地点:',
          content: data.collection_location,
        })}
      </Timeline.Item>
    </Timeline>
  );
}

export default EventCard;
