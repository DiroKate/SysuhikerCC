import React from 'react';
import { connect } from 'dva';
import { browserHistory } from 'dva/router';
import { Tabs, Table, Row, Col, Modal } from 'antd';
import { Activity } from '../../components';
import { compareDays } from '../../utils';

const { ItemFigure, CreateButton } = Activity;


const { TabPane } = Tabs;

function ActivityRoute({ activityList, isLogin }) {
  // const { list } = activity;
  console.log(activityList);

  const createHandler = () => {
    if (isLogin) {
      browserHistory.push('/activity/create');
    } else {
      Modal.warning({
        title: '尚未登录',
        content: '报名活动需要先注册登录，跳转到登录页面？',
        iconType: 'meh-o',
        onOk() {
          browserHistory.push('/login');
        },
      });
    }
  };


  const allActivityData = activityList.map(item => ({
    key: item.event_id,
    ...item,
    detailHandler: () => {
      browserHistory.push(`/activity/details/${item.event_id}`);
    },
  }));

  const getHotActivityData = () => (
    allActivityData.filter(element => (compareDays(element.event_join_endtime, Date())))
  );

  const hotActivityData = getHotActivityData();
  const columns = [
    {
      title: '讨论区',
      key: 'ItemFigure',
      render: (text, record) => (<ItemFigure {...record} />),
    },
  ];

  const allActivity = (<Table dataSource={allActivityData} columns={columns} showHeader={false} />);

  const hotActivity = (<Table dataSource={hotActivityData} columns={columns} showHeader={false} />);


  return (
    <div className="sysuhiker-top-wrapper">
      <Row gutter={24}>
        <Col xs={24} sm={18}>
          {/* <Tabs defaultActiveKey="1" onChange={callback}> */}
          <Tabs defaultActiveKey="1">
            <TabPane tab="全部活动" key="1">
              {allActivity}
            </TabPane>
            <TabPane tab="报名ING" key="2">
              {hotActivity}
            </TabPane>
          </Tabs>
        </Col>
        <Col xs={24} sm={6}>
          <CreateButton createHandler={createHandler} />
        </Col>
      </Row>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    activityList: state.activity.list,
    isLogin: state.app.isLogin,
  };
}

export default connect(mapStateToProps)(ActivityRoute);
