import React from 'react';
import { connect } from 'dva';
import { browserHistory } from 'dva/router';
import {
	Breadcrumb,
	DatePicker,
	Radio,
	Row,
	Col,
	Alert,
	Form,
	Input,
	Button,
	Icon,
	Tooltip,
} from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const { RangePicker } = DatePicker;

function ActivityEditPage() {
  return (<div />);
}

function mapStateToProps(state) {
  const { activityDetails } = state.activity;
  return { activityDetails, isLogin: state.app.isLogin };
}

export default connect(mapStateToProps)(ActivityEditPage);
