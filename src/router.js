import React from 'react';
import { Router } from 'dva/router';
import PropTypes from 'prop-types';
import App from './routes/App.js';

const cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

const Routers = ({ history, app }) => {
  // const handleChildRoute = ({ location, params, routes }) => {
  //   console.log(location, params, routes);
  // };

  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute(nextState, cb) {
        require.ensure([], (require) => {
          // registerModel(app, require('./models/users'));
          cb(null, { component: require('./routes/Home') });
        }, 'home');
      },
      childRoutes: [
        {
          path: 'home',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              // registerModel(app, require('./models/users'));
              cb(null, require('./routes/Home/'));
            }, 'home2');
          },
        }, {
          path: 'login',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              // registerModel(app, require('./models/sysuhiker'));
              cb(null, require('./routes/user/login'));
            }, 'login');
          },
        }, {
          path: 'register',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              // registerModel(app, require('./models/users'));
              cb(null, require('./routes/user/register'));
            }, 'register');
          },
        }, {
          path: 'activity',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/activity'));
              cb(null, require('./routes/activity/activity'));
            }, 'activity-list');
          },
        }, {
          path: 'activity/create',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              // registerModel(app, require('./models/users'));
              cb(null, require('./routes/activity/create/'));
            }, 'activity-create');
          },
        }, {
          path: 'activity/:id',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/activity'));
              cb(null, require('./routes/activity/details/'));
            }, 'activity-show');
          },
        }, {
          path: 'activity/edit/:id',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/activity'));
              cb(null, require('./routes/activity/edit'));
            }, 'activity-edit');
          },
        }, {
          path: 'activity/apply/:id',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/activity'));
              cb(null, require('./routes/activity/apply/'));
            }, 'apply-activity');
          },
        }, {
          path: 'activity/apply/edit/:id',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/activity'));
              cb(null, require('./routes/activity/applyEdit'));
            }, 'apply-edit');
          },
        }, {
          path: 'about',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              // registerModel(app, require('./models/users'));
              cb(null, require('./routes/about'));
            }, 'about');
          },
        }, {
          path: 'bbs',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/teahouse'));
              cb(null, require('./routes/teahouse/'));
            }, 'bbs-list');
          },
        }, {
          path: 'bbs/create',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              // registerModel(app, require('./models/users'));
              cb(null, require('./routes/teahouse/create/'));
            }, 'bbs-create');
          },
        }, {
          path: 'bbs/:id',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/teahouse'));
              cb(null, require('./routes/teahouse/detail'));
            }, 'bbs-show');
          },
        }, {
          path: 'bbs/edit/:id',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/teahouse'));
              cb(null, require('./routes/teahouse/edit'));
            }, 'bbs-edit');
          },
        }, {
          path: 'bbs/editre/:id',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/teahouse'));
              cb(null, require('./routes/teahouse/editre'));
            }, 'bbs-editre');
          },
        }, {
          path: 'sysuhiker/:id',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/user/sysuhiker'));
            }, 'user-show');
          },
        },
      ],
    },
  ];

  // routes[0].childRoutes.map((item) => {
  //   item.onEnter = handleChildRoute;
  //   return item;
  // });

  return <Router history={history} routes={routes} />;
};

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
};

export default Routers;
