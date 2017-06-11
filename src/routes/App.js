import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { BackTop } from 'antd';
import Nav from './Home/Nav';
import Footer from './Home/Footer';
import '../themes/antless/antMotion_style.less';

function App({ children, app }) {
  const navProps = {
    id: 'nav_1_0',
    key: 'nav_1_0',
    app,
  };

  const footerProps = {
    id: 'footer_1_0',
    key: 'footer_1',
  };

  return (
    <div className="templates-wrapper" >
      <BackTop />
      <Nav {...navProps} />
      <div className="user-templates-wrapper">
        {children}
      </div>
      <Footer {...footerProps} />
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default connect(({ app, loading }) => ({ app, loading }))(App);
