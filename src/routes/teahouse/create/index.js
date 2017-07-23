import React from 'react';
import { connect } from 'dva';
import { browserHistory } from 'dva/router';
import {
  Row,
  Col,
  Breadcrumb,
  Form,
  Button,
  Input,
  Radio,
  Modal,
} from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { notificaionUtils, uploadImageCallBack, config } from '../../../utils';
import styles from './create.less';

const BreadcrumbItem = Breadcrumb.Item;

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
    const { form, dispatch, isLogin } = this.props;
    const { getFieldDecorator, validateFieldsAndScroll } = form;

    const onSubmitHandle = (e) => {
      e.preventDefault();

      if (isLogin) {
        validateFieldsAndScroll((err, values) => {
          if (!err) {
            const { title, type, keywords } = values;
            const contentValue = draftToHtml(convertToRaw(editorState.getCurrentContent()));
            if (editorState.getCurrentContent().getPlainText().length < 1) {
              notificaionUtils('warning', '正文不能为空');
              notificaionUtils('warning', '请点击一下正文');
              return;
            }
            dispatch({
              type: 'teahouse/postNewTopic',
              payload: {
                post_title: title,
                post_type: type,
                post_detail: contentValue,
                post_keywords: keywords,
              },
            });
          }
        });
      } else {
        Modal.warning({
          title: '尚未登录',
          content: '评论需要先注册登录，跳转到登录页面？',
          iconType: 'meh-o',
          onOk() {
            browserHistory.push('/login');
          },
        });
      }
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
        })(
          <Radio.Group>
            {Object.keys(bbsTypeOptions).map(key => (
              <Radio value={bbsTypeOptions[key]}>{bbsTypeOptions[key]}</Radio>
        ))}
          </Radio.Group>)}
      </Form.Item>);

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
          onEditorStateChange={this.onEditorStateChange}
        />
      </Form.Item>);
    formItems.push(
      <Form.Item {...formItemLayout} label="关键字" hasFeedback>
        {getFieldDecorator('keywords')(<Input />)}
      </Form.Item>);

    formItems.push(
      <Form.Item wrapperCol={{
        span: 12,
        offset: 6,
      }}
      >
        <Button className={styles.submitBtn} type="primary" htmlType="submit">
        发布话题
      </Button>

      </Form.Item>);

    return (
      <Form onSubmit={onSubmitHandle}>
        {formItems}
      </Form>
    );
  }
}

const CreateForm = Form.create()(createForm);

function CreatePage({ isLogin, dispatch }) {
  return (
    <div className="sysuhiker-top-wrapper">
      <h1>畅所欲言</h1>
      <Breadcrumb style={{
        margin: '12px 0',
        fontSize: '1.2em',
      }}
      >
        <BreadcrumbItem>
          <a href="/bbs">逸仙茶馆</a>
        </BreadcrumbItem>
        <BreadcrumbItem>创建话题</BreadcrumbItem>
      </Breadcrumb>
      <Row style={{
        marginTop: '16px',
      }}
      >
        <Col>
          <CreateForm isLogin={isLogin} dispatch={dispatch} />
        </Col>
      </Row>
    </div>
  );
}
function mapStateToProps(state) {
  const { mode, isLogin, userId } = state.app;
  return { mode, isLogin, userId };
}

export default connect(mapStateToProps)(CreatePage);
