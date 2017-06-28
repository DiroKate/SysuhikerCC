import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Breadcrumb, Row, Col } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { Activity } from '../../../components';
import styles from './index.less';

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
  const { activityDetails, activityLeader, isLogin, activityJoinList } = props;

  const createMarkup = () => {
    return { __html: activityDetails.event_detail };
  };

  const leaderInfoProps = {
    ...activityLeader,
    createtime: activityDetails.event_createtime,
  };

  const memberListProps = {
    ...activityDetails,
    isLogin,
    activityJoinList,
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
              <LeaderInfo data={leaderInfoProps} />
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
          <MemberList data={memberListProps} />
        </Col>
      </Row>
    </div>
  );
}
Details.propTypes = {
  activityDetails: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    isLogin: state.app.isLogin,
    activityDetails: state.activity.activityDetails,
    activityLeader: state.activity.activityLeader,
    activityJoinList: state.activity.activityJoinList,
  };
}

export default connect(mapStateToProps)(Details);
