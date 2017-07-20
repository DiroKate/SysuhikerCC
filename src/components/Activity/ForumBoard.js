import React from 'react';
import { browserHistory } from 'dva/router';
import { Table, Form, Button, Modal } from 'antd';
import Avatar from 'react-avatar';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { notificaionUtils } from '../../utils';
import styles from './ForumBoard.less';

const FormItem = Form.Item;

function ForumItem(props) {
  const { re_createUserEmail: userEmail, re_createUserNick: userName, re_detail: content, re_createTime: createAt, re_createUserAvatarUrl: avatarUrl } = props;
  return (
    <div className={styles.forumItem}>
      <div className={styles.forumItemIconWrapper}>
        <Avatar round size={32} src={avatarUrl} name={userName.substr(0, 1).toUpperCase()} />
      </div>
      <div className={styles.forumItemWrapper}>
        <p className={styles.forumItemWrapperUser}>
          {userName}
        </p>
        <div
          className={styles.forumItemWrapperContent}
          key="content"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
        <p>{createAt}</p>
      </div>
    </div>
  );
}

class ForumBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({ editorState });
  };

  handleSubmit = () => {
    if (this.props.isLogin) {
      const { editorState } = this.state;
      const contentValue = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      if (editorState.getCurrentContent().getPlainText().length < 1) {
        notificaionUtils('warning', '正文不能为空');
        return;
      }
      this.props.handle(contentValue);
      this.setState({ editorState: EditorState.createEmpty() });
    } else {
      Modal.warning({
        title: '尚未登录',
        content: '报名活动需要先注册登录，跳转到登录页面？',
        iconType: 'meh-o',
        onOk() {
          browserHistory.push('/login');
        },
      });
    }
  }

  render() {
    const { dataSource } = this.props;

    const totalNums = dataSource.length;

    const header = (
      <div className={styles.header}>
        <span>
          <h1>讨论</h1>
          <p>({totalNums})</p>
        </span>
      </div>
    );

    const columns = [
      {
        title: '讨论区',
        key: 'ForumBoard',
        render: (text, record) => (<ForumItem {...record} />),
      },
    ];
    return (
      <div>
        {header}
        <Table
          dataSource={dataSource}
          columns={columns}
          showHeader={false}
          locale={{
            emptyText: '居然没有人讨论',
          }}
        />

        <Form>
          <FormItem>
            <Editor
              toolbarClassName={styles.editorToolbar}
              wrapperClassName={styles.editorWrapper}
              editorClassName={styles.editorEditor}
              toolbar={{
                options: [
                  'inline', 'colorPicker', 'link', 'emoji', 'history',
                ],
                inline: {
                  options: ['bold', 'italic', 'underline'],
                },
              }}
              editorState={this.state.editorState}
              onEditorStateChange={this.onEditorStateChange}
            />
          </FormItem>
          <FormItem wrapperCol={{
            span: 3,
            offset: 20,
          }}
          >
            <Button size="large" type="primary" onClick={this.handleSubmit}>发表评论</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
export default ForumBoard;
