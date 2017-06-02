import React from 'react';
import { Table } from 'antd';
import styles from './ForumBoard.less';

function ForumItem(props) {
  const { iconUrl, userName, content, createAt } = props;
  return (
    <div className={styles.forumItem}>
      <div className={styles.forumItemIconWrapper}>
        <img
          src={iconUrl}
          role="presentation"
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
  const { totalNums, dataSource } = props;
  // console.log(dataSource);
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
    </div>
  );
}
export default ForumBoard;
