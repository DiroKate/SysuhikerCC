import React from 'react';
import { connect } from 'dva';
import cx from 'classnames';
import { Pagination, Button, Row, Col, Breadcrumb } from 'antd';
import Avatar from 'react-avatar';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import styles from './detail.less';

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
        keywords: '这是关键字',
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
            <p style={{ paddingLeft: '1rem' }}>{record.createTime}</p>
          </Col>
          <Col xs={{ span: 15 }} sm={{ span: 18 }}>
            <p>{index > 0 ? `Re: ${record.title}` : record.title}</p>
          </Col>
          <Col xs={{ span: 2 }} sm={{ span: 1 }}>
            <p>{`# ${index + 1}`}</p>
          </Col>
        </Row>
        <Row className={styles.rowBody} >
          <Col xs={{ span: 7 }} sm={{ span: 5 }} className={styles.author}>
            <Row type="felx" align="align" justify="center">
              <Col span={12} offset={4}>
                <Avatar
                  round
                  size={64}
                  src={record.avatarUrl}
                  name={record.author.substr(0, 1).toUpperCase()}
                />
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

    const onPageHandler = (page, pageSize, params) => {
      console.log(page, pageSize, params);
    };
    const pagination = (
      <Pagination style={{ marginLeft: '1rem' }} onChange={onPageHandler} total={100} />
    );

    const toolbarClassName = cx({
      [styles.editorToolbar]: true,
      [styles.editorToolbarMobile]: mode,
      [styles.editorToolbarWeb]: !mode,
    });
    const wrapperClassName = cx({
      [styles.editorWrapper]: true,
      [styles.editorWrapperMobile]: mode,
      [styles.editorWrapperWeb]: !mode,
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
          <Col xs={{ span: 20, offset: 2 }} sm={{ span: 12, offset: 6 }}>
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
