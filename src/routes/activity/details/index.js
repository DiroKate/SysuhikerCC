import React from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';
import PropTypes from 'prop-types';
import styles from './index.less';
import example from '../../../assets/example.html';

const BreadcrumbItem = Breadcrumb.Item;

const fakeData = {
  title: '国庆西北大环线+额济纳胡杨林自驾游',
  leader: 'diroguan',
  leader_icon: '/icon.png',
  create_at: '2017-05-11 11:55',
  departure: '广州',
  arrivals: '兰州',
  start_at: '2017-09-28',
  end_at: '2017-10-08',
  collection_at: '2017-09-28 19:00',
  content: example,
};

function Details(props) {
  const { userDetails } = props;


  return (
    <div className={styles.content}>
      <Breadcrumb style={{ margin: '12px 0', 'font-size': '1.2em' }}>
        <BreadcrumbItem>
          <a href="/activity">活动列表</a>
        </BreadcrumbItem>
        <BreadcrumbItem>活动详情</BreadcrumbItem>
      </Breadcrumb>

      
    </div>
  );
}
Details.propTypes = {
  userDetails: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    userDetails: state.userDetails,
  };
}

export default connect(mapStateToProps)(Details);
