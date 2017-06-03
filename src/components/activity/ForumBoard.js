import React from 'react';
import { Table, Form, Button } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './ForumBoard.less';

const FormItem = Form.Item;

function ForumItem(props) {
  const { iconUrl, userName, content, createAt } = props;
  return (
    <div className={styles.forumItem}>
      <div className={styles.forumItemIconWrapper}>
        <img
          alt=""
          src={iconUrl}
        />
      </div>
      <div className={styles.forumItemWrapper}>
        <p className={styles.forumItemWrapperUser}>
          {userName}
        </p>
        <p className={styles.forumItemWrapperContent}>
          {content}
        </p>
        <p>{createAt}</p>
      </div>
    </div>
  );
}

function ForumBoard(props) {
  const { totalNums, dataSource, handleSubmit } = props;

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
