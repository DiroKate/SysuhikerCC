import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';

// import ApplyPage from '../../../components/activity/ApplyPage.js';
import { Activity } from '../../../components';

const { ApplyPage } = Activity;

function Apply(props) {
  const { activityDetails, activityLeader, loginUser, dispatch } = props;
  const applyProps = {
    ...activityDetails,
    ...activityLeader,
    loginUser,
  };
  return (<ApplyPage data={applyProps} dispatch={dispatch} />);
}
Apply.propTypes = {
  activityDetails: PropTypes.object.isRequired,
  activityLeader: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return { activityDetails: state.activity.activityDetails, activityLeader: state.activity.activityLeader, loginUser: state.app.loginUser };
}

export default connect(mapStateToProps)(Apply);
