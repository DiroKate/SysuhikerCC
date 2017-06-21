import React from 'react';
import { connect } from 'dva';
import { Breadcrumb, Row, Col } from 'antd';
import QueueAnim from 'rc-queue-anim';

import { Activity } from '../../../components';

import styles from './index.less';
// import Example from './example.js';

const { EventCard, LeaderInfo, MemberList, ForumBoard } = Activity;
const BreadcrumbItem = Breadcrumb.Item;


const forumBoardProps = {
  totalNums: 5,
  dataSource: [
    {
      key: '1',
      userEmail: '111@qq.com',
      userName: 'diroguan',
      content: '博学，审问，慎思，明辨，笃行',
      createAt: '2017-06-03 00:10:05',
    }, {
      key: '2',
      userEmail: '111@qq.com',
      userName: 'diroguan',
      content: '博学，审问，慎思，明辨，笃行',
      createAt: '2017-06-03 00:10:05',
    }, {
      key: '3',
      userEmail: '111@qq.com',
      userName: 'diroguan',
      content: '博学，审问，慎思，明辨，笃行',
      createAt: '2017-06-03 00:10:05',
    }, {
      key: '4',
      userEmail: '111@qq.com',
      userName: 'diroguan',
      content: '博学，审问，慎思，明辨，笃行',
      createAt: '2017-06-03 00:10:05',
    },
  ],
};

function Details(props) {
  const { activity } = props;
  console.log(activity);
  const { activityDetails } = activity;

  const createMarkup = () => {
    return { __html: activityDetails.event_detail };
  };

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
              <h1>{activityDetails.event_name}</h1>
            </div>
            <div key="LeaderInfo">
              <LeaderInfo data={activityDetails} />
            </div>
            <div key="EventCard">
              <EventCard data={activityDetails} />
            </div>
            <div
              key="content"
              dangerouslySetInnerHTML={createMarkup()}
            />
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
// Details.propTypes = {
//   userDetails: PropTypes.object,
// };
//
function mapStateToProps(state) {
  return {
    app: state.app,
    activity: state.activity,
  };
}

export default connect(mapStateToProps)(Details);
