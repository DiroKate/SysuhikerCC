import React from 'react';
import { connect } from 'dva';
import { Breadcrumb, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';

import { Activity } from '../../../components';

import styles from './index.less';
import Example from './example.js';

const { EventCard, LeaderInfo, MemberList, ForumBoard } = Activity;
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
  deadline: '2017-08-01 00:00:00',
  collection_time: '2017-09-28 19:00',
  collection_location: '白云机场',
  // content: example,
};
const forumBoardProps = {
  totalNums: 5,
  dataSource: [
    {
      key: '1',
      userEmail:"111@qq.com",
      userName: 'diroguan',
      content: '博学，审问，慎思，明辨，笃行',
      createAt: '2017-06-03 00:10:05',
    }, {
      key: '2',
      userEmail:"111@qq.com",
      userName: 'diroguan',
      content: '博学，审问，慎思，明辨，笃行',
      createAt: '2017-06-03 00:10:05',
    }, {
      key: '3',
      userEmail:"111@qq.com",
      userName: 'diroguan',
      content: '博学，审问，慎思，明辨，笃行',
      createAt: '2017-06-03 00:10:05',
    }, {
      key: '4',
      userEmail:"111@qq.com",
      userName: 'diroguan',
      content: '博学，审问，慎思，明辨，笃行',
      createAt: '2017-06-03 00:10:05',
    },
  ],
};

function Details(props) {
  const { userDetails } = props;


  return (
    <div className={styles.details_page}>
      <Breadcrumb style={{ margin: '12px 0', fontSize: '1.2em' }}>
        <BreadcrumbItem>
          <a href="/activity">活动列表</a>
        </BreadcrumbItem>
        <BreadcrumbItem>活动详情</BreadcrumbItem>
      </Breadcrumb>
      <Row>
        <Col span={15}>
          <QueueAnim delay={200}>
            <div key="title">
              <h1>{fakeData.title}</h1>
            </div>
            <div key="LeaderInfo">
              <LeaderInfo data={fakeData} />
            </div>
            <div key="EventCard">
              <EventCard data={fakeData} />
            </div>
            <div key="content">
              <Example />
            </div>
            <div key="forum">
              <ForumBoard {...forumBoardProps} />
            </div>
          </QueueAnim>
        </Col>
        <Col span={9}>
          <MemberList />
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
