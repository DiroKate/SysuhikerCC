import React from 'react';
import { Timeline, Row, Col } from 'antd';
import { LocalIcon } from '..';
import styles from './EventCard.less';

function EventCard(props) {
  const { data } = props;

  const eventCardCallback = ({ iconType, title, content }) => {
    return (
      <Row className={styles.event_card_row}>
        <Col span={6}>
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
          content: data.event_place_of_departure
            ? data.event_place_of_departure
            : '未知',
        })}
      </Timeline.Item>
      <Timeline.Item className={styles.timeLine} color="green">
        {eventCardCallback({
          iconType: 'mudedi',
          title: '目的地:',
          content: data.event_destination
            ? data.event_destination
            : '未知',
        })}
      </Timeline.Item>
      <Timeline.Item className={styles.timeLine} color="red">
        {eventCardCallback({ iconType: 'calendar', title: '行程日期:', content: `${data.event_starttime}  至   ${data.event_endtime}` })}
      </Timeline.Item>
      <Timeline.Item className={styles.timeLine} color="red">
        {eventCardCallback({ iconType: 'clock1', title: '报名截止:', content: data.event_join_endtime })}
      </Timeline.Item>
      <Timeline.Item className={styles.timeLine} color="blue">
        {eventCardCallback({
          iconType: 'clock',
          title: '集合时间:',
          content: data.event_gather_time
            ? data.event_gather_time
            : '未指定',
        })}
      </Timeline.Item>
      <Timeline.Item className={styles.timeLine} color="blue">
        {eventCardCallback({
          iconType: 'jihedidian',
          title: '集合地点:',
          content: data.event_gather_location
            ? data.event_gather_location
            : '未指定',
        })}
      </Timeline.Item>
    </Timeline>
  );
}

export default EventCard;
