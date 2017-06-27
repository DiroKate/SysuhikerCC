import React from 'react';
import moment from 'moment';
import { Row, Col } from 'antd';
import { Avatar } from './..';
import { days } from '../../utils';
import styles from './LeaderInfo.less';

function LeaderInfo(props) {
  const { data } = props;
  const rightNow = moment().format('YYYY-MM-DD HH:mm:ss');


  return (
    <Row className={styles.content_leader} type="flex" justify="left" align="middle">
      <Col span={8}>
        <Avatar
          email={data.email}
          className={styles.gravatar}
        />

      </Col>
      <Col>
        <h2>
          {data.nick}
        </h2>
        <div>{`${days(data.createtime, rightNow)}天 之前`}</div>
      </Col>
    </Row>
  );
}
export default LeaderInfo;
