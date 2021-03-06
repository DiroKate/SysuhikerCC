import React from 'react';
import { connect } from 'dva';
import { browserHistory } from 'dva/router';
import { Tabs, Row, Col, Table, Modal } from 'antd';
import { CreateButton } from '../../components';

const { TabPane } = Tabs;

function Teahouse({ isLogin, list, total, dispatch }) {
  const createHandler = () => {
    if (isLogin) {
      browserHistory.push('/bbs/create');
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

  const onPageChange = (pagination) => {
    dispatch({
      type: 'teahouse/getTopicList',
      payload: { page: pagination.current, pagesize: pagination.pageSize },
    });
  };
  const rowClickHandler = (record) => {
    const { post_id: topicId } = record;
    browserHistory.push(`/bbs/${topicId}`);

    // TODO: 增加跳转到详细到帖子详情
  };

  const columns = [
    {
      title: '类型',
      dataIndex: 'post_type',
      key: 'post_type',
    }, {
      title: '标题',
      dataIndex: 'post_title',
      key: 'post_title',
    }, {
      title: '作者',
      dataIndex: 'post_createUserNick',
      key: 'post_createUserNick',
    }, {
      title: '关键字',
      dataIndex: 'post_keywords',
      key: 'post_keywords',
    }, {
      title: '回复',
      dataIndex: 'post_countRe',
      key: 'post_countRe',
    }, {
      title: '最后更新',
      render: (text, record) => {
        const { post_modifyTime: updateTime, post_modifyUserNick: userNick } = record;
        return (
          <p>{`${userNick || ''} 于 ${updateTime}`}</p>
        );
      },
    }];

  const callback = (topic) => {
    dispatch({
      type: 'teahouse/getTopicList',
      payload: {
        pagesize: 10,
        page: 1,
        post_type: topic,
      },
    });
  };

  const TabData = {
    all: '全部',
    作业攻略: '作业攻略',
    技术讨论: '技术讨论',
    活动讨论: '活动讨论',
    户外安全: '户外安全',
    其他: '其他',
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
          <Table
            dataSource={list}
            columns={columns}
            onChange={onPageChange}
            onRowClick={rowClickHandler}
            pagination={{
              total,
            }}
          />

        </Col>
        <Col xs={24} sm={6}>
          <CreateButton
            btnLabel="创建话题"
            createHandler={createHandler}
            alertLabel={{
              message: '畅所欲言',
              description: '想灌水想发布攻略想寻求其他帮助？发个贴吧！',
              type: 'success',
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total } = state.teahouse;
  const { isLogin } = state.app;
  return { list, total, isLogin };
}

export default connect(mapStateToProps)(Teahouse);
