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
          registerModel(app, require('./models/users'));
          cb(null, { component: require('./routes/Home') });
        }, 'home');
      },
      childRoutes: [
        {
          path: 'home',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/users'));
              cb(null, require('./routes/Home/'));
            }, 'home');
          },
        }, {
          path: 'login',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/users'));
              cb(null, require('./routes/login/Login'));
            }, 'login');
          },
        }, {
          path: 'activity',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/users'));
              cb(null, require('./routes/activity/activity'));
            }, 'activity');
          },
        }, {
          path: 'activity/:id',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/users'));
              cb(null, require('./routes/activity/details/'));
            }, 'user-detail');
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
