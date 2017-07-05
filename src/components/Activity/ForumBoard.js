import React from 'react';
import { browserHistory } from 'dva/router';
import { Table, Form, Button, Modal } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Avatar } from './..';
import styles from './ForumBoard.less';

const FormItem = Form.Item;

function ForumItem(props) {
  const { re_createUserEmail: userEmail,
    re_createUserNick: userName,
    re_detail: content,
    re_createTime: createAt } = props;
  return (
    <div className={styles.forumItem}>
      <div className={styles.forumItemIconWrapper}>
        <Avatar
          email={userEmail}
          className={styles.gravatar}
        />
      </div>
      <div className={styles.forumItemWrapper}>
        <p className={styles.forumItemWrapperUser}>
          {userName}
        </p>
        <div
          className={styles.forumItemWrapperContent}
          key="content"
          dangerouslySetInnerHTML={{ __html: content }}
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
      editorContent: null,
    };
  }

  onEditorStateChange = (editorContent) => {
    this.setState({
      editorContent,
    });
  };

  handleSubmit =() => {
    if (this.props.isLogin) {
      const { editorContent } = this.state;
      const contentValue = editorContent ? draftToHtml(convertToRaw(editorContent.getCurrentContent())) : '';
      this.props.handle(contentValue);
      this.setState({
        editorContent: null,
      });
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
          <h1>讨论</h1><p>({totalNums})</p>
        </span>
      </div>
    );

    const columns = [
      {
        title: '讨论区',
        key: 'ForumBoard',
        render: (text, record) => (
          <ForumItem {...record} />
        ),
      },
    ];
    return (
      <div>
        {header}
        <Table
          dataSource={dataSource}
          columns={columns}
          showHeader={false}
          locale={{ emptyText: '居然没有人讨论' }}
        />

        <Form>
          <FormItem>
            <Editor
              toolbarClassName={styles.editorToolbar}
              wrapperClassName={styles.editorWrapper}
              editorClassName={styles.editorEditor}
              toolbar={{
                options: ['inline', 'colorPicker', 'link', 'emoji', 'history'],
                inline: {
                  options: ['bold', 'italic', 'underline'],
                },
              }}
              editorState={this.state.editorContent}
              onEditorStateChange={this.onEditorStateChange}
            />
          </FormItem>
          <FormItem wrapperCol={{ span: 3, offset: 20 }}>
            <Button size="large" type="primary" onClick={this.handleSubmit}>发表评论</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
export default ForumBoard;
