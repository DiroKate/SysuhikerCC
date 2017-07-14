import React from 'react';
import { Row, Col, Breadcrumb, Form, Button, Input, Radio } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
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
    this.setState({
      editorContent,
    });
  }

  render() {
    const { editorContent } = this.state;
    const { form, dispatch } = this.props;
    const { getFieldDecorator, validateFieldsAndScroll } = form;

    const formItems = [];
    const typeOptions = ['作业', '攻略', '技术讨论', '活动讨论', '户外安全', '其他'];

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
          rules: [{ required: true, message: '请输入标题', whitespace: true }],
        })(
          <Input />,
      )}
      </Form.Item>,
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
      </Form.Item>,
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
      </Form.Item>,
      );

    formItems.push(
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
        >
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

function CreatePage({ teahouseList, isLogin }) {
  return (
    <div className="sysuhiker-top-wrapper">
      <h1>畅所欲言</h1>
      <Breadcrumb style={{ margin: '12px 0', fontSize: '1.2em' }}>
        <BreadcrumbItem>
          <a href="/bbs">逸仙茶馆</a>
        </BreadcrumbItem>
        <BreadcrumbItem>创建话题</BreadcrumbItem>
      </Breadcrumb>
      <Row style={{ marginTop: '16px' }}>
        <Col>
          <CreateForm />
        </Col>
      </Row>
    </div>
  );
}


export default CreatePage;
