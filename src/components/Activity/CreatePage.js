import React from 'react';
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
import { notificaionUtils,uploadImageCallBack } from '../../utils';

import styles from './CreatePage.less';

const { RangePicker } = DatePicker;

class createForm extends React.Component {
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
    const { editorState } = this.state;
    const { form, dispatch } = this.props;
    const { getFieldDecorator, validateFieldsAndScroll } = form;
    const formItems = [];

    const handleSubmit = (e) => {
      e.preventDefault();
      validateFieldsAndScroll((err, values) => {
        if (!err) {
          const retValues = values;
          const contentValue = draftToHtml(convertToRaw(editorState.getCurrentContent()));
          if (editorState.getCurrentContent().getPlainText().length < 1) {
            notificaionUtils('warning', '正文不能为空');
            notificaionUtils('warning', '请点击一下正文');
            return;
          }
          retValues.activityDetail = contentValue;
          dispatch({ type: 'activity/postActivity', payload: retValues });
        }
      });
    };

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

    /**
   * 表单项：字符串Input组件的表单项
   * @param  {[String]} label   [表单名称]
   * @param  {[ID]} id      [表单ID]
   * @param  {[String]} message [表单的提示语]
   * @return {[type]}         [description]
   */
    const stringInputValidate = ({ label, id, message }) => (
      <Form.Item {...formItemLayout} label={label} id={id} hasFeedback>
        {getFieldDecorator(id, {
          rules: [
            {
              required: true,
              message,
              whitespace: true,
            },
          ],
        })(
          <Input />)}
      </Form.Item>
    );

    const datePickProps = {
      format: 'YYYY-MM-DD HH:mm',
      showTime: {
        format: 'HH:mm',
      },
    };
    const rangeConfig = {
      rules: [
        {
          type: 'array',
          required: true,
          message: '请选择时间段。',
        },
      ],
    };
    const rangePickerValidate = ({ label, id }) => (
      <Form.Item {...formItemLayout} label={label} id={id}>
        {getFieldDecorator(id, rangeConfig)(
          <RangePicker {...datePickProps} />)}
      </Form.Item>
    );

    const title = (stringInputValidate({ label: '活动名称', id: 'activityTitle', message: '请输入活动名称' }));

    const activityTypesData = [
      '休闲拉练',
      '正常拉练',
      '极限拉练',
      '休闲露营',
      '长线露营',
      '休闲户外',
      '非户外活动AA约伴',
    ];
    const activityType = (
      <Form.Item {...formItemLayout} label="活动类型" id="activityType" hasFeedback>
        {getFieldDecorator('activityType', {
          rules: [
            {
              required: true,
              message: '请选择活动类型',
            },
          ],
        })(
          <Radio.Group>
            {Object.keys(activityTypesData).map(key => (
              <Radio value={activityTypesData[key]}>{activityTypesData[key]}</Radio>
          ))}
          </Radio.Group>)}
      </Form.Item>
    );

    const departure = (stringInputValidate({ label: '出发地', id: 'departure', message: '请输入出发地' }));

    const arrivals = (stringInputValidate({ label: '目的地', id: 'arrivals', message: '请输入目的地' }));

    const activityTime = (rangePickerValidate({ label: '活动时间', id: 'activityTime' }));

    const maxPeople = (
      <Form.Item
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
        id="maxPeople"
        hasFeedback
      >
        {getFieldDecorator('maxPeople', {
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
        })(
          <Input />)}
      </Form.Item>
    );

    const collectionLocation = (stringInputValidate({ label: '集合地点', id: 'collectionLocation', message: '请输入集合地点' }));

    const collectionTime = (
      <Form.Item {...formItemLayout} label="集合时间" id="collectionTime" hasFeedback>
        {getFieldDecorator('collectionTime', {
          rules: [
            {
              type: 'object',
              required: true,
              messge: '请输入集合时间',
            },
          ],
        })(
          <DatePicker {...datePickProps} />)}
      </Form.Item>
    );

    const applyTime = (rangePickerValidate({ label: '报名时间', id: 'applyTime' }));

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
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
        />
      </Form.Item>
    );

    const notes = (
      <Form.Item {...formItemLayout} label="备注" id="notes" hasFeedback>
        {getFieldDecorator('notes')(
          <Input type="textarea" />)}
      </Form.Item>
    );

    const warnMessage = (<Alert className={styles.warnMessage} message="请再次确认无误后发布。" type="warning" />);

    const submitBtn = (
      <Form.Item wrapperCol={{
        span: 12,
        offset: 6,
      }}
      >
        <Button className={styles.submitBtn} type="primary" htmlType="submit" size="large" onClick={handleSubmit}>
          发布活动
        </Button>

      </Form.Item>
    );

    formItems.push(title);
    formItems.push(activityType);
    formItems.push(departure);
    formItems.push(arrivals);
    formItems.push(activityTime);
    formItems.push(maxPeople);
    formItems.push(collectionLocation);
    formItems.push(collectionTime);
    formItems.push(applyTime);
    formItems.push(activityContent);
    formItems.push(notes);
    formItems.push(warnMessage);
    formItems.push(submitBtn);

    return (
      <Form onSubmit={handleSubmit}>
        {formItems}
      </Form>
    );
  }
}
const CreateForm = Form.create()(createForm);

function CreatePage(props) {
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
        发布活动
      </Breadcrumb.Item>
    </Breadcrumb>
  );

  const gridProps = {
    xs: {
      offset: 1,
      span: 22,
    },
    sm: {
      offset: 2,
      span: 20,
    },
  };

  return (
    <div className={styles.wrapper}>
      {breadcrumbDiv}
      <Row>
        <Col {...gridProps}>
          <Alert className={styles.warnMessage} message="请认真填写活动详情。" type="warning" />
          <CreateForm {...props} />
        </Col>
      </Row>
    </div>
  );
}
export default CreatePage;
