import React from 'react';
import { connect } from 'dva';
import { Breadcrumb, Row, Col, Timeline, Icon } from 'antd';
import PropTypes from 'prop-types';
import styles from './index.less';
import Example from './example.js';


const BreadcrumbItem = Breadcrumb.Item;

const fakeData = {
  title: '国庆西北大环线+额济纳胡杨林自驾游',
  leader: 'diroguan',
  leader_icon: '/icon.png',
  create_at: '2017-05-11 11:55',
  departure: '广州',
  arrivals: '兰州',
  start_at: '2017-09-28',
  end_at: '2017-10-08',
  collection_time: '2017-09-28 19:00',
  collection_location: '白云机场',
  // content: example,
};

function Details(props) {
  const { userDetails } = props;

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

  const eventCard = (
    <Timeline className={styles.event_card}>
      <Timeline.Item color="green">
        {eventCardCallback({
          iconType: 'rocket',
          title: '出发地:',
          content: fakeData.departure,
        })}
      </Timeline.Item>
      <Timeline.Item color="green">
        {eventCardCallback({
          iconType: 'environment-o',
          title: '目的地:',
          content: fakeData.arrivals,
        })}
      </Timeline.Item>
      <Timeline.Item color="red">
        {eventCardCallback({
          iconType: 'calendar',
          title: '行程日期:',
          content: `${fakeData.start_at}  至   ${fakeData.end_at}`,
        })}
      </Timeline.Item>
      <Timeline.Item color="blue">
        {eventCardCallback({
          iconType: 'clock-circle-o',
          title: '集合时间:',
          content: fakeData.collection_time,
        })}
      </Timeline.Item>
      <Timeline.Item color="blue">
        {eventCardCallback({
          iconType: 'star-o',
          title: '集合地点:',
          content: fakeData.collection_location,
        })}
      </Timeline.Item>
    </Timeline>
  );

  const leaderInfo = (
    <Row className={styles.content_leader} type="flex" justify="left" align="middle">
      <Col span={8}>
        <img
          src={fakeData.leader_icon}
          role="presentation"
        />
      </Col>
      <Col>
        <h2>
          {fakeData.leader}
        </h2>
        <div>{fakeData.create_at}</div>
      </Col>
    </Row>
  );

  return (
    <div className={styles.details_page}>
      <Breadcrumb style={{ margin: '12px 0', fontSize: '1.2em' }}>
        <BreadcrumbItem>
          <a href="/activity">活动列表</a>
        </BreadcrumbItem>
        <BreadcrumbItem>活动详情</BreadcrumbItem>
      </Breadcrumb>
      <Row>
        <Col span={15} className={styles.content}>
          <h1>{fakeData.title}</h1>
          {leaderInfo}
          {eventCard}
          <Example />
        </Col>
        <Col span={8} offset={1} className={styles.teamList}>
          aaaaaa
        </Col>
      </Row>


    </div>
  );
}
Details.propTypes = {
  userDetails: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    userDetails: state.userDetails,
  };
}

export default connect(mapStateToProps)(Details);
