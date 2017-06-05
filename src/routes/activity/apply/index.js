import React from 'react';
import { connect } from 'dva';
// import PropTypes from 'prop-types';

// import ApplyPage from '../../../components/activity/ApplyPage.js';
import { Activity } from '../../../components';

const { ApplyPage } = Activity;

function Apply(props) {
  return (
    <ApplyPage />
  );
}
Apply.propTypes = {
};

function mapStateToProps() {
}

export default connect(mapStateToProps)(Apply);
