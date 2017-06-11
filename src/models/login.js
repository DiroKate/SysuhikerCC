import { routerRedux } from 'dva/router';
import * as LoginService from '../services/login.js';

export default {
  namespace: 'login',
  state: {
    login: false,
    userId: '',
  },

  reducers: {

  },

  effects: {
    *login({ payload: params }, { call, put }) {
      const { data } = yield call(LoginService.login, params);
      const { code } = data.data;
      if (code === 0) {
        yield put({
          type: 'app/loginSuccess',
          payload: {
            userId: data.data.userid,
          },
        });
        yield put(routerRedux.push('/'));
      }
    },
  },
};
