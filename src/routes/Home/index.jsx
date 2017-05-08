import React from 'react';
import { connect } from 'dva';

import Content0 from './Content0';
import Content1 from './Content1';
import Content2 from './Content2';
import Content3 from './Content3';
import Point from './Point';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMode: false,
    };
  }

  render() {
    const MainHome = (
      <div key="MainHome">
        <Content0 id="content_1_0" key="content_1_0" isMode={this.state.isMode} />
        <Content1 id="content_2_0" key="content_2_0" isMode={this.state.isMode} />
        <Content2 id="content_3_0" key="content_3_0" isMode={this.state.isMode} />
        <Content3 id="content_4_0" key="content_4_0" isMode={this.state.isMode} />

        {/* 导航和页尾不进入锚点区，如果需要，自行添加; */}
        <Point key="list" ref={(c) => { this.list = c; }} data={['content_1_0', 'content_2_0', 'content_3_0', 'content_4_0']} />
      </div>
    );
    return (
      <div>
        {MainHome}
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Home);
