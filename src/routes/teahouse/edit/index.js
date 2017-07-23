import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Form,
  Button,
  Input,
  Radio,
} from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { notificaionUtils, uploadImageCallBack, DraftUtils, needLogin, config } from '../../../utils';
import styles from './edit.less';

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
    const { editorState } = this.state;
    const { form, onSubmit, isLogin, data } = this.props;
    const { getFieldDecorator, validateFieldsAndScroll } = form;

    const onSubmitHandle = (e) => {
      e.preventDefault();

      needLogin(isLogin,
        () => {
          validateFieldsAndScroll((err, values) => {
            if (!err) {
              const { contentValue, isEmpty } = editorStateToHtml(editorState);
              if (isEmpty) {
                notificaionUtils('warning', '正文不能为空');
                notificaionUtils('warning', '请点击一下正文');
                return;
              }
              onSubmit({
                ...values,
                contentValue,
              });
            }
          });
        },
      '评论需要先注册登录，跳转到登录页面？');
    };

    const formItems = [];
    const { bbsTypeOptions } = config;

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

    formItems.push(
      <Form.Item {...formItemLayout} label="标题" hasFeedback>
        {getFieldDecorator('title', {
          rules: [
            {
              required: true,
              message: '请输入标题',
              whitespace: true,
            },
          ],
          initialValue: data.post_title,
        })(<Input />)}
      </Form.Item>);

    formItems.push(
      <Form.Item {...formItemLayout} label="分类" hasFeedback>
        {getFieldDecorator('type', {
          rules: [
            {
              required: true,
              message: '请选择活动类型',
            },
          ],
          initialValue: data.post_type,
        })(
          <Radio.Group>
            {Object.keys(bbsTypeOptions).map(key => (
              <Radio value={bbsTypeOptions[key]}>{bbsTypeOptions[key]}</Radio>
        ))}
          </Radio.Group>)}
      </Form.Item>);

    if (data.post_detail) {
      const odlEditorContent = htmlToEditorState(data.post_detail);
      formItems.push(
        <Form.Item {...formItemLayout} label="文章内容" hasFeedback>
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
    formItems.push(
      <Form.Item {...formItemLayout} label="关键字" hasFeedback>
        {getFieldDecorator('keywords', { initialValue: data.post_keywords })(<Input />)}
      </Form.Item>);

    formItems.push(
      <Form.Item wrapperCol={{
        span: 12,
        offset: 6,
      }}
      >
        <Button className={styles.submitBtn} type="primary" htmlType="submit">
        确认修改
      </Button>

      </Form.Item>);

    return (
      <Form onSubmit={onSubmitHandle}>
        {formItems}
      </Form>
    );
  }
}

const EditForm = Form.create()(editForm);

function EditPage({ isLogin, dispatch, details }) {
  const onSubmitHandle = (params) => {
    const { title, type, contentValue, keywords } = params;
    dispatch({
      type: 'teahouse/editTopic',
      payload: {
        post_title: title,
        post_type: type,
        post_detail: contentValue,
        post_keywords: keywords,
      },
    });
  };
  return (
    <div className="sysuhiker-top-wrapper">
      <h1>修改话题</h1>

      <Row style={{
        marginTop: '16px',
      }}
      >
        <Col>
          <EditForm isLogin={isLogin} onSubmit={onSubmitHandle} data={details} />
        </Col>
      </Row>
    </div>
  );
}
function mapStateToProps(state) {
  const { mode, isLogin, userId } = state.app;
  const { details } = state.teahouse;
  return { mode, isLogin, userId, details };
}

export default connect(mapStateToProps)(EditPage);
