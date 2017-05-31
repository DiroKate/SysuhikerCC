import React from 'react';
import { Row, Col } from 'antd';
import styles from './LeaderInfo.less';

function LeaderInfo(props) {
  const { data } = props;
  return (
    <Row className={styles.content_leader} type="flex" justify="left" align="middle">
      <Col span={8}>
        <img
          src={data.leader_icon}
          role="presentation"
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
