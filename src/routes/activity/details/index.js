import React from 'react';
import { connect } from 'dva';
import { Breadcrumb, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import EventCard from '../../../components/activity/EventCard.js';
import LeaderInfo from '../../../components/activity/LeaderInfo.js';
import MemberList from '../../../components/activity/MemberList.js';
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
          <h1>{fakeData.title}</h1>
          <LeaderInfo data={fakeData} />
          <EventCard data={fakeData} />
          <Example />
        </Col>
        <Col span={8} offset={1}>
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
