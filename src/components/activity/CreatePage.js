import React from 'react';
import { Breadcrumb, DatePicker, TimePicker, Radio, Row, Col, Alert, Form, Input, Button } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import styles from './CreatePage.less';


function CreatePage(props) {
  const uploadImageCallBack = () => {
    console.log('上传图片');
  };
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

  const formItems = [];

  const handleSubmit = () => {
    console.log('submitsubmitsubmitsubmitsubmit');
  };

  const title = (
    <Form.Item
      {...formItemLayout}
      label="活动名称"
      id="activityTitle"
      hasFeedback
    >
      <Input />
    </Form.Item>
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
      <Radio.Group>
        {
          Object.keys(activityTypesData).map(key => (
            <Radio value={key}>{activityTypesData[key]}</Radio>
          ))
          // Object.keys(activityTypesData).map((key) => {
          //   console.log(key, activityTypesData[key]);
          //   return (<Radio value={key}>{activityTypesData[key]}</Radio>);
          // })
        }
      </Radio.Group>
    </Form.Item>
  );
  formItems.push(activityType);

  const departure = (
    <Form.Item
      {...formItemLayout}
      label="出发地"
      id="departure"
      hasFeedback
    >
      <Input />
    </Form.Item>
  );

  formItems.push(departure);

  const arrivals = (
    <Form.Item
      {...formItemLayout}
      label="目的地"
      id="arrivals"
      hasFeedback
    >
      <Input />
    </Form.Item>
  );
  formItems.push(arrivals);


  const startAt = (
    <Form.Item
      {...formItemLayout}
      label="活动开始时间"
      id="startAt"
      hasFeedback
    >
      <DatePicker /><TimePicker />
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
      <DatePicker /><TimePicker />
    </Form.Item>
  );
  formItems.push(endAt);

  const collectionLocation = (
    <Form.Item
      {...formItemLayout}
      label="集合时间"
      id="collectionLocation"
      hasFeedback
    >
      <Input />
    </Form.Item>
  );
  formItems.push(collectionLocation);

  const collectionTime = (
    <Form.Item
      {...formItemLayout}
      label="集合时间"
      id="collectionTime"
      hasFeedback
    >
      <DatePicker /><TimePicker />
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
      <DatePicker /><TimePicker />
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
      <DatePicker /><TimePicker />
    </Form.Item>
  );
  formItems.push(endApply);

  const activityContent = (
    <Form.Item
      {...formItemLayout}
      label="活动内容"
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
    <div className={styles.wrapper}>
      {breadcrumbDiv}
      <Row><Col {...gridProps} >
        <Alert
          className={styles.warnMessage}
          message="请认真填写活动详情。"
          type="warning"
        />
        <Form onSubmit={handleSubmit}>
          {formItems}
        </Form>
      </Col></Row>
    </div>
  );
}
export default CreatePage;
