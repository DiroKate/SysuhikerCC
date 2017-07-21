import React from 'react';
import { connect } from 'dva';
import { browserHistory } from 'dva/router';
import { Tabs, Table, Row, Col, Modal } from 'antd';

function ActivityEditPage () {
	return(<div />)

}
function mapStateToProps(state) {
  const { list, total } = state.activity;
  return { activityList: list, total, isLogin: state.app.isLogin };
}

export default connect(mapStateToProps)(ActivityEditPage);