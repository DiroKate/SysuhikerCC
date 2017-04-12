import React from 'react';
import { connect } from 'dva';
import MainLayout from '../components/MainLayout/MainLayout';

function IndexPage() {
  return (
    <MainLayout />
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
