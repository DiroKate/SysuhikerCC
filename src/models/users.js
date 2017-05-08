import { routerRedux } from 'dva/router';
import * as UsersService from '../services/users';

export default {
  namespace: 'users',
  state: {
    login: false,
    userId: '',
  },

  reducers: {
    loginSuccess(state, action) {
      return {
        ...state,
        userId: action.payload.userId,
        login: true,
      };
    },
    getUserInfo(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },

  effects: {
    *login({ payload: params }, { call, put }) {
      const { data } = yield call(UsersService.login, params);
      console.log(data);
      const { code } = data.data;
      if (code === 0) {
        yield put({
          type: 'loginSuccess',
          payload: {
            userId: data.data.userid,
          },
        });
        yield put(routerRedux.push('/'));
      }
    },
    *queryUser({ payload: params }, { call }) {
      if (typeof (params) === 'undefined') {
        console.log('params is none');
        return;
      }
      console.log('queryUserqueryUserqueryUserqueryUserqueryUser', params);
      const { data } = yield call(UsersService.userInfo, params);
      const { code } = data.data;
      if (code === 0) {
        console.log('获取用户信息成功');
      } else {
        console.warn('获取用户信息失败');
      }
    },
  },

  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'queryUser' });
      // window.onresize = () => {
      //   dispatch({ type: 'changeNavbar' })
      // }
    },
  },
};
