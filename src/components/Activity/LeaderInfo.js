import React from 'react';
import { Row, Col } from 'antd';
import Gravatar from 'react-gravatar';
import styles from './LeaderInfo.less';

function LeaderInfo(props) {
  const { data } = props;
  const userEmail = 'diroguan@foxmail.com';

  return (
    <Row className={styles.content_leader} type="flex" justify="left" align="middle">
      <Col span={8}>
        <Gravatar 
          email={userEmail} 
          className={styles.gravatar}
          default="monsterid"
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
