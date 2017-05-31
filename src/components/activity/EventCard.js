import React from 'react';
import { Timeline, Row, Col, Icon } from 'antd';
import styles from './EventCard.less';

function EventCard(props) {
  const { data } = props;

  const eventCardCallback = ({ iconType, title, content }) => {
    return (
      <Row className={styles.event_card_row}>
        <Col span={8} >
          <Icon type={iconType} />
          <div className={styles.event_card_title}>
            {title}
          </div >
        </Col >
        <Col offset={1} className={styles.event_card_content}>
          {content}
        </Col>
      </Row>
    );
  };

  return (
    <Timeline className={styles.event_card}>
      <Timeline.Item color="green">
        {eventCardCallback({
          iconType: 'rocket',
          title: '出发地:',
          content: data.departure,
        })}
      </Timeline.Item>
      <Timeline.Item color="green">
        {eventCardCallback({
          iconType: 'environment-o',
          title: '目的地:',
          content: data.arrivals,
        })}
      </Timeline.Item>
      <Timeline.Item color="red">
        {eventCardCallback({
          iconType: 'calendar',
          title: '行程日期:',
          content: `${data.start_at}  至   ${data.end_at}`,
        })}
      </Timeline.Item>
      <Timeline.Item color="blue">
        {eventCardCallback({
          iconType: 'clock-circle-o',
          title: '集合时间:',
          content: data.collection_time,
        })}
      </Timeline.Item>
      <Timeline.Item color="blue">
        {eventCardCallback({
          iconType: 'star-o',
          title: '集合地点:',
          content: data.collection_location,
        })}
      </Timeline.Item>
    </Timeline>
  );
}

export default EventCard;
