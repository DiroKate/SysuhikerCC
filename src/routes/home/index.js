import React from 'react';
import { connect } from 'dva';
import Banner from '../../components/layout/banner';
import ContentLeft from '../../components/layout/contentLeft';


function Home() {
  return (
    <div>
      <Banner />
      <ContentLeft />
    </div>
  );
}
export default connect()(Home);
