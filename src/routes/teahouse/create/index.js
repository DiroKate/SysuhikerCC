import React from 'react';
import { Tabs, Row, Col,Table, Form, Input,Radio } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './create.less';

const { TabPane } = Tabs;

class createForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorContent: null,
    }
  }
  onEditorStateChange = (editorContent) => {
    this.setState({
      editorContent,
    });
  }

  render() {
    const { editorContent } = this.state;
    const { form, dispatch } = this.props;
    const { getFieldDecorator, validateFieldsAndScroll } = form;

    const formItems = [];
    const typeOptions = ['作业','攻略','技术讨论', '活动讨论', '户外安全', '其他'];

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

    formItems.push(
      <Form.Item
        {...formItemLayout}
        label="标题"
        hasFeedback
      >
        {getFieldDecorator('title', {
          rules: [{ required: true, message:'请输入标题', whitespace: true }],
        })(
          <Input />,
      )}
      </Form.Item>
    );

    formItems.push(
      <Form.Item
        {...formItemLayout}
        label="分类"
        hasFeedback
      >
        {getFieldDecorator('type', {
          rules: [
          { required: true, message: '请选择活动类型' },
          ],
        })(
          <Radio.Group>
            { Object.keys(typeOptions).map(key => (
              <Radio value={typeOptions[key]}>{typeOptions[key]}</Radio>
          ))}
          </Radio.Group>,
    )}
      </Form.Item>
    );

    formItems.push(
      <Form.Item
        {...formItemLayout}
        label="文章内容"
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
            image: { uploadCallback: this.uploadImageCallBack },
          }}
          editorState={editorContent}
          onEditorStateChange={this.onEditorStateChange}
        />
      </Form.Item>
      );

    return (
    <Form>
      {formItems}
    </Form>
    );
  }
}

const CreateForm = Form.create()(createForm);

function CreatePage ({teahouseList, isLogin}) {
	
	return (
    <div className="sysuhiker-top-wrapper">
      <Row>
        <Col>
          <p>afadfasdfasdfas</p>
          <CreateForm />
          </Col>
      </Row>
    </div>
  );
}


export default CreatePage;