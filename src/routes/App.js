import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';

class App extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    // location: PropTypes.object,
    // dispatch: PropTypes.func,
    // app: PropTypes.object,
    // loading: PropTypes.bool,
  }

  // constructor(props) {
  //   super(props);
  //   // console.log("******************");
  //   // console.log(props);
  //   // console.log("******************");
  //   // this.state = {};
  // }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
export default connect(({ app, loading }) => ({ app, loading: loading.models.app }))(App);
