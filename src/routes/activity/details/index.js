import React from 'react';
import { connect } from 'dva';
import { Breadcrumb, Row, Col, Timeline } from 'antd';
import PropTypes from 'prop-types';
import styles from './index.less';
import example from '../../../assets/example.html';

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
  collection_at: '2017-09-28 19:00',
  content: example,
};

function Details(props) {
  const { userDetails } = props;


  return (
    <div className={styles.detailsPage}>
      <Breadcrumb style={{ margin: '12px 0', 'font-size': '1.2em' }}>
        <BreadcrumbItem>
          <a href="/activity">活动列表</a>
        </BreadcrumbItem>
        <BreadcrumbItem>活动详情</BreadcrumbItem>
      </Breadcrumb>
      <Row>
        <Col span={15} className={styles.content}>
          <h1>{fakeData.title}</h1>
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
          <Timeline>
            <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item color="red">
              <p>Solve initial network problems 1</p>
              <p>Solve initial network problems 2</p>
              <p>Solve initial network problems 3 2015-09-01</p>
            </Timeline.Item>
            <Timeline.Item>
              <p>Technical testing 1</p>
              <p>Technical testing 2</p>
              <p>Technical testing 3 2015-09-01</p>
            </Timeline.Item>
          </Timeline>
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
