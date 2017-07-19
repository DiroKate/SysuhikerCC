import React from 'react';
import { connect } from 'dva';
import { Activity } from '../../../components';

const { CreatePage } = Activity;

function CreateActivity(props) {
  const createPagesProps = {
    dispatch: props.dispatch,
  };
  return (<CreatePage {...createPagesProps} />);
}

export default connect()(CreateActivity);
