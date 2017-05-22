import React from 'react';
import { connect } from 'dva';
import QueueAnim from 'rc-queue-anim';
import { Tabs } from 'antd';
import ItemFigure from '../../components/activity/ItemFigure.js';

import Details from './details';

import styles from './activity.less';

const { TabPane } = Tabs;


function Activity() {
  const callback = (key) => {
    console.log(key);
  };

  const allActivity = (
    <QueueAnim delay={500} className="queue-simple">
      <ItemFigure key="0" />
      <ItemFigure key="1" />
      <ItemFigure key="2" />
    </QueueAnim>
  );

  const hotActivity = (
    <QueueAnim delay={500} className="queue-simple">
      <ItemFigure key="0" />
    </QueueAnim>
  );


  // return (
  //   <div className={styles.content}>
  //     <Tabs defaultActiveKey="1" onChange={callback}>
  //       <TabPane tab="全部活动" key="1">
  //         {allActivity}
  //       </TabPane>
  //       <TabPane tab="报名ING" key="2">
  //         {hotActivity}
  //       </TabPane>
  //     </Tabs>
  //   </div>
  // );
  return (
    <Details />
  );
}
export default connect()(Activity);
