import React from 'react';
import { Table, Form, Button } from 'antd';
import Avatar from 'react-avatar';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { notificaionUtils, DraftUtils, needLogin } from '../../utils';
import styles from './ForumBoard.less';

const FormItem = Form.Item;
const { htmlToEditorState, editorStateToHtml } = DraftUtils;


function ForumItem(props) {
  const { re_createUserEmail: userEmail, re_createUserNick: userName, re_detail: content, 
    re_createTime: createAt, re_createUserAvatarUrl: avatarUrl, re_id: reId, onEdit, 
    userId, re_createUserId } = props;

  const onEditClick = () => {
    onEdit(reId);
  };

  return (
    <div className={styles.forumItem}>
      <div className={styles.forumItemIconWrapper}>
        <Avatar round size={32} src={avatarUrl} name={userName.substr(0, 1).toUpperCase()} />
      </div>
      <div className={styles.forumItemWrapper}>
        <p className={styles.forumItemWrapperUser}>
          {userName}
        </p>
        <Editor
          readOnly
          defaultEditorState={htmlToEditorState(content)}
          toolbarHidden
          toolbarClassName="show-editor-empty-toolbar"
        />
        {/*
          userId===re_createUserId?(<span className={styles.tableEditorPane}>
          <a onClick={onEditClick}>编辑</a>
        </span>): null
        */}
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
    needLogin(this.props.isLogin,
      () => {
        const { editorState } = this.state;
        const { contentValue, isEmpty } = editorStateToHtml(editorState);
        if (isEmpty) {
          notificaionUtils('warning', '正文不能为空');
          return;
        }
        this.props.handle(contentValue);
        this.setState({ editorState: EditorState.createEmpty() });
      },
    '报名活动需要先注册登录，跳转到登录页面？');
  }

  render() {
    const { dataSource, userId, editReForumHandle } = this.props;

    const totalNums = dataSource.length;

    const header = (
      <div className={styles.header}>
        <span>
          <h1>讨论</h1>
          <p>({totalNums})</p>
        </span>
      </div>
    );
    // const onEditHandle = (reId) => {
    //   console.log('onEditHandle', reId);
    //   editReForumHandle({
    //     reId,
    //   });

    // };
    const columns = [
      {
        title: '讨论区',
        key: 'ForumBoard',
        render: (text, record) => (<ForumItem {...record} userId={userId} />),
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
              localization={{ locale: 'zh' }}
              toolbarClassName={styles.editorToolbar}
              wrapperClassName={styles.editorWrapper}
              editorClassName={styles.editorEditor}
              toolbarOnFocus
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
