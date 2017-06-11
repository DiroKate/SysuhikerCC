import React from 'react';
// import { connect } from 'dva';
// import PropTypes from 'prop-types';

// import CreatePage from '../../../components/activity/CreatePage.js';
import { Activity } from '../../../components';

const { CreatePage } = Activity;

function CreateActivity(props) {
  // console.log(props);
  return (
    <CreatePage />
  );
}
// CreateActivity.propTypes = {
// };

// function mapStateToProps() {
// }

// export default connect(mapStateToProps)(CreateActivity);
export default CreateActivity;
