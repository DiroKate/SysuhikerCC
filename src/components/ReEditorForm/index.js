import React from 'react';
import { Form, Button } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { notificaionUtils, uploadImageCallBack, DraftUtils } from '../../utils';
import styles from './styles.less';

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
    const { onSubmit, data } = this.props;

    const onSubmitHandle = (e) => {
      e.preventDefault();

      const { contentValue, isEmpty } = editorStateToHtml(editorState);
      if (isEmpty) {
        notificaionUtils('warning', '正文不能为空');
        notificaionUtils('warning', '请点击一下正文');
        return;
      }
      onSubmit({ contentValue, reId: data.reId });
    };

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

    if (data.content) {
      const odlEditorContent = htmlToEditorState(data.content);
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

const ReEditorForm = Form.create()(editForm);
export default ReEditorForm;
