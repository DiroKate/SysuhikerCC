import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import { ReEditorForm } from '../../../components';


function EditPage({ dispatch, userId, currentRe }) {
  const onSubmitHandle = ({ contentValue, reId }) => {
    dispatch({
      type: 'teahouse/editTopicRe',
      payload: {
        re_id: reId,
        user_id: userId,
        userComments: contentValue,
      },
    });
  };
  return (
    <div className="sysuhiker-top-wrapper">
      <h1>修改回复</h1>

      <Row style={{
        marginTop: '16px',
      }}
      >
        <Col>
          <ReEditorForm onSubmit={onSubmitHandle} data={currentRe} />
        </Col>
      </Row>
    </div>
  );
}
function mapStateToProps({ app, teahouse }) {
  const { userId } = app;
  const { currentRe } = teahouse;
  return { userId, currentRe };
}

export default connect(mapStateToProps)(EditPage);
