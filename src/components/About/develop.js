import React from 'react';
import { Tag, Card, Row, Col, Icon } from 'antd';
import { LocalIcon } from '../../components';
import styles from './develop.less';

function DevelopTabPane() {
  return (
    <div>

      <h2>sysuhiker 是一个平台，主要供组织活动的时候报名使用.</h2>
      <br />
      <p><LocalIcon type="guanwang" />唯一官网：<a href="http://sysuhiker.cc">http://sysuhiker.cc</a>
      </p>
      <br />
      <p>欢迎各位码农宅男加入逸仙徒步活动平台系统的开发,贡献免费劳动力，使之功能更健全更易用，方便咱广大驴友。</p>
      <br />
      <h3>有意者请联系</h3>

      <Row type="flex" gutter={24}>
        <Col
          xs={{
            span: 20,
            offset: 2,
          }}
          sm={{
            span: 10,
            offset: 0,
          }}
        >
          <Card className={styles.card}>
            <h3><LocalIcon type="php" className={styles.icon} />后端</h3>
            <p><Icon type="user" className={styles.fontSize} />
              later</p>
            <p><Icon type="mail" className={styles.fontSize} />
              later.h.p@qq.com</p>
            <p><Icon type="github" className={styles.fontSize} />
              <a href="https://github.com/later2015/sysuhiker">later2015/sysuhiker</a>
            </p>
            <p><Icon type="tags" className={styles.fontSize} />
              <Tag>PHP</Tag>
              <Tag>bootstrap</Tag>
              <Tag>jquery</Tag>
              <Tag>SAE</Tag>
              <Tag>mysql</Tag>
            </p>
          </Card>
        </Col>
        <Col
          xs={{
            span: 20,
            offset: 2,
          }}
          sm={{
            span: 10,
            offset: 0,
          }}
        >
          <Card className={styles.card}>
            <h3><LocalIcon type="react" className={styles.icon} />前端</h3>
            <p><Icon type="user" className={styles.fontSize} />
              diroguan</p>
            <p><Icon type="mail" className={styles.fontSize} />
              diroguan@foxmail.com</p>
            <p><Icon type="github" className={styles.fontSize} />
              <a href="https://github.com/DiroKate/SysuhikerCC">DiroKate/SysuhikerCC</a>
            </p>
            <p><Icon type="tags" className={styles.fontSize} />
              <Tag>Node.js</Tag>
              <Tag>Reactjs</Tag>
              <Tag>antd</Tag>
              <Tag>dva</Tag>
              <Tag>roadhog</Tag>
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default DevelopTabPane;
