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
import { convertToRaw ,EditorState, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { notificaionUtils } from '../../../utils';
import styles from './edit.less';

const BreadcrumbItem = Breadcrumb.Item;

class editForm extends React.Component {
  constructor(props) {
    console.log('editForm',props)
    super(props);
    this.state = {
      editorContent: null,
      initFlag: false,
    };
    if (props.data.post_detail) {
      this.initEditor(props)
    }
  }
  onEditorStateChange = (editorContent)=>{
    this.setState({ editorContent });
  }
  initEditor(props){
    const sampleMarkup = props.data.post_detail;
    const blocksFromHTML = convertFromHTML(sampleMarkup);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    this.setState({
      editorContent: EditorState.createWithContent(contentState),
      initFlag: true
    })
  }

  componentWillReceiveProps(nextProps){
    if (!this.state.initFlag) {
      this.initEditor(nextProps)
    }
  }

  render() {
    const { editorContent } = this.state;
    const { form, dispatch, isLogin, data } = this.props;
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
              type: 'teahouse/editTopic',
              payload: {
                post_title: title,
                post_type: type,
                post_detail: contentValue,
                post_keywords: keywords,
              },
            });
            this.setState({ editorContent: EditorState.createEmpty() });
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
          initialValue: data.post_title,
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
          initialValue: data.post_type,
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
        {getFieldDecorator('keywords',{initialValue:data.post_keywords})(<Input />)}
      </Form.Item>,
    );

    formItems.push(
      <Form.Item wrapperCol={{
        span: 12,
        offset: 6,
      }}
      >
        <Button className={styles.submitBtn} type="primary" onClick={onSubmitHandle}>
          确认修改
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

const EditForm = Form.create()(editForm);

function EditPage({ isLogin, dispatch,details }) {
  return (
    <div className="sysuhiker-top-wrapper">
      <h1>修改话题</h1>
      
      <Row style={{
        marginTop: '16px',
      }}
      >
        <Col>
          <EditForm isLogin={isLogin} dispatch={dispatch} data={details} />
        </Col>
      </Row>
    </div>
  );
}
function mapStateToProps(state) {
  const { mode, isLogin, userId } = state.app;
  const { details } = state.teahouse;
  return { mode, isLogin, userId,details };
}

export default connect(mapStateToProps)(EditPage);
