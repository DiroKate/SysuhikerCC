import React from 'react';
import moment from 'moment';
import { Row, Col, Avatar } from 'antd';
import { days } from '../../utils';
import styles from './LeaderInfo.less';

function LeaderInfo(props) {
  const { data } = props;
  const rightNow = moment().format('YYYY-MM-DD HH:mm:ss');

  return (
    <Row className={styles.content_leader} type="flex" justify="left" align="middle">
      <Col span={8}>
        <Avatar
          src={data.avatar}
          size="large"
        >{data.nick ? data.nick.substr(0, 1).toUpperCase() : ''}</Avatar>

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
