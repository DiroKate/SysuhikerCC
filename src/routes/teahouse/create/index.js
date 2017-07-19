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
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { notificaionUtils } from '../../../utils';
import styles from './create.less';

const BreadcrumbItem = Breadcrumb.Item;

class createForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorContent: null,
    };
  }
  onEditorStateChange = (editorContent) => {
    this.setState({ editorContent });
  }

  render() {
    const { editorContent } = this.state;
    const { form, dispatch, isLogin } = this.props;
    const { getFieldDecorator, validateFieldsAndScroll } = form;

    const onSubmitHandle = (e) => {
      e.preventDefault();

      if (isLogin) {
        validateFieldsAndScroll((err, values) => {
          if (!err) {
            const { title, type, keywords } = values;
            const contentValue = editorContent
              ? draftToHtml(convertToRaw(editorContent.getCurrentContent()))
              : '';
            if (contentValue.length < 1) {
              notificaionUtils('warning', '正文不能为空');
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

            this.setState({ editorContent: null });
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
    const typeOptions = ['作业攻略', '技术讨论', '活动讨论', '户外安全', '其他'];

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
      </Form.Item>,
    );

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
            {Object.keys(typeOptions).map(key => (
              <Radio value={typeOptions[key]}>{typeOptions[key]}</Radio>
            ))}
          </Radio.Group>,
        )}
      </Form.Item>,
    );

    formItems.push(
      <Form.Item {...formItemLayout} label="文章内容" hasFeedback>
        <Editor
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
              uploadCallback: this.uploadImageCallBack,
            },
          }}
          editorState={editorContent}
          onEditorStateChange={this.onEditorStateChange}
        />
      </Form.Item>,
    );
    formItems.push(
      <Form.Item {...formItemLayout} label="关键字" hasFeedback>
        {getFieldDecorator('keywords')(<Input />)}
      </Form.Item>,
    );

    formItems.push(
      <Form.Item wrapperCol={{
        span: 12,
        offset: 6,
      }}
      >
        <Button className={styles.submitBtn} type="primary" onClick={onSubmitHandle}>
          发布话题
        </Button>

      </Form.Item>,
    );

    return (
      <Form>
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
