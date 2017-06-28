import React from 'react';
import { Table, Form, Button } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Avatar } from './..';
import styles from './ForumBoard.less';

const FormItem = Form.Item;

function ForumItem(props) {
  const { dataSource } = props;
  console.log('ForumItem: ', props);
  const { userEmail, re_createUserNick: userName, re_detail: content, re_createTime: createAt } = props;
  return (
    <div className={styles.forumItem}>
      <div className={styles.forumItemIconWrapper}>
        <Avatar
          email="default@default.com"
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

function ForumBoard(props) {
  const { dataSource, handleSubmit } = props;

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
      <Table dataSource={dataSource} columns={columns} showHeader={false} />

      <Form onSubmit={handleSubmit}>
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
          />
        </FormItem>
        <FormItem wrapperCol={{ span: 3, offset: 20 }}>
          <Button size="large" type="primary" htmlType="submit">发表评论</Button>
        </FormItem>
      </Form>
    </div>
  );
}
export default ForumBoard;
