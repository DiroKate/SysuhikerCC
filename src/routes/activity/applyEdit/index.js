import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';

import { Activity } from '../../../components';

const { ApplyPage } = Activity;

function Edit(props) {
  const { activityDetails, activityLeader, loginUser, dispatch } = props;
  const applyProps = {
    ...activityDetails,
    ...activityLeader,
    loginUser,
  };
  return (<ApplyPage data={applyProps} dispatch={dispatch} />);
}
Edit.propTypes = {
  activityDetails: PropTypes.object.isRequired,
  activityLeader: PropTypes.object.isRequired,
};

function mapStateToProps({ activity, app }) {
  const { activityDetails, activityLeader } = activity;
  const { loginUser } = app;
  return { activityDetails, activityLeader, loginUser };
}

export default connect(mapStateToProps)(Edit);
