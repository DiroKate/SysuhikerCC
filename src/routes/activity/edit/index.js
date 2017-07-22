import React from 'react';
import { connect } from 'dva';
import { browserHistory } from 'dva/router';
import moment from 'moment';
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
import { EditorState } from 'draft-js';

import { config, notificaionUtils, uploadImageCallBack, DraftUtils, needLogin } from '../../../utils';

import styles from './activityEdit.less';

const { RangePicker } = DatePicker;
const { htmlToEditorState, editorStateToHtml } = DraftUtils;

class editForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }
  onEditorStateChange = (editorState) => {
    this.setState({ editorState });
  }

  render() {
    const { form, data, isLogin, onSubmit } = this.props;
    const { getFieldDecorator, validateFieldsAndScroll } = form;
    const { event_starttime, event_endtime,
      event_join_starttime, event_join_endtime,
      event_gather_time } = data;

    const activityTime = [
      moment(event_starttime),
      moment(event_endtime),
    ];

    const applyTime = [
      moment(event_join_starttime),
      moment(event_join_endtime),
    ];
    const collectionTime = event_gather_time ? moment(event_gather_time) : moment(event_starttime);


    const formItems = [];
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 3,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 20,
        },
      },
    };
    const datePickProps = {
      format: 'YYYY-MM-DD HH:mm',
      showTime: {
        format: 'HH:mm',
      },
    };

    /**
   * 表单项：字符串Input组件的表单项
   * @param  {[String]} label   [表单名称]
   * @param  {[ID]} id      [表单ID]
   * @param  {[String]} message [表单的提示语]
   * @param  {[String]} initialValue [表单的初始值]
   * @return {[type]}         [description]
   */
    const stringInputValidate = ({ label, id, message, initialValue }) => (
      <Form.Item {...formItemLayout} label={label} hasFeedback>
        {getFieldDecorator(id, {
          rules: [
            {
              required: true,
              message,
              whitespace: true,
            },
          ],
          initialValue,
        })(<Input />)}
      </Form.Item>
    );

    /**
     * 活动名称
     */
    formItems.push(stringInputValidate({ label: '活动名称', id: 'event_name', message: '请输入活动名称', initialValue: data.event_name }));

    /**
     * 活动类型
     */
    const { activityTypesData } = config;
    formItems.push(
      <Form.Item {...formItemLayout} label="活动类型" hasFeedback>
        {getFieldDecorator('event_type', {
          rules: [
            {
              required: true,
              message: '请选择活动类型',
            },
          ],
          initialValue: data.event_type,
        })(
          <Radio.Group>
            {Object.keys(activityTypesData).map(key => (
              <Radio value={activityTypesData[key]}>{activityTypesData[key]}</Radio>
            ))}
          </Radio.Group>,
        )}
      </Form.Item>,
    );

    /**
     * 出发地
     */
    formItems.push(stringInputValidate({
      label: '出发地',
      id: 'event_place_of_departure',
      message: '请输入出发地',
      initialValue: data.event_place_of_departure,
    }));

    /**
     * 目的地
     */
    formItems.push(stringInputValidate({
      label: '目的地',
      id: 'event_destination',
      message: '请输入目的地',
      initialValue: data.event_destination,
    }));

    /**
     * 活动时间
     */
    const rangePickerValidate = ({ label, id, initialValue }) => (
      <Form.Item {...formItemLayout} label={label} id={id}>
        {getFieldDecorator(id, {
          rules: [
            {
              type: 'array',
              required: true,
              message: '请选择时间段。',
            },
          ],
          initialValue,
        })(
          <RangePicker {...datePickProps} />)}
      </Form.Item>
     );
    formItems.push(rangePickerValidate({ label: '活动时间', id: 'activityTime', initialValue: activityTime }));

    /**
     * 活动最大人数
     */
    formItems.push(<Form.Item
      labelCol={{
        xs: {
          span: 24,
        },
        sm: {
          span: 3,
        },
      }}
      wrapperCol={{
        xs: {
          span: 24,
        },
        sm: {
          span: 3,
        },
      }}
      label="人数上限"
      hasFeedback
    >
      {getFieldDecorator('event_maxhiker', {
        rules: [
          {
            required: true,
            messge: '请输入活动最大人数',
          }, {
            type: 'string',
            pattern: /^[0-9]+$/,
            message: '请输入数字',
          },
        ],
        initialValue: data.event_maxhiker,
      })(
        <Input />)}
    </Form.Item>);

    /**
     * 集合地点
     */
    formItems.push(stringInputValidate({
      label: '集合地点',
      id: 'event_gather_location',
      message: '请输入集合地点',
      initialValue: data.event_gather_location,
    }));

    /**
     * 集合时间
     */
    formItems.push(<Form.Item {...formItemLayout} label="集合时间" hasFeedback>
      {getFieldDecorator('event_gather_time', {
        rules: [
          {
            type: 'object',
            required: true,
            messge: '请输入集合时间',
          },
        ],
        initialValue: collectionTime,
      })(
        <DatePicker {...datePickProps} />)}
    </Form.Item>);

    /**
     * 报名时间
     */
    formItems.push(rangePickerValidate({ label: '报名时间', id: 'applyTime', initialValue: applyTime }));

    /**
     * 正文内容
     */
    if (data.event_detail) {
      const odlEditorContent = htmlToEditorState(data.event_detail);

      formItems.push(<Form.Item
        {...formItemLayout}
        label={(
          <span>
         活动内容&nbsp;
         <Tooltip title="写明活动的细节">
           <Icon type="question-circle-o" />
         </Tooltip>
          </span>
     )}
        hasFeedback
      >
        <Editor
          localization={{ locale: 'zh' }}
          toolbarClassName={styles.editorToolbar}
          wrapperClassName={styles.editorWrapper}
          editorClassName={styles.editorEditor}
          toolbar={{
            inline: {
              inDropdown: true,
            },
            list: {
              inDropdown: true,
            },
            textAlign: {
              inDropdown: true,
            },
            link: {
              inDropdown: true,
            },
            history: {
              inDropdown: true,
            },
            image: {
              uploadCallback: uploadImageCallBack,
            },
          }}
          defaultEditorState={odlEditorContent}
          onEditorStateChange={this.onEditorStateChange}
        />
      </Form.Item>);
    }

     /**
      * 备注
      */
    formItems.push(<Form.Item {...formItemLayout} label="备注" hasFeedback>
      {getFieldDecorator('event_comments', {
        initialValue: data.event_comments,
      })(
        <Input type="textarea" />)}
    </Form.Item>);

    /**
     * 确认按钮
     */
    formItems.push(<Form.Item wrapperCol={{
      span: 12,
      offset: 6,
    }}
    >
      <Button className={styles.submitBtn} type="primary" htmlType="submit">
        确认修改
      </Button>

    </Form.Item>);

    const onSubmitHandle = (e) => {
      e.preventDefault();
      needLogin(isLogin,
         () => {
           validateFieldsAndScroll((err, values) => {
             if (!err) {
               const retValues = values;
               const { contentValue, isEmpty } = editorStateToHtml(this.state.editorState);
               if (isEmpty) {
                 notificaionUtils('warning', '正文不能为空');
                 notificaionUtils('warning', '请点击一下正文');
                 return;
               }
               retValues.activityDetail = contentValue;
               onSubmit({
                 ...values,
                 event_detail: contentValue,
               });
             }
           });
         });
    };

    return (
      <Form onSubmit={onSubmitHandle}>
        {formItems}
      </Form>
    );
  } // render end

}
const EditForm = Form.create()(editForm);

function ActivityEditPage({ activityDetails, dispatch, isLogin }) {
  const breadcrumbDiv = (
    <Breadcrumb style={{
      margin: '12px 0',
      fontSize: '1.2em',
    }}
    >
      <Breadcrumb.Item>
        <a href="/activity">活动列表</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        {`修改活动: ${activityDetails.event_name}`}
      </Breadcrumb.Item>
    </Breadcrumb>
  );

  const handleSubmit = (params) => {
    console.log('handleSubmit');
    dispatch({
      type: 'activity/editActivity',
      payload: params,
    });
  };
  return (
    <div className={styles.wrapper}>
      {breadcrumbDiv}

      <Alert className={styles.warnMessage} message="请认真填写活动详情。" type="warning" />
      <EditForm
        data={{
          ...activityDetails,
        }}
        onSubmit={handleSubmit}
        isLogin={isLogin}
      />
    </div>
  );
}

function mapStateToProps(state) {
  const { activityDetails } = state.activity;
  return { activityDetails, isLogin: state.app.isLogin };
}

export default connect(mapStateToProps)(ActivityEditPage);
