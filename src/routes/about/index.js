import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';

import { About } from '../../components';

const TabPane = Tabs.TabPane;
const { SysuhikerDescription, DevelopTabPane, ContactUs } = About;

function aboutPage({mode}) {
  const tabPosition = mode?"top":"left";
  return (
    <div className="sysuhiker-top-wrapper">
      <Tabs tabPosition={tabPosition}>
        <TabPane tab="逸仙徒步" key="SysuhikerDescription"><SysuhikerDescription /></TabPane>
        <TabPane tab="平台开发" key="DevelopTabPane"><DevelopTabPane /></TabPane>
        <TabPane tab="联系我们" key="ContactUs"><ContactUs /></TabPane>
      </Tabs>
    </div>
  );
}
function mapStateToProps(state) {
  const { mode } = state.app;
  return {
    mode,
  };
}

export default connect(mapStateToProps)(aboutPage);
