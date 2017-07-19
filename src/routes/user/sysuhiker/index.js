import React from 'react';
import { connect } from 'dva';
import { browserHistory } from 'dva/router';
import { Card, Row, Col, Tabs, Icon } from 'antd';
import Avatar from 'react-avatar';
import createG2 from 'g2-react';
import { Stat } from 'g2';
import { LocalIcon } from '../../../components';
import ShowForm from './showForm.js';

import styles from './sysuhiker.less';






function Sysuhiker({ mode, loginUser, isLogin }) {
  if (!isLogin) {
    browserHistory.push('/login');
    return (<div />);
  }
  const colProps1 = {
    xs: { span: 24 },
    sm: { span: 5 },
  };
  const colProps2 = {
    xs: { span: 24 },
    sm: { span: 15 },
  };
  const rowProps = {
    gutter: 24,
    // align: 'middle',
    // justify: 'start',
  };

  const defaultAvatar = loginUser.user_nick ? loginUser.user_nick.substr(0, 1).toUpperCase() : '逸仙徒步';

  const userAvatar = (
    <Card style={{width: "200px"}} bodyStyle={{ padding: '1rem' }}>
      <Avatar
        size={160}
        src={loginUser.user_avatar_url}
        name={defaultAvatar}
      />
      <div style={{marginTop: "1rem"}}>
        <h2>{loginUser.user_nick}<LocalIcon type={loginUser.user_gender === 'gg' ? 'male' : 'female'} colorful className={styles.genderIcon} />
        </h2>
        <p><Icon type="mail" style={{ marginTop: '0.5rem', marginRight: '0.5rem' }} />{loginUser.user_email}</p>
        <p><Icon type="smile-o" style={{ marginRight: '0.5rem' }} />{loginUser.user_comments}</p>
      </div>
    </Card>
  );
  const userAvatarMobile =(
    <Card bodyStyle={{ padding: '1rem' }}>
      <Row>
        <Col xs={{span:12}}>
          <Avatar
            size={144}
            src={loginUser.user_avatar_url}
            name={defaultAvatar}
          />
        </Col>
        <Col xs={{span:12}} style={{padding:"1rem 0"}}>
          <h2>{loginUser.user_nick}<LocalIcon type={loginUser.user_gender === 'gg' ? 'male' : 'female'} colorful className={styles.genderIcon} />
          </h2>
          <p><Icon type="mail" style={{ marginTop: '0.5rem', marginRight: '0.5rem' }} />{loginUser.user_email}</p>
          <p><Icon type="smile-o" style={{ marginRight: '0.5rem' }} />{loginUser.user_comments}</p>
        </Col>
      </Row>
    </Card>
  );

  const {user_start_event_count,user_join_event_count,user_fly_event_count}=loginUser
  const data = [
    { name: '参加活动数', value: 1 },
    { name: '飞机数', value: 1 },
    { name: '组织活动数', value: 1 },
    // { name: '参加活动数', value: user_join_event_count },
    // { name: '飞机数', value: user_fly_event_count },
    // { name: '组织活动数', value: user_start_event_count },
  ];
  //统计扇形图
  const Chart = createG2((chart) => {
  chart.coord('theta', {
    radius: 1.0, // 设置饼图的大小
  });
  chart.legend('name', {
    position: 'bottom',
    itemWrap: true,
    formatter(val) {
      for (let i = 0, len = data.length; i < len; i += 1) {
        const obj = data[i];
        if (obj.name === val) {
          return `${val}: ${obj.value}次`;
        }
      }
    },
  });
  chart.tooltip({
    title: null,
    map: {
      value: 'value',
    },
  });
  chart.intervalStack()
    .position(Stat.summary.percent('value'))
    .color('name')
    .label('name*value', (name, value) => {
      return `${name} ${value}次`;
    });
  chart.render();

  // 设置默认选中
  const geom = chart.getGeoms()[0]; // 获取所有的图形
  const items = geom.getData(); // 获取图形对应的数据
  geom.setSelected(items[0]); // 设置选中
});

  const fanChart = (
    <div>
      <Chart
        data={data}
        width={400}
        height={400}
        forceFit
      />
    </div>
  );

  const showForm = (
    <ShowForm 
      styles={{margin:"2rem 0"}}
      nick={loginUser.user_nick}
      gender={loginUser.user_gender}
      email={loginUser.user_email}
      name={loginUser.user_name}
      phone={loginUser.user_phone}
      address={loginUser.user_address}
      qq={loginUser.user_qq}
      weibo={loginUser.user_weiboName}
      weiboLink={loginUser.user_weiboLink}
      interest={loginUser.user_interest}
      urgentName={loginUser.user_urgentName}
      urgentPhone={loginUser.user_urgentPhone}
    />
  );

  const webWrapper = (
    <div className={styles.wrapperWeb} >
      <Row {...rowProps}>
        <Col {...colProps1} >
          {userAvatar}
        </Col>
        <Col {...colProps2} >
          <Tabs>
            <Tabs.TabPane tab="总览" key="Overview">
              {fanChart}
              {showForm}
            </Tabs.TabPane>
            <Tabs.TabPane tab="设置" key="Setting">Setting</Tabs.TabPane>
            {}
          </Tabs>
        </Col>
      </Row>
    </div>
  );
  const mobileWrapper = (
    <div className={styles.wrapperMobile} >
      <Row {...rowProps}>
        <Col {...colProps1} >
          {userAvatarMobile}
        </Col>
        <Col {...colProps2} >
          <Tabs>
            <Tabs.TabPane tab="总览" key="Overview">
              {fanChart}
              {showForm}
            </Tabs.TabPane>
            <Tabs.TabPane tab="设置" key="Setting">Setting</Tabs.TabPane>
            {}
          </Tabs>
        </Col>
      </Row>
    </div>
  );

  return (mode? mobileWrapper:webWrapper);
}

function mapStateToProps(state) {
  const { mode, loginUser, isLogin } = state.app;
  return {
    mode, loginUser, isLogin,
  };
}

export default connect(mapStateToProps)(Sysuhiker);
