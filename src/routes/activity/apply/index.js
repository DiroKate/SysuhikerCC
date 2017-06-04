import React from 'react';
import { connect } from 'dva';
// import PropTypes from 'prop-types';

import ApplyPage from '../../../components/activity/ApplyPage.js';

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
