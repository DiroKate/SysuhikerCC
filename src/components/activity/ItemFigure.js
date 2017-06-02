import React from 'react';
import { Row, Col, Tag, Icon } from 'antd';
import { browserHistory } from 'dva/router';
import styles from './ItemFigure.less';

function ItemFigure() {
  const itemData = {
    title: '爬山爬山！！',
    author: 'diroguan',
    content: '当人们纷纷奔向婺源、罗平等地赏花的时候，一些喜欢户外徒步的广东驴友在韶关发现了一个小镇，这个小镇有几个自然的村落，每年的春天，这里遍地都是桃花、梨花、油菜花、李花，成为花的海洋……于是，一传十，十传百，人们纷纷前往这里看花，这个小镇渐渐成为广东最著名的民间赏花圣地。九峰赏花有几个最佳观赏点，基本上都是在九峰镇的村里，他们是：茶料村、坪石村、小廊、上廊、横坑村、大廊、鹅颈凹（沿溪山茶场）。',
    id: 'abcdefg',
  };
  const clickHandler = () => {
    browserHistory.push(`/activity/${itemData.id}`);
  };

  return (
    <Row className={styles.activityItem} onClick={clickHandler}>
      <Row className={styles.header} type="flex" justify="left" align="top" gutter={16}>
        <Col md={2}>
          <img
            src="/icon.png"
            role="presentation"
          />
        </Col>
        <Col>
          <h1>{itemData.title}</h1>
          <p>{itemData.author}</p>
        </Col>
      </Row>
      <Row className={styles.content} type="flex" justify="left" align="top" gutter={16}>
        <Col md={{ push: 2, span: 22 }}>
          <Row type="flex" justify="left" align="top" gutter={16}>
            <Col md={{ span: 10 }}>
              <img
                src="/yay.jpg"
                role="presentation"
              />
            </Col>
            <Col md={{ span: 14 }}>
              <p>{itemData.content}</p>
            </Col>
          </Row>
          <Row className={styles.tagNote} type="flex" justify="left" align="top" gutter={16}>
            <Tag color="orange">报名中</Tag>
            <Tag color="green">重装徒步</Tag>
            <Row className={styles.alignItemsCenter} type="flex">
              <Icon type="environment-o" /><p>2017年5月11日</p>
            </Row>
            <p>3天</p>
            <Row className={styles.alignItemsCenter} type="flex">
              <Icon type="team" /><p>12/12</p>
            </Row>
          </Row>
        </Col>
      </Row>
    </Row>
  );
}

export default ItemFigure;
