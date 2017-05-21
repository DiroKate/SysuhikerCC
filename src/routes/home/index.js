import React from 'react';
import { connect } from 'dva';
import Banner from '../../components/layout/banner';

function Home() {
  return (
    <div>
      <Banner />
    </div>
  );
}
export default connect()(Home);
