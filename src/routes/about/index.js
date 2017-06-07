import React from 'react';
import { Tabs } from 'antd';

import { About } from '../../components';

const TabPane = Tabs.TabPane;
const { SysuhikerDescription, DevelopTabPane, ContactUs } = About;

function aboutPage() {
  return (
    <div className="sysuhiker-top-wrapper">
      <Tabs tabPosition="left">
        <TabPane tab="逸仙徒步" key="SysuhikerDescription"><SysuhikerDescription /></TabPane>
        <TabPane tab="平台开发" key="DevelopTabPane"><DevelopTabPane /></TabPane>
        <TabPane tab="联系我们" key="ContactUs"><ContactUs /></TabPane>
      </Tabs>
    </div>
  );
}
export default aboutPage;
