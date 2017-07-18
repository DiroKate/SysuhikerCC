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
            }, 'home');
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
            }, 'activityPage');
          },
        }, {
          path: 'activity/details/:id',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/activity'));
              cb(null, require('./routes/activity/details/'));
            }, 'user-detail');
          },
        }, {
          path: 'activity/create',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              // registerModel(app, require('./models/users'));
              cb(null, require('./routes/activity/create/'));
            }, 'user-create');
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
            }, 'teahouse-list');
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
          path: 'bbs/details/:id',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/teahouse'));
              cb(null, require('./routes/teahouse/detail'));
            }, 'bbs-show');
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
