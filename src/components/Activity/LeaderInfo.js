import React from 'react';
import { Row, Col } from 'antd';
import { Avatar } from './..';
import styles from './LeaderInfo.less';

function LeaderInfo(props) {
  const { data } = props;
  // const userEmail = 'yuyun233@qq.com';

  return (
    <Row className={styles.content_leader} type="flex" justify="left" align="middle">
      <Col span={8}>
        <Avatar
          path="/yay.jpg"
          className={styles.gravatar}
          custom
        />

      </Col>
      <Col>
        <h2>
          {data.leader}
        </h2>
        <div>{data.create_at}</div>
      </Col>
    </Row>
  );
}
export default LeaderInfo;