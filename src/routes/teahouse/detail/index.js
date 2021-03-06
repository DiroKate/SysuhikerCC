import React from 'react';
import { connect } from 'dva';
import { browserHistory } from 'dva/router';
import cx from 'classnames';
import {
  Pagination,
  Button,
  Row,
  Col,
  Breadcrumb,
  Modal,
} from 'antd';
import Avatar from 'react-avatar';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { notificaionUtils, uploadImageCallBack, needLogin } from '../../../utils';


import styles from './detail.less';

class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({ editorState });
  }

  render() {
    const {
      isLogin,
      userId,
      mode,
      details,
      currentReList,
      showRelist,
      dispatch,
    } = this.props;

    const onDeleteClick = ({ target }) => {
      const data = showRelist[target.id];
      console.log('删除：', { data });

      Modal.confirm({
        title: data.isContent
          ? '删除文章'
          : '删除该条评论',
        content: data.isContent
          ? data.title
          : null,
        onOk() {
          if (data.isContent) {
            dispatch({
              type: 'teahouse/deleteTopic',
              payload: {
                post_id: data.id,
                user_id: userId,
              },
            });
          } else {
            dispatch({
              type: 'teahouse/deleteTopicRe',
              payload: {
                post_id: data.id,
                user_id: userId,
              },
            });
          }
        },
      });
    };

    const onEditClick = ({ target }) => {
      const data = showRelist[target.id];
      if (data.isContent) {
        browserHistory.push(`/bbs/edit/${data.id}`);
      } else {
        browserHistory.push(`/bbs/editre/${data.reId}`);
      }
    };

    const tableEditorPane = (index, showFlag, delelteFlag) => (
      showFlag ?
        <span className={styles.tableEditorPane}>
          <a onClick={onEditClick} id={index}>编辑</a>
          {/* 评论回复暂时不支持删除功能 */}
          { delelteFlag ? <a onClick={onDeleteClick} id={index}>删除</a> : null}
        </span>
      : null
    );

    const tableRowWeb = (record, index) => (
      <div>
        <Row className={styles.rowHeader}>
          <Col span={4}>
            <p style={{
              paddingLeft: '1rem',
            }}
            >{record.createTime}</p>
          </Col>
          <Col offset={1} span={18}>
            <p>{record.title}</p>
          </Col>
          <Col span={1}>
            <p>{`# ${record.index}`}</p>
          </Col>
        </Row>
        <Row className={styles.rowBody}>
          <Col span={4} className={styles.author}>
            <Avatar
              className={styles.authorAvatar}
              round
              size={64}
              src={record.avatarUrl}
              name={record.author
              ? record.author.substr(0, 1).toUpperCase()
              : 'SysuHiker'}
            />
            <p className={styles.authorName}>{record.author}</p>
          </Col>

          <Col offset={1} span={18} className={styles.content}>
            <div dangerouslySetInnerHTML={{
              __html: record.content,
            }}
            />
            <p className={styles.keywords}>{record.keywords}</p>
            {
              tableEditorPane(index,
                userId === record.authorId,
                record.isContent)
            }
          </Col>
        </Row>
      </div>
    );

    const tableRowMobile = (record, index) => (
      <div>
        <Row style={{
          backgroundColor: '#F0F8FF',
        }}
        >
          <Col span={5} className={styles.author}>
            <Avatar
              className={styles.authorAvatarMobile}
              round
              size={32}
              src={record.avatarUrl}
              name={record.author
              ? record.author.substr(0, 1).toUpperCase()
              : 'SysuHiker'}
            />
            <p style={{
              textAlign: 'center',
              margin: '0.5rem 0',
              fontSize: '12px',
            }}
            >{record.author}</p>
          </Col>
          <Col span={17}>
            <p>{record.title}</p>
            <p style={{
              marginTop: '0.5rem',
            }}
            >{record.createTime}</p>
          </Col>
          <Col span={2}>
            <p>{`# ${record.index}`}</p>
          </Col>
        </Row>
        <Row className={styles.rowBody}>
          <Col span={24} className={styles.content}>
            <div
              className={styles.mobileContent}
              dangerouslySetInnerHTML={{
                __html: record.content,
              }}
            />
            <p className={styles.keywords}>{record.keywords}</p>
            {
              tableEditorPane(index,
                userId === record.authorId,
                record.isContent)
            }
          </Col>
        </Row>
      </div>
    );

    const loginCallback = () => {
      const { editorState } = this.state;
      const contentValue = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      if (editorState.getCurrentContent().getPlainText().length < 1) {
        notificaionUtils('warning', '正文不能为空');
        return;
      }
      dispatch({ type: 'teahouse/postTopicRe', payload: contentValue });
      this.setState({ editorState: EditorState.createEmpty() });
    };

    const onBtnClick = () => {
      needLogin(isLogin, loginCallback, '评论需要先注册登录，跳转到登录页面？');
    };

    const onPageHandler = (page, pageSize) => {
      dispatch({
        type: 'teahouse/showRelistReducer',
        payload: {
          pageSize,
          page,
        },
      });
    };
    const pagination = (<Pagination
      style={{
        marginLeft: '1rem',
      }}
      onChange={onPageHandler}
      total={currentReList.length}
    />);

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

    const editor = (<Editor
      localization={{ locale: 'zh' }}
      toolbarClassName={toolbarClassName}
      wrapperClassName={wrapperClassName}
      editorClassName={styles.editorEditor}
      toolbar={{
        inline: {
          inDropdown: true,
        },
        list: {
          inDropdown: true,
        },
        textAlign: {
          inDropdown: true,
        },
        link: {
          inDropdown: true,
        },
        history: {
          inDropdown: true,
        },
        image: {
          uploadCallback: uploadImageCallBack,
        },
      }}
      editorState={this.state.editorState}
      onEditorStateChange={this.onEditorStateChange}
      toolbarOnFocus
    />);

    const mainTable = (
      <table className={styles.table}>
        {showRelist.map((item, index) => (
          <tr>
            <td>
              {mode
                ? tableRowMobile(item, index)
                : tableRowWeb(item, index)}
            </td>
          </tr>
        ))}
      </table>
    );

    return (
      <div className={mode
        ? styles.detailsWrapperMobile
        : styles.detailsWrapperWeb}
      >
        <Breadcrumb style={{
          margin: '12px 0',
          fontSize: '1.2em',
        }}
        >
          <Breadcrumb.Item>
            <a href="/bbs">逸仙茶馆</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{details.post_title}</Breadcrumb.Item>
        </Breadcrumb>
        {pagination}
        {mainTable}
        {pagination}
        <h1 className={styles.replyTitle}>我也来说一句</h1>
        {editor}
        <Row>
          <Col
            xs={{
              span: 20,
              offset: 2,
            }}
            sm={{
              span: 12,
              offset: 6,
            }}
          >
            <Button className={styles.submitBtn} type="primary" onClick={onBtnClick}>
              发表评论
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { details, currentReList, showRelist } = state.teahouse;
  const { mode, isLogin, userId } = state.app;
  return {
    details,
    mode,
    currentReList,
    showRelist,
    isLogin,
    userId,
  };
}

export default connect(mapStateToProps)(DetailPage);
