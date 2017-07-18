import React from 'react';
import { connect } from 'dva';
import {Card,Row,Col,Tabs} from 'antd';

import styles from './sysuhiker.less';

function Sysuhiker ({mode}) {
	const colProps1 = {
		xm:{span:24},
		sm:{span:6}
	};
	const colProps2 = {
		xm:{span:24},
		sm:{span:15}
	};
	const rowProps = {
		gutter:24,
		// align:'middle',
		// justify: 'start'
	};

	const userAvatar = (
		<Card className={styles.userCard} bodyStyle={{ padding: 0 }}>
    <div className={styles.userCard}>
      <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
    </div>
    <div className={styles.userFont}>
      <h3>Europe Street beat</h3>
      <p>www.instagram.com</p>
    </div>
  </Card>	
	);


  return(
	<div className={mode?styles.wrapperMobile:styles.wrapperWeb} >
	  <Row {...rowProps}>
	  	<Col {...colProps1} >
	  	{userAvatar}
	  	{!mode?userAvatar:null}
  </Col>
	  	<Col {...colProps2} >
			<Tabs>
        <Tabs.TabPane tab="Overview" key="Overview">
	  		{mode?userAvatar:null}
        	<p>Overview</p>

        </Tabs.TabPane>
        <Tabs.TabPane tab="Setting" key="Setting">Setting</Tabs.TabPane>
      	{}
      </Tabs>	
	  	</Col>
	  </Row>
	</div>
  );
}

function mapStateToProps(state) {
  const { mode } = state.app;
  return {
    mode,
  };
}

export default connect(mapStateToProps)(Sysuhiker);