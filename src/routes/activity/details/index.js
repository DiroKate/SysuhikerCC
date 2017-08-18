import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Breadcrumb, Row, Col } from 'antd';
import QueueAnim from 'rc-queue-anim';

import { Editor } from 'react-draft-wysiwyg';
import { Activity } from '../../../components';
import { compareDays, DraftUtils } from '../../../utils';

import styles from './index.less';

const { EventCard, LeaderInfo, MemberList, ForumBoard } = Activity;
const BreadcrumbItem = Breadcrumb.Item;

function Details(props) {
  const {
    dispatch,
    activityDetails,
    activityLeader,
    isLogin,
    activityJoinList,
    activityReList,
    userId,
  } = props;

  const isExpired = compareDays(Date(), activityDetails.event_endtime);
  const isAdmin = (userId === activityLeader.id);
  const isMember = () => {
    for (const member of activityJoinList) {
      if (member.event_joinlist_userid === userId) {
        return true;
      }
    }
    return false;
  };
  const contentState = DraftUtils.htmlToEditorState(activityDetails.event_detail);

  const leaderInfoProps = {
    ...activityLeader,
    createtime: activityDetails.event_createtime,
  };

  const memberListProps = {
    ...activityDetails,
    isLogin,
    activityJoinList,
    isAdmin,
    isMember: isMember(),
    isExpired,
    dispatch,
  };

  const addReForumHandle = (params) => {
    dispatch({ type: 'activity/addReForum', payload: params });
  };
  // const editReForumHandle = (params) => {
  //   dispatch({ type: 'activity/editReForum', payload: params });
  // };

  return (
    <div className={styles.details_page}>
      <Breadcrumb style={{
        margin: '12px 0',
        fontSize: '1.2em',
      }}
      >
        <BreadcrumbItem>
          <a href="/activity">活动列表</a>
        </BreadcrumbItem>
        <BreadcrumbItem>活动详情</BreadcrumbItem>
      </Breadcrumb>
      <Row>
        <Col
          xs={{
            span: 24,
          }}
          sm={{
            span: 15,
          }}
        >
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
            <div key="content">
              <Editor
                readOnly
                defaultEditorState={contentState}
                toolbarHidden
                toolbarClassName="show-editor-empty-toolbar"
              />
            </div>


          </QueueAnim>
        </Col>
        <Col
          xs={{
            span: 24,
          }}
          sm={{
            span: 9,
          }}
        >
          <MemberList data={memberListProps} />
        </Col>
      </Row>
      <Row>
        <Col
          xs={{
            span: 24,
          }}
          sm={{
            span: 15,
          }}
        >
          <ForumBoard dataSource={activityReList} userId={userId} isLogin={isLogin} handle={addReForumHandle} />
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
    userId: state.app.userId,
    activityDetails: state.activity.activityDetails,
    activityLeader: state.activity.activityLeader,
    activityJoinList: state.activity.activityJoinList,
    activityReList: state.activity.activityReList,
  };
}

export default connect(mapStateToProps)(Details);
