import React from 'react';
import { connect } from 'dva';
import { browserHistory } from 'dva/router';
import { Tabs, Row, Col, Table, Modal } from 'antd';
import { CreateButton } from '../../components';
const { TabPane } = Tabs;

function Teahouse ({teahouseList, isLogin}) {
	

	const createHandler = () => {
		console.log('create a topic')
    // if (isLogin) {
      browserHistory.push('/bbs/create');
    // } else {
    //   Modal.warning({
    //     title: '尚未登录',
    //     content: '报名活动需要先注册登录，跳转到登录页面？',
    //     iconType: 'meh-o',
    //     onOk() {
          // browserHistory.push('/login');
    //     },
    //   });
    // }
	};

  const dataSource = [];

  const columns = [{
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  }, {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  }, {
    title: '作者',
    dataIndex: 'author',
    key: 'author',
  }, {
    title: '关键字',
    dataIndex: 'keyword',
    key: 'keyword',
  }, {
    title: '回复',
    dataIndex: 'reply',
    key: 'reply',
  }, {
    title: '最后更新',
    dataIndex: 'update',
    key: 'update',
  }];

  const callback = (topic) => {
    dataSource.push({
      type:topic,
    title:'thisistitle',
    author:'diro',
    keyword:'a,b,c',
    reply:'12',
    update:'last update at 2017-5-5'
    });
     console.log(dataSource)
  };

  const TabData = {
    all: '全部',
    homework: '作业攻略',
    technology: '技术讨论',
    activity: '活动讨论',
    activity: '户外安全',
    security: '活动讨论',
    other: '其他',
  };
  const tabChildren = Object.keys(TabData).map(key => (
    <TabPane tab={TabData[key]} key={key} />
  ));

	return (
    <div className="sysuhiker-top-wrapper">
      <Row gutter={24}>
        <Col xs={24} sm={18}>
          <Tabs defaultActiveKey="all" onChange={callback} animated={false}>
            {tabChildren}
          </Tabs>
          <Table dataSource={dataSource} columns={columns} />

        </Col>
        <Col xs={24} sm={6}>
          <CreateButton
            btnLabel="创建话题"
            createHandler={createHandler} 
            alertLabel={{
              message: "畅所欲言",
              description: "想灌水想发布攻略想寻求其他帮助？发个贴吧！",
              type: "success",
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(Teahouse);