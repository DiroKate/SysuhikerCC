import React from 'react';
import { connect } from 'dva';
import { Tabs, Table, Row, Col, Modal } from 'antd';

import styles from './detail.less';


function DetailPage({ details }) {
/**
"post_id": "66",
"post_title": "2016年8月21日清远-花尖-玄真溯溪视频",
"post_type": "作业攻略",
"post_detail": "<p><embed type=\"application/x-shockwave-flash\" class=\"edui-faked-video\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" src=\"http://www.tudou.com/v/uhvARr_q5mQ?spm=a2h0k.8191414.uhvARr_q5mQ.A\" width=\"420\" height=\"280\" align=\"none\" wmode=\"transparent\" play=\"true\" loop=\"false\" menu=\"false\" allowscriptaccess=\"never\" allowfullscreen=\"true\" /></p><p>视频网址：土豆网 http://www.tudou.com/programs/view/uhvARr_q5mQ/?spm=a2h0k.8191414.uhvARr_q5mQ.A</p>",
"post_keywords": "清远溯溪、溯溪、逸仙徒步",
"post_createTime": "2016-10-10 21:42:22",
"post_createUserId": "558",
"post_modifyTime": "2016-10-10 21:42:22",
"post_modifyUserId": "558",
"post_permission": "公开",
"post_up": "0",
"post_down": "0",
"post_count": "0",
"post_countRe": "0",
"post_other": "",
"post_deleteFlag": "N",
"post_createUserNick": "Ethel",
"post_createUserEmail": "105014774@qq.com",
"post_createUserAvatarUrl": null
 */
//   const {
//   post_title: title,
//   post_type: type,
//   post_detail: content,
// } = details;

  const title = "2016年8月21日清远-花尖-玄真溯溪视频";
  const type = "作业攻略";
  const content = "<p>这是文本主题</p>";

  const dataSource = [
    {
      title:"2016年8月21日清远-花尖-玄真溯溪视频",
      type: "作业攻略",
      content: "<p>这是文本主题</p>",
      author:"作者名字",
      createTime: "2016-10-10 21:42:22",
    },{
      title:"2016年8月21日清远-花尖-玄真溯溪视频",
      type: "作业攻略",
      content: "<p>这是文本主题</p>",
      author:"作者名字",
      createTime: "2016-10-10 21:42:22",
    }
  ];
  const columns = [
    {
      title: '话题',
      key: 'topic',
      render: (text, record,index) => (
        <div>
          <Row className={styles.rowHeader} >
            <Col xs={{span:6}} sm={{span:6}}>
              <p>{record.createTime}</p>
            </Col>
            <Col xs={{span:17}} sm={{span:17}}>
              <p>{record.title}</p>
            </Col>          
            <Col xs={{span:1}} sm={{span:1}}>
              <p>{`# ${index+1}`}</p>
            </Col>
          </Row>
          <Row className={styles.rowBody} >
            <Col xs={{span:6}} sm={{span:6}} className={styles.author}>
              <p>{record.author}</p>
            </Col>
            <Col xs={{span:17}} sm={{span:17}} className={styles.content}>
              <div dangerouslySetInnerHTML={{ __html: record.content }} />
            </Col>          
          </Row>
        </div>
      ),
    },
  ];
  const mainTable = (
    <Table dataSource={dataSource} columns={columns} showHeader={false} />
  );

  return (
    <div>
      <p>{title}</p>
      <p>{type}</p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      {mainTable}
    </div>
  );
}

function mapStateToProps(state) {
  const { details } = state.teahouse;
  return {
    details,
  };
}

export default connect(mapStateToProps)(DetailPage);
