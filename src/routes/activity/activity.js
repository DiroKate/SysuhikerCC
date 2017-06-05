import React from 'react';
import { connect } from 'dva';
// import QueueAnim from 'rc-queue-anim';
import { browserHistory } from 'dva/router';
import { Tabs, Table, Row, Col } from 'antd';
import { Activity } from '../../components';

import styles from './activity.less';

const { ItemFigure, CreateButton } = Activity;


const { TabPane } = Tabs;

function ActivityRoute() {
  const createHandler = () => {
    browserHistory.push('/activity/create');
  };

  const detailHandler = () => {
    browserHistory.push(`/activity/details/${itemData.id}`);
  };
  const itemData = {
    title: '爬山爬山！！',
    leader: 'diroguan',
    iconUrl: '/icon.png',
    startAt: '2017-06-04',
    memberNum: '10',
    memberTop: '12',
    content: '当人们纷纷奔向婺源、罗平等地赏花的时候，一些喜欢户外徒步的广东驴友在韶关发现了一个小镇，这个小镇有几个自然的村落，每年的春天，这里遍地都是桃花、梨花、油菜花、李花，成为花的海洋……于是，一传十，十传百，人们纷纷前往这里看花，这个小镇渐渐成为广东最著名的民间赏花圣地。九峰赏花有几个最佳观赏点，基本上都是在九峰镇的村里，他们是：茶料村、坪石村、小廊、上廊、横坑村、大廊、鹅颈凹（沿溪山茶场）。',
    id: 'abcdefg',
    notes: '这就是传说中的备注',
  };
  const allActivityData = [
    {
      key: 1,
      itemData,
      detailHandler,
    }, {
      key: 2,
      itemData,
      detailHandler,
    }, {
      key: 3,
      itemData,
      detailHandler,
    },
  ];
  const hotActivityData = [
    {
      key: 1,
      itemData,
      detailHandler,
    },
  ];
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
    <div className={styles.wrapper}>
      <Row className={styles.content} gutter={24}>
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
  // return (
  //   <Details />
  // );
}
export default connect()(ActivityRoute);
