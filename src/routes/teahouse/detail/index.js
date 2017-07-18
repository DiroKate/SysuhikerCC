import React from 'react';
import { connect } from 'dva';
import cx from 'classnames';
import { Pagination, Button, Row, Col, Breadcrumb,Avatar } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import styles from './detail.less';


// function DetailPage({ mode, details }) {
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

class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorContent: null,
    };
  }
  render() {
    const { mode, details } = this.props;
    const title = '2016年8月21日清远-花尖-玄真溯溪视频';
    const type = '作业攻略';
    const content = '<p>这是文本主题</p>';

    const dataSource = [
      {
        title: '2016年8月21日清远-花尖-玄真溯溪视频',
        type: '作业攻略',
        content: '<p>这是文本主题</p>',
        author: '作者名字作者名字作者名字作者名字作者名字',
        createTime: '2016-10-10 21:42:22',
        keywords:'这是关键字'
      }, {
        title: '2016年8月21日清远-花尖-玄真溯溪视频',
        type: '作业攻略',
        content: '<p>这是文本主题</p><p>这是文本主题</p><p>这是文本主题</p><p>这是文本主题</p><p>这是文本主题</p><p>这是文本主题</p><p>这是文本主题</p><p>这是文本主题</p><p>这是文本主题</p><p>这是文本主题</p><p>这是文本主题</p><p>这是文本主题</p><p>这是文本主题</p><p>这是文本主题</p><p>这是文本主题</p><p>这是文本主题</p><p>这是文本主题</p><p>这是文本主题</p>',
        author: '作者名字',
        createTime: '2016-10-10 21:42:22',
      },
    ];

    const tableRow = (record, index) => (
      <div>
        <Row className={styles.rowHeader} >
          <Col xs={{ span: 7 }} sm={{ span: 5 }}>
            <p style={{paddingLeft:'1rem'}}>{record.createTime}</p>
          </Col>
          <Col xs={{ span: 15 }} sm={{ span: 18 }}>
            <p>{index>0? `Re: ${record.title}`: record.title}</p>
          </Col>
          <Col xs={{ span: 2 }} sm={{ span: 1 }}>
            <p>{`# ${index + 1}`}</p>
          </Col>
        </Row>
        <Row className={styles.rowBody} >
          <Col xs={{ span: 7 }} sm={{ span: 5 }} className={styles.author}>
            <Row type="felx" align="align" justify="center">
              <Col span={12} offset={4}>
                <Avatar src={record.avatarUrl} size="large">{record.author.substr(0, 1).toUpperCase()}</Avatar>
                <p>{record.author}</p>
              </Col>
            </Row>


          </Col>
          <Col xs={{ span: 16 }} sm={{ span: 18 }} className={styles.content}>
            <div dangerouslySetInnerHTML={{ __html: record.content }} />
            <p className={styles.keywords} >{record.keywords}</p>
          </Col>
        </Row>
      </div>
    );

    const mainTable = (
      <table className={styles.table}>
        {dataSource.map((item, index) => (
          <tr><td>
            {tableRow(item, index)}
          </td></tr>
      ))}
      </table>
    );

    const onPageHandler = (page, pageSize,params) => {
      console.log(page, pageSize,params)
    }
    const pagination = (
      <Pagination style={{marginLeft:'1rem'}} onChange={onPageHandler} total={100}/>
    )

    const toolbarClassName = cx({
      [styles.editorToolbar]: true,
      [styles.editorToolbarMobile]: mode,
      [styles.editorToolbarWeb]:!mode, 
    });
    const wrapperClassName = cx({
      [styles.editorWrapper]: true,
      [styles.editorWrapperMobile]: mode,
      [styles.editorWrapperWeb]:!mode, 
    });
    const editor = (
      <Editor
        toolbarClassName={toolbarClassName}
        wrapperClassName={wrapperClassName}
        editorClassName={styles.editorEditor}
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
        editorState={this.state.editorContent}
      />
    );

    return (
      <div className={mode ? styles.detailsWrapperMobile : styles.detailsWrapperWeb}>
        <Breadcrumb style={{ margin: '12px 0', fontSize: '1.2em' }}>
          <Breadcrumb.Item>
            <a href="/bbs">逸仙茶馆</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{title}</Breadcrumb.Item>
        </Breadcrumb>
        {pagination}
        {mainTable}
        {pagination}
        <h1 className={styles.replyTitle} >我也来说一句</h1>
        {editor}
        <Row>
          <Col xs={{span:20,offset:2}} sm={{span:12,offset:6}}>
            <Button className={styles.submitBtn} type="primary">发表评论</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { details } = state.teahouse;
  const { mode } = state.app;
  return {
    details, mode,
  };
}

export default connect(mapStateToProps)(DetailPage);
