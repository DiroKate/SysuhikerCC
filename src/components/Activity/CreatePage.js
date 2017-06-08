import React from 'react';
import { Breadcrumb, DatePicker, TimePicker, Radio, Row, Col, Alert, Form, Input, Button, Icon, Tooltip } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import styles from './CreatePage.less';


function createForm(props) {
  const { form } = props;
  const { getFieldDecorator } = form;

  const uploadImageCallBack = () => {
    console.log('上传图片');
  };

  const formItems = [];

  const handleSubmit = () => {
    console.log('submitsubmitsubmitsubmitsubmit');
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 3 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

  const emptyInputValidate = ({ label, id, message }) => (
    <Form.Item
      {...formItemLayout}
      label={label}
      id={id}
      hasFeedback
    >
      {getFieldDecorator(id, {
        rules: [{ required: true, message, whitespace: true }],
      })(
        <Input />,
      )}
    </Form.Item>
  );

  const title = (
    emptyInputValidate({
      label: '活动名称',
      id: 'activityTitle',
      message: '请输入活动名称',
    })
  );
  formItems.push(title);

  const activityTypesData = ['休闲拉练', '正常拉练', '极限拉练', '休闲露营', '长线露营', '休闲户外', '非户外活动AA约伴'];
  const activityType = (
    <Form.Item
      {...formItemLayout}
      label="活动类型"
      id="activityType"
      hasFeedback
    >
      {getFieldDecorator('activityType', {
        rules: [
          { required: true, message: '请选择活动类型' },
        ],
      })(
        <Radio.Group>
          { Object.keys(activityTypesData).map(key => (
            <Radio value={key}>{activityTypesData[key]}</Radio>
          ))}
        </Radio.Group>,
    )}
    </Form.Item>
  );
  formItems.push(activityType);

  const departure = (
    emptyInputValidate({
      label: '出发地',
      id: 'departure',
      message: '请输入出发地',
    })
  );
  formItems.push(departure);

  const arrivals = (
    emptyInputValidate({
      label: '目的地',
      id: 'arrivals',
      message: '请输入目的地',
    })
  );
  formItems.push(arrivals);


  const startAt = (
    <Form.Item
      {...formItemLayout}
      label="活动开始时间"
      id="startAt"
      hasFeedback
    >
      {getFieldDecorator('startAt', {
        rules: [{ required: true, messge: '请输入活动开始时间' }],
      })(
        <div><DatePicker /><TimePicker /></div>,
      )}
    </Form.Item>
  );
  formItems.push(startAt);

  const endAt = (
    <Form.Item
      {...formItemLayout}
      label="活动结束时间"
      id="endAt"
      hasFeedback
    >
      {getFieldDecorator('endAt', {
        rules: [{ required: true, messge: '请输入活动结束时间' }],
      })(
        <div><DatePicker /><TimePicker /></div>,
      )}
    </Form.Item>
  );
  formItems.push(endAt);

  const maxPeople = (
    <Form.Item
      labelCol={{ xs: { span: 24 }, sm: { span: 3 } }}
      wrapperCol={{ xs: { span: 24 }, sm: { span: 3 } }}
      label="人数上限"
      id="maxPeople"
      hasFeedback
    >
      {getFieldDecorator('endAt', {
        rules: [{ type: 'string', pattern: /^[0-9]+$/, message: '请输入数字' }, { required: true, messge: '请输入活动结束时间' }],
      })(
        <Input />,
      )}
    </Form.Item>
  );
  formItems.push(maxPeople);

  const collectionLocation = (
    emptyInputValidate({
      label: '集合地点',
      id: 'collectionLocation',
      message: '请输入集合地点',
    })
  );
  formItems.push(collectionLocation);

  const collectionTime = (
    <Form.Item
      {...formItemLayout}
      label="集合时间"
      id="collectionTime"
      hasFeedback
    >
      {getFieldDecorator('collectionTime', {
        rules: [{ required: true, messge: '请输入集合时间' }],
      })(
        <div><DatePicker /><TimePicker /></div>,
      )}
    </Form.Item>
  );
  formItems.push(collectionTime);

  const startApply = (
    <Form.Item
      {...formItemLayout}
      label="开始报名时间"
      id="startApply"
      hasFeedback
    >
      {getFieldDecorator('startApply', {
        rules: [{ required: true, messge: '请输入开始报名时间' }],
      })(
        <div><DatePicker /><TimePicker /></div>,
      )}
    </Form.Item>
  );
  formItems.push(startApply);

  const endApply = (
    <Form.Item
      {...formItemLayout}
      label="结束报名时间"
      id="endApply"
      hasFeedback
    >
      {getFieldDecorator('endApply', {
        rules: [{ required: true, messge: '请输入结束报名时间' }],
      })(
        <div><DatePicker /><TimePicker /></div>,
      )}
    </Form.Item>
  );
  formItems.push(endApply);

  const activityContent = (
    <Form.Item
      {...formItemLayout}
      label={(
        <span>
            活动内容&nbsp;
            <Tooltip title="写明活动的细节">
              <Icon type="question-circle-o" />
            </Tooltip>
        </span>
        )}

      id="activityContent"
      hasFeedback
    >
      <Editor
        toolbarClassName={styles.editorToolbar}
        wrapperClassName={styles.editorWrapper}
        editorClassName={styles.editorEditor}
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: { uploadCallback: uploadImageCallBack },
        }}
      />
    </Form.Item>
  );
  formItems.push(activityContent);

  const notes = (
    <Form.Item
      {...formItemLayout}
      label="备注"
      id="notes"
      hasFeedback
    >
      <Input type="textarea" />
    </Form.Item>
  );
  formItems.push(notes);

  const warnMessage = (
    <Alert
      className={styles.warnMessage}
      message="请再次确认无误后发布。"
      type="warning"
    />
  );
  formItems.push(warnMessage);

  const submitBtn = (
    <Form.Item
      wrapperCol={{
        span: 12,
        offset: 6,
      }}
    >
      <Button
        className={styles.submitBtn}
        type="primary"
        htmlType="submit"
        size="large"
        onClick={handleSubmit}
      >
          发布活动
        </Button>

    </Form.Item>
  );
  formItems.push(submitBtn);

  return (
    <Form onSubmit={handleSubmit}>
      {formItems}
    </Form>
  );
}
const CreateForm = Form.create()(createForm);


function CreatePage(props) {
  const breadcrumbDiv = (
    <Breadcrumb style={{ margin: '12px 0', fontSize: '1.2em' }}>
      <Breadcrumb.Item>
        <a href="/activity">活动列表</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        发布活动
      </Breadcrumb.Item>
    </Breadcrumb>
);

  const gridProps = {
    xs: { offset: 1, span: 22 },
    sm: { offset: 2, span: 20 },
  };


  return (
    <div className={styles.wrapper}>
      {breadcrumbDiv}
      <Row><Col {...gridProps} >
        <Alert
          className={styles.warnMessage}
          message="请认真填写活动详情。"
          type="warning"
        />
        <CreateForm {...props} />
      </Col></Row>
    </div>
  );
}
export default CreatePage;
